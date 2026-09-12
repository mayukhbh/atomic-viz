import { describe, expect, it } from 'vitest';
import { ELEMENTS } from '../../data/elements';
import { REACTIONS, REACTION_CATEGORIES } from '../../data/reactions';
import { TUTORIALS } from '../../data/tutorials';
import { MOLECULE_LIB, CLASS_INFO, getOrganicByClass } from '../molecules';
import { CPK } from '../cpk';
import { buildAlkane, centerMolecule, tetrahedralTripod, trigonalPair, v } from '../builders';
import { interpolateReaction, energyProfile, stageIndexAt } from '../reactionEngine';
import { parseElectronConfiguration, getMaxElectrons, generatePOrbital, generateDOrbital, generateFOrbital } from '../../utils/orbitalGeometry';

const finite3 = p => expect(p.length === 3 && p.every(Number.isFinite)).toBe(true);
const counts = atoms => atoms.reduce((out, a) => ({ ...out, [a.el]: (out[a.el] || 0) + 1 }), {});
const formulaCounts = formula => {
  const ascii = formula.replace(/[₀-₉]/g, c => '₀₁₂₃₄₅₆₇₈₉'.indexOf(c));
  const out = {};
  for (const [, el, n] of ascii.matchAll(/([A-Z][a-z]?)(\d*)/g)) out[el] = (out[el] || 0) + Number(n || 1);
  return out;
};

describe('element and molecule data contracts', () => {
  it('covers exactly 1–118 with canonical unique symbols and complete shell counts', () => {
    const all = Object.values(ELEMENTS);
    expect(all).toHaveLength(118);
    expect(all.map(e => e.atomicNumber).sort((a,b) => a-b)).toEqual(Array.from({length:118}, (_,i)=>i+1));
    expect(new Set(all.map(e=>e.symbol)).size).toBe(118);
    for (const [key,e] of Object.entries(ELEMENTS)) {
      expect(key).toBe(e.symbol);
      expect(e.electrons.reduce((a,b)=>a+b,0), key).toBe(e.atomicNumber);
      expect(e.mass).toBeGreaterThan(0);
      expect(e.xpos).toBeGreaterThanOrEqual(1);
      expect(e.xpos).toBeLessThanOrEqual(18);
    }
  });
  it('has sane encoded radii and valences', () => {
    for (const [el, d] of Object.entries(CPK)) {
      expect(ELEMENTS[el]).toBeDefined();
      expect(Number.isInteger(d.valence) && d.valence >= 0 && d.valence <= 8).toBe(true);
      expect(d.covalent).toBeGreaterThan(0); expect(d.vdw).toBeGreaterThan(0);
    }
  });
  for (const [id,m] of Object.entries(MOLECULE_LIB)) it(`${id}: formula, coordinates, bonds and valence`, () => {
    expect(m.id).toBe(id); expect(counts(m.atoms)).toEqual(formulaCounts(m.formula));
    const valence = m.atoms.map(()=>0);
    const pairs = new Set();
    m.atoms.forEach(a => { expect(ELEMENTS[a.el]).toBeDefined(); finite3(a.pos); });
    m.bonds.forEach(b => {
      expect(m.atoms[b.a]).toBeDefined(); expect(m.atoms[b.b]).toBeDefined(); expect(b.a).not.toBe(b.b);
      expect([1,2,3]).toContain(b.order);
      const key = [b.a,b.b].sort((a,b)=>a-b).join(':'); expect(pairs.has(key)).toBe(false); pairs.add(key);
      valence[b.a] += b.order; valence[b.b] += b.order;
    });
    valence.forEach((n,i)=>expect(n).toBeLessThanOrEqual(CPK[m.atoms[i].el].valence));
  });
  it('resolves every organic class and tutorial reference', () => {
    for (const [c,list] of Object.entries(getOrganicByClass())) { expect(CLASS_INFO[c]).toBeDefined(); expect(list.length).toBeGreaterThan(0); }
    expect(new Set(TUTORIALS.map(t=>t.id)).size).toBe(TUTORIALS.length);
    for (const t of TUTORIALS) for (const s of t.steps) {
      if (s.element) expect(ELEMENTS[s.element]).toBeDefined();
      if (s.reactionId) expect(REACTIONS.some(r=>r.id===s.reactionId)).toBe(true);
    }
  });
});

describe('geometry primitives', () => {
  it.each([1,2,3,4,12])('builds CnH2n+2 for n=%s', n => {
    const m = buildAlkane(n); expect(counts(m.atoms)).toEqual({C:n,H:2*n+2}); m.atoms.forEach(a=>finite3(a.pos));
  });
  it('tripod has tetrahedral angles to the existing bond and each other', () => {
    const dirs = [[1,0,0], ...tetrahedralTripod([0,0,0],[1,0,0],1)];
    dirs.forEach((a,i)=>dirs.slice(i+1).forEach(b=>expect(v.dot(a,b)).toBeCloseTo(-1/3,8)));
  });
  it('trigonal pair is planar, unit length and 120 degrees apart', () => {
    const [a,b]=trigonalPair([0,0,0],[1,0,0],1);
    expect(v.len(a)).toBeCloseTo(1); expect(v.dot(a,b)).toBeCloseTo(-0.5); expect(a[0]).toBeCloseTo(-0.5);
  });
  it('centering is non-mutating and translation invariant', () => {
    const m=buildAlkane(3), before=structuredClone(m), centered=centerMolecule(m);
    expect(m).toEqual(before);
    const sum=centered.atoms.reduce((a,b)=>v.add(a,b.pos),[0,0,0]); sum.forEach(x=>expect(x).toBeCloseTo(0));
    expect(centered.bonds).toEqual(m.bonds);
    expect(centerMolecule({atoms:[],bonds:[]})).toEqual({atoms:[],bonds:[]});
  });
});

describe('reaction contracts', () => {
  it('has unique canonical IDs', ()=>expect(new Set(REACTIONS.map(r=>r.id)).size).toBe(REACTIONS.length));
  for (const r of REACTIONS) it(`${r.id}: valid stages, finite interpolation and energy`, () => {
    expect(REACTION_CATEGORIES[r.domain]).toBeDefined();
    for (const s of r.stages) {
      const ids=new Set(s.atoms.map(a=>a.id)); expect(ids.size).toBe(s.atoms.length);
      s.atoms.forEach(a=>finite3(a.position));
      s.bonds.forEach(b=>{expect(ids.has(b.start)).toBe(true);expect(ids.has(b.end)).toBe(true);});
    }
    for (let i=0;i<=100;i++) {
      const p=i/100, frame=interpolateReaction(r,p);
      frame.atoms.forEach(a=>{finite3(a.position);expect(a.opacity).toBeGreaterThanOrEqual(0);expect(a.opacity).toBeLessThanOrEqual(1);});
      expect(stageIndexAt(r,p)).toBeLessThan(r.stages.length);
    }
    const profile=energyProfile(r);
    expect(profile.points).toHaveLength(121); profile.points.forEach(p=>expect(Number.isFinite(p.y)).toBe(true));
    expect(profile.points[0].y).toBe(0); expect(profile.points.at(-1).y).toBe(profile.productLevel);
    if(r.enthalpy) expect(Math.sign(profile.productLevel)).toBe(Math.sign(r.enthalpy));
  });
  it('preserves water atoms and positions at endpoints without mutating input',()=>{
    const r=REACTIONS[0], before=structuredClone(r);
    for(const p of [0,0.5,1]) expect(interpolateReaction(r,p).atoms).toHaveLength(6);
    expect(interpolateReaction(r,0).atoms.map(a=>a.position)).toEqual(r.stages[0].atoms.map(a=>a.position));
    interpolateReaction(r,1).atoms.forEach((a,i)=>a.position.forEach((x,j)=>expect(x).toBeCloseTo(r.stages.at(-1).atoms[i].position[j],10)));
    expect(r).toEqual(before);
  });
});

describe('orbital illustration utilities',()=>{
  it('parses superscripts and intentionally shows only explicit orbitals after a core',()=>{
    expect(parseElectronConfiguration('[Ar] 3d¹⁰ 4s²')).toEqual([{n:3,type:'d',count:10},{n:4,type:'s',count:2}]);
    expect(parseElectronConfiguration('')).toEqual([]);
    for(const e of Object.values(ELEMENTS)) for(const o of parseElectronConfiguration(e.electronConfiguration)) expect(o.count).toBeLessThanOrEqual(getMaxElectrons(o.type));
  });
  it('generates finite lobe positions',()=>{
    for(const axis of ['x','y','z']) { const o=generatePOrbital(axis); finite3(o.positiveLobe.position);finite3(o.negativeLobe.position); }
    for(const type of ['xy','xz','yz','x2-y2','z2']) generateDOrbital(type).forEach(l=>finite3(l.position));
    for(const type of ['xyz','z3','default']) generateFOrbital(type).forEach(l=>finite3(l.position));
  });
});
