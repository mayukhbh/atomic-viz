// Curated 3D molecule library. Geometry is grown from the primitives in builders.js
// (correct sp3/sp2 vertices, standard bond lengths) so structures are chemically faithful,
// not eyeballed. Every molecule carries metadata used by the viewer and the organic section.

import {
  v, BOND_LENGTH as L, buildAlkane, centerMolecule,
  tetrahedralPair, tetrahedralTripod, trigonalPair,
} from './builders';

// Tiny builder to assemble a molecule imperatively.
function mol() {
  const atoms = [];
  const bonds = [];
  const api = {
    atoms,
    bonds,
    add(el, pos, extra = {}) {
      atoms.push({ el, pos, ...extra });
      return atoms.length - 1;
    },
    bond(a, b, order = 1, btype = null) {
      bonds.push({ a, b, order, btype });
      return api;
    },
    // add 3 hydrogens (methyl cap) around carbon `ci` at `pos`, pointing away from `awayDir`
    methyl(ci, pos, awayDir, phase = 0) {
      tetrahedralTripod(pos, v.norm(awayDir), L.CH, phase).forEach((hp) => {
        const h = api.add('H', hp);
        api.bond(ci, h, 1);
      });
      return api;
    },
    // add 2 hydrogens (CH2) on carbon `ci` given its two existing bond directions
    ch2(ci, pos, d1, d2) {
      tetrahedralPair(pos, v.norm(d1), v.norm(d2), L.CH).forEach((hp) => {
        const h = api.add('H', hp);
        api.bond(ci, h, 1);
      });
      return api;
    },
  };
  return api;
}

const finalize = (m, meta) => ({ ...meta, ...centerMolecule({ atoms: m.atoms, bonds: m.bonds }) });

// ---------- small inorganic / common molecules ----------
function water() {
  const m = mol();
  const o = m.add('O', [0, 0, 0], { fg: 'O' });
  const a = (52.25 * Math.PI) / 180;
  m.add('H', [-Math.sin(a) * L.OH, -Math.cos(a) * L.OH, 0]);
  m.add('H', [Math.sin(a) * L.OH, -Math.cos(a) * L.OH, 0]);
  m.bond(o, 1, 1, 'polar').bond(o, 2, 1, 'polar');
  return m;
}

function carbonDioxide() {
  const m = mol();
  const c = m.add('C', [0, 0, 0]);
  m.add('O', [-1.16, 0, 0]);
  m.add('O', [1.16, 0, 0]);
  m.bond(c, 1, 2).bond(c, 2, 2);
  return m;
}

function ammonia() {
  const m = mol();
  const n = m.add('N', [0, 0, 0], { fg: 'N' });
  tetrahedralTripod([0, 0, 0], [0, 1, 0], L.NH).forEach((hp) => {
    const h = m.add('H', hp);
    m.bond(n, h, 1, 'polar');
  });
  return m;
}

function diatomic(el, order, len) {
  const m = mol();
  m.add(el, [-len / 2, 0, 0]);
  m.add(el, [len / 2, 0, 0]);
  m.bond(0, 1, order);
  return m;
}

function hcl() {
  const m = mol();
  m.add('H', [-0.64, 0, 0]);
  m.add('Cl', [0.64, 0, 0]);
  m.bond(0, 1, 1, 'polar');
  return m;
}

// ---------- unsaturated hydrocarbons ----------
function ethene() {
  const m = mol();
  const c1 = m.add('C', [-L.CCd / 2, 0, 0]);
  const c2 = m.add('C', [L.CCd / 2, 0, 0]);
  m.bond(c1, c2, 2);
  trigonalPair([-L.CCd / 2, 0, 0], [1, 0, 0], L.CH).forEach((hp) => m.bond(c1, m.add('H', hp), 1));
  trigonalPair([L.CCd / 2, 0, 0], [-1, 0, 0], L.CH).forEach((hp) => m.bond(c2, m.add('H', hp), 1));
  return m;
}

function ethyne() {
  const m = mol();
  m.add('C', [-L.CCt / 2, 0, 0]);
  m.add('C', [L.CCt / 2, 0, 0]);
  m.add('H', [-L.CCt / 2 - L.CH, 0, 0]);
  m.add('H', [L.CCt / 2 + L.CH, 0, 0]);
  m.bond(0, 1, 3).bond(0, 2, 1).bond(1, 3, 1);
  return m;
}

function propene() {
  const m = mol();
  const c1 = m.add('C', [-1.25, 0, 0]);
  const c2 = m.add('C', [-0.1, 0.5, 0]);
  const c3 = m.add('C', [1.2, 0.1, 0]);
  m.bond(c1, c2, 2).bond(c2, c3, 1);
  trigonalPair([-1.25, 0, 0], v.sub([-0.1, 0.5, 0], [-1.25, 0, 0]), L.CH).forEach((hp) => m.bond(c1, m.add('H', hp), 1));
  // vinyl H on c2
  const h = m.add('H', v.add([-0.1, 0.5, 0], v.scale(v.norm([0.2, 1, 0]), L.CH)));
  m.bond(c2, h, 1);
  m.methyl(c3, [1.2, 0.1, 0], v.sub([1.2, 0.1, 0], [-0.1, 0.5, 0]));
  return m;
}

// ---------- alcohols ----------
function methanol() {
  const m = mol();
  const c = m.add('C', [0, 0, 0]);
  const o = m.add('O', [L.CO, 0, 0], { fg: 'OH' });
  m.bond(c, o, 1);
  m.methyl(c, [0, 0, 0], [-1, 0, 0]);
  const hDir = [Math.cos((108 * Math.PI) / 180) * -1, -Math.sin((108 * Math.PI) / 180), 0];
  const hO = m.add('H', v.add([L.CO, 0, 0], v.scale(v.norm(hDir), L.OH)), { fg: 'OH' });
  m.bond(o, hO, 1, 'polar');
  return m;
}

function ethanol() {
  const m = mol();
  const c1 = [0, 0, 0];
  const c2 = [0.889, 1.257, 0];
  const iC1 = m.add('C', c1);
  const iC2 = m.add('C', c2);
  m.bond(iC1, iC2, 1);
  // methyl on C1 pointing away from C2
  m.methyl(iC1, c1, v.sub(c1, c2));
  // C2 bears the OH + 2 H
  const oPos = v.add(c2, v.scale(v.norm([1, 0.2, 0]), L.CO));
  const iO = m.add('O', oPos, { fg: 'OH' });
  m.bond(iC2, iO, 1);
  m.ch2(iC2, c2, v.sub(c1, c2), v.sub(oPos, c2));
  const hDir = v.norm([0.3, 1, 0.2]);
  const iHO = m.add('H', v.add(oPos, v.scale(hDir, L.OH)), { fg: 'OH' });
  m.bond(iO, iHO, 1, 'polar');
  return m;
}

// ---------- carbonyls ----------
function methanal() {
  const m = mol();
  const c = m.add('C', [0, 0, 0], { fg: 'C=O' });
  const o = m.add('O', [0, L.COd, 0], { fg: 'C=O' });
  m.bond(c, o, 2);
  trigonalPair([0, 0, 0], [0, 1, 0], L.CH).forEach((hp) => m.bond(c, m.add('H', hp), 1));
  return m;
}

function ethanal() {
  const m = mol();
  const c1 = m.add('C', [-0.75, 0, 0]);
  const c2 = m.add('C', [0.75, 0, 0], { fg: 'C=O' });
  const o = m.add('O', v.add([0.75, 0, 0], v.scale(v.norm([0.6, 1, 0]), L.COd)), { fg: 'C=O' });
  m.bond(c1, c2, 1).bond(c2, o, 2);
  m.methyl(c1, [-0.75, 0, 0], [-1, 0, 0]);
  const hDir = v.norm([0.6, -1, 0]);
  m.bond(c2, m.add('H', v.add([0.75, 0, 0], v.scale(hDir, L.CH))), 1);
  return m;
}

function propanone() {
  const m = mol();
  const c1 = m.add('C', [-1.3, 0, 0]);
  const c2 = m.add('C', [0, 0.35, 0], { fg: 'C=O' });
  const c3 = m.add('C', [1.3, 0, 0]);
  const o = m.add('O', [0, 0.35 + L.COd, 0], { fg: 'C=O' });
  m.bond(c1, c2, 1).bond(c2, c3, 1).bond(c2, o, 2);
  m.methyl(c1, [-1.3, 0, 0], v.sub([-1.3, 0, 0], [0, 0.35, 0]));
  m.methyl(c3, [1.3, 0, 0], v.sub([1.3, 0, 0], [0, 0.35, 0]));
  return m;
}

// ---------- carboxylic acids & esters ----------
function ethanoicAcid() {
  const m = mol();
  const c1 = m.add('C', [-1.5, 0, 0]);
  const c2 = m.add('C', [0, 0, 0], { fg: 'COOH' });
  const oDouble = m.add('O', v.add([0, 0, 0], v.scale(v.norm([0.3, 1, 0]), L.COd)), { fg: 'COOH' });
  const oSingle = m.add('O', v.add([0, 0, 0], v.scale(v.norm([1, -0.4, 0]), L.CO)), { fg: 'COOH' });
  m.bond(c1, c2, 1).bond(c2, oDouble, 2).bond(c2, oSingle, 1);
  m.methyl(c1, [-1.5, 0, 0], [-1, 0, 0]);
  const oPos = m.atoms[oSingle].pos;
  const hO = m.add('H', v.add(oPos, v.scale(v.norm([0.6, -0.8, 0]), L.OH)), { fg: 'COOH' });
  m.bond(oSingle, hO, 1, 'polar');
  return m;
}

function methylEthanoate() {
  const m = mol();
  const c1 = m.add('C', [-1.6, 0, 0]);
  const c2 = m.add('C', [-0.2, 0.1, 0], { fg: 'COO' });
  const oDouble = m.add('O', v.add([-0.2, 0.1, 0], v.scale(v.norm([-0.2, 1, 0]), L.COd)), { fg: 'COO' });
  const oSingle = m.add('O', [1.0, -0.4, 0], { fg: 'COO' });
  const c3 = m.add('C', [2.3, 0.1, 0]);
  m.bond(c1, c2, 1).bond(c2, oDouble, 2).bond(c2, oSingle, 1).bond(oSingle, c3, 1);
  m.methyl(c1, [-1.6, 0, 0], [-1, 0.2, 0]);
  m.methyl(c3, [2.3, 0.1, 0], [1, 0.4, 0]);
  return m;
}

// ---------- amines ----------
function methylamine() {
  const m = mol();
  const c = m.add('C', [-0.74, 0, 0]);
  const n = m.add('N', [0.74, 0, 0], { fg: 'NH2' });
  m.bond(c, n, 1);
  m.methyl(c, [-0.74, 0, 0], [-1, 0, 0]);
  tetrahedralPair([0.74, 0, 0], [-1, 0, 0], [0.3, 1, 0], L.NH).forEach((hp) => {
    const h = m.add('H', hp, { fg: 'NH2' });
    m.bond(n, h, 1, 'polar');
  });
  return m;
}

// ---------- aromatics ----------
function benzeneRing(withSubstituent = null) {
  const m = mol();
  const R = L.CCar;
  const carbons = [];
  for (let i = 0; i < 6; i++) {
    const ang = (i / 6) * Math.PI * 2;
    const p = [Math.cos(ang) * R, Math.sin(ang) * R, 0];
    carbons.push(m.add('C', p, { ring: true }));
  }
  for (let i = 0; i < 6; i++) {
    m.bond(carbons[i], carbons[(i + 1) % 6], i % 2 === 0 ? 2 : 1, 'aromatic');
  }
  for (let i = 0; i < 6; i++) {
    if (withSubstituent && i === 0) continue;
    const p = m.atoms[carbons[i]].pos;
    const outward = v.norm(p);
    const hp = v.add(p, v.scale(outward, L.CH));
    m.bond(carbons[i], m.add('H', hp), 1);
  }
  return { m, carbons, R };
}

function benzene() {
  return benzeneRing().m;
}

function phenol() {
  const { m, carbons } = benzeneRing(true);
  const p0 = m.atoms[carbons[0]].pos;
  const outward = v.norm(p0);
  const oPos = v.add(p0, v.scale(outward, L.CO));
  const o = m.add('O', oPos, { fg: 'OH' });
  m.bond(carbons[0], o, 1);
  const hDir = v.norm(v.add(outward, [0, 0.6, 0]));
  const h = m.add('H', v.add(oPos, v.scale(hDir, L.OH)), { fg: 'OH' });
  m.bond(o, h, 1, 'polar');
  return m;
}

function toluene() {
  const { m, carbons } = benzeneRing(true);
  const p0 = m.atoms[carbons[0]].pos;
  const outward = v.norm(p0);
  const cPos = v.add(p0, v.scale(outward, L.CC));
  const c = m.add('C', cPos, { fg: 'CH3' });
  m.bond(carbons[0], c, 1);
  m.methyl(c, cPos, outward);
  return m;
}

// ---------- assemble library ----------
const RAW = {
  // inorganic / small
  water: { build: water, name: 'Water', formula: 'H₂O', category: 'inorganic', class: 'Inorganic', blurb: 'The bent, polar molecule that makes life possible.' },
  carbonDioxide: { build: carbonDioxide, name: 'Carbon Dioxide', formula: 'CO₂', category: 'inorganic', class: 'Inorganic', blurb: 'Linear molecule with two polar bonds that cancel.' },
  ammonia: { build: ammonia, name: 'Ammonia', formula: 'NH₃', category: 'inorganic', class: 'Inorganic', blurb: 'Trigonal-pyramidal base with a lone pair on nitrogen.' },
  dioxygen: { build: () => diatomic('O', 2, 1.21), name: 'Oxygen', formula: 'O₂', category: 'inorganic', class: 'Inorganic', blurb: 'The double-bonded gas that fuels respiration.' },
  dinitrogen: { build: () => diatomic('N', 3, 1.10), name: 'Nitrogen', formula: 'N₂', category: 'inorganic', class: 'Inorganic', blurb: 'A very stable triple bond — 78% of the air.' },
  dihydrogen: { build: () => diatomic('H', 1, 0.74), name: 'Hydrogen', formula: 'H₂', category: 'inorganic', class: 'Inorganic', blurb: 'The simplest molecule in the universe.' },
  hcl: { build: hcl, name: 'Hydrogen Chloride', formula: 'HCl', category: 'inorganic', class: 'Inorganic', blurb: 'A strongly polar bond; dissolves to a strong acid.' },

  // alkanes (generated)
  methane: { build: () => buildAlkane(1), name: 'Methane', formula: 'CH₄', category: 'organic', class: 'Alkane', blurb: 'Perfect tetrahedron — the simplest hydrocarbon.' },
  ethane: { build: () => buildAlkane(2), name: 'Ethane', formula: 'C₂H₆', category: 'organic', class: 'Alkane', blurb: 'Two sp³ carbons with free rotation about the C–C bond.' },
  propane: { build: () => buildAlkane(3), name: 'Propane', formula: 'C₃H₈', category: 'organic', class: 'Alkane', blurb: 'A three-carbon zig-zag; bottled fuel gas.' },
  butane: { build: () => buildAlkane(4), name: 'Butane', formula: 'C₄H₁₀', category: 'organic', class: 'Alkane', blurb: 'Lighter fluid; note the tetrahedral zig-zag backbone.' },

  // unsaturated
  ethene: { build: ethene, name: 'Ethene', formula: 'C₂H₄', category: 'organic', class: 'Alkene', blurb: 'A flat, sp² molecule with a reactive C=C double bond.' },
  propene: { build: propene, name: 'Propene', formula: 'C₃H₆', category: 'organic', class: 'Alkene', blurb: 'Feedstock for polypropylene; C=C plus a methyl group.' },
  ethyne: { build: ethyne, name: 'Ethyne', formula: 'C₂H₂', category: 'organic', class: 'Alkyne', blurb: 'Linear triple bond; burns as oxy-acetylene.' },

  // alcohols
  methanol: { build: methanol, name: 'Methanol', formula: 'CH₃OH', category: 'organic', class: 'Alcohol', blurb: 'Simplest alcohol; the –OH hydroxyl group defines the class.' },
  ethanol: { build: ethanol, name: 'Ethanol', formula: 'C₂H₅OH', category: 'organic', class: 'Alcohol', blurb: 'Drinking alcohol and a biofuel; hydroxyl on a two-carbon chain.' },

  // carbonyls
  methanal: { build: methanal, name: 'Methanal', formula: 'HCHO', category: 'organic', class: 'Aldehyde', blurb: 'Formaldehyde; the terminal C=O carbonyl of aldehydes.' },
  ethanal: { build: ethanal, name: 'Ethanal', formula: 'CH₃CHO', category: 'organic', class: 'Aldehyde', blurb: 'Acetaldehyde; carbonyl with one hydrogen and one methyl.' },
  propanone: { build: propanone, name: 'Propanone', formula: 'CH₃COCH₃', category: 'organic', class: 'Ketone', blurb: 'Acetone; a C=O carbonyl flanked by two carbons.' },

  // acids & esters
  ethanoicAcid: { build: ethanoicAcid, name: 'Ethanoic Acid', formula: 'CH₃COOH', category: 'organic', class: 'Carboxylic acid', blurb: 'Acetic acid — the –COOH group makes vinegar sour.' },
  methylEthanoate: { build: methylEthanoate, name: 'Methyl Ethanoate', formula: 'CH₃COOCH₃', category: 'organic', class: 'Ester', blurb: 'A fragrant ester; –COO– links an acid and an alcohol.' },

  // amines & aromatics
  methylamine: { build: methylamine, name: 'Methylamine', formula: 'CH₃NH₂', category: 'organic', class: 'Amine', blurb: 'Simplest primary amine; basic –NH₂ group.' },
  benzene: { build: benzene, name: 'Benzene', formula: 'C₆H₆', category: 'organic', class: 'Aromatic', blurb: 'The aromatic ring — delocalised electrons above and below the plane.' },
  phenol: { build: phenol, name: 'Phenol', formula: 'C₆H₅OH', category: 'organic', class: 'Aromatic', blurb: 'A hydroxyl bonded directly to an aromatic ring; weakly acidic.' },
  toluene: { build: toluene, name: 'Toluene', formula: 'C₆H₅CH₃', category: 'organic', class: 'Aromatic', blurb: 'Methylbenzene; a common aromatic solvent.' },
};

export const MOLECULE_LIB = Object.fromEntries(
  Object.entries(RAW).map(([id, def]) => {
    const built = def.build();
    return [id, finalize(built, {
      id,
      name: def.name,
      formula: def.formula,
      category: def.category,
      class: def.class,
      blurb: def.blurb,
    })];
  })
);

export const getMolecule = (id) => MOLECULE_LIB[id];

// Organic molecules grouped by functional-group class, in teaching order.
export const ORGANIC_CLASS_ORDER = [
  'Alkane', 'Alkene', 'Alkyne', 'Alcohol', 'Aldehyde',
  'Ketone', 'Carboxylic acid', 'Ester', 'Amine', 'Aromatic',
];

export const CLASS_INFO = {
  Alkane: { group: '–C–C–', color: '#7dd3fc', note: 'Saturated single bonds only.' },
  Alkene: { group: 'C=C', color: '#34d399', note: 'A reactive carbon–carbon double bond.' },
  Alkyne: { group: 'C≡C', color: '#22d3ee', note: 'A carbon–carbon triple bond.' },
  Alcohol: { group: '–OH', color: '#f87171', note: 'The hydroxyl group.' },
  Aldehyde: { group: '–CHO', color: '#fbbf24', note: 'A terminal carbonyl.' },
  Ketone: { group: 'C=O', color: '#fb923c', note: 'An internal carbonyl.' },
  'Carboxylic acid': { group: '–COOH', color: '#f472b6', note: 'Carbonyl plus hydroxyl — acidic.' },
  Ester: { group: '–COO–', color: '#c084fc', note: 'Acid + alcohol, minus water.' },
  Amine: { group: '–NH₂', color: '#818cf8', note: 'A nitrogen-based base.' },
  Aromatic: { group: 'ring', color: '#a3e635', note: 'Delocalised ring electrons.' },
};

export const getOrganicByClass = () => {
  const grouped = {};
  ORGANIC_CLASS_ORDER.forEach((c) => { grouped[c] = []; });
  Object.values(MOLECULE_LIB).forEach((m) => {
    if (m.category === 'organic' && grouped[m.class]) grouped[m.class].push(m);
  });
  return grouped;
};
