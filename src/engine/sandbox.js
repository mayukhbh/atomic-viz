import { CPK } from './cpk';
import { MOLECULE_LIB } from './molecules';
import { v } from './builders';
export const SANDBOX_ELEMENTS = ['H','C','O','N'];
export const DISCOVERY_IDS = ['water','methane','carbonDioxide','ammonia','dioxygen','dihydrogen'];
/** Single-edge, additive proximity toy. Scene distance is not a measured bond length. */
export function bondMovedAtom(atoms, bonds, id) {
 const moved=atoms.find(a=>a.id===id); if(!moved)return {atoms,bonds};
 const next=[...bonds];let position=[...moved.position];
 const degree=id=>next.filter(b=>b.a===id||b.b===id).length;
 for(const other of atoms){
  if(other.id===id||next.some(b=>(b.a===id&&b.b===other.id)||(b.b===id&&b.a===other.id)))continue;
  const delta=v.sub(position,other.position), distance=v.len(delta);
  if(distance<1.5&&degree(id)<(CPK[moved.element]?.valence??0)&&degree(other.id)<(CPK[other.element]?.valence??0)){
   next.push({a:id,b:other.id,id:[id,other.id].sort().join(':')});
   position=v.add(other.position,distance>1e-8?v.scale(delta,1/distance):[1,0,0]);
  }
 }
 return {atoms:atoms.map(a=>a.id===id?{...a,position}:a),bonds:next};
}
/** Restricted small recipes: compare connected, element-labelled adjacency, not just counts.
 * Multiple bond order is not simulated by the sandbox.
 */
export function recognizeMolecules(atoms,bonds){
 const byId=new Map(atoms.map(a=>[a.id,a]));const neighbors=new Map(atoms.map(a=>[a.id,new Set()]));
 for(const b of bonds)if(b.a!==b.b&&byId.has(b.a)&&byId.has(b.b)){neighbors.get(b.a).add(b.b);neighbors.get(b.b).add(b.a);}
 const signature=(nodes,adjacent,element)=>nodes.map(id=>`${element(id)}:${[...adjacent(id)].map(element).sort().join(',')}`).sort().join('|');
 const seen=new Set(),found=new Set();
 for(const atom of atoms){
  if(seen.has(atom.id))continue;const component=[],queue=[atom.id];seen.add(atom.id);
  while(queue.length){const id=queue.pop();component.push(id);for(const n of neighbors.get(id))if(!seen.has(n)){seen.add(n);queue.push(n);}}
  const actual=signature(component,id=>neighbors.get(id),id=>byId.get(id).element);
  for(const id of DISCOVERY_IDS){const m=MOLECULE_LIB[id];const expected=signature(m.atoms.map((_,i)=>i),i=>m.bonds.filter(b=>b.a===i||b.b===i).map(b=>b.a===i?b.b:b.a),i=>m.atoms[i].el);if(actual===expected)found.add(id);}
 }return [...found];
}
export function readDiscoveries(storage){try{const data=JSON.parse(storage.getItem('atomicviz.discoveries.v1')||'[]');return Array.isArray(data)?[...new Set(data.filter(id=>DISCOVERY_IDS.includes(id)))]:[];}catch{return [];}}
export function saveDiscoveries(storage,ids){try{storage.setItem('atomicviz.discoveries.v1',JSON.stringify(ids));return true;}catch{return false;}}

const snapshot = state => ({ atoms: state.atoms, bonds: state.bonds });
const checkpoint = (state, next) => ({ ...next, history: [...(state.history || []), snapshot(state)].slice(-100) });
export const createSandboxState = () => ({ atoms: [], bonds: [], history: [] });
const validPosition = position => Array.isArray(position) && position.length === 3 && position.every(Number.isFinite);
const validId = id => typeof id === 'string' && id.length > 0;
export const canUndo = state => (state.history?.length || 0) > 0;
export function undo(state) {
  if (!canUndo(state)) return state;
  return { ...state.history.at(-1), history: state.history.slice(0, -1) };
}
export function addAtom(state, atom) {
  if (!atom || !validId(atom.id) || !SANDBOX_ELEMENTS.includes(atom.element) || !validPosition(atom.position) || state.atoms.some(a => a.id === atom.id)) {
    throw new TypeError('Atom requires a unique id, supported element and finite 3D position');
  }
  return checkpoint(state, { atoms: [...state.atoms, { ...atom, position: [...atom.position], ...(atom.bonds ? { bonds: [...atom.bonds] } : {}) }], bonds: state.bonds });
}
export function addBond(state, bond) {
  if (!bond || !validId(bond.id) || bond.a === bond.b || ![bond.a, bond.b].every(id => state.atoms.some(a => a.id === id))) throw new TypeError('Bond requires an id and two distinct existing atoms');
  if (state.bonds.some(b => (b.a === bond.a && b.b === bond.b) || (b.b === bond.a && b.a === bond.b))) return state;
  if (state.bonds.some(b => b.id === bond.id)) throw new TypeError('Bond id must be unique');
  if ([bond.a, bond.b].some(id => state.bonds.filter(b => b.a === id || b.b === id).length >= CPK[state.atoms.find(a => a.id === id).element].valence)) throw new TypeError('Bond exceeds sandbox valence');
  return checkpoint(state, { atoms: state.atoms, bonds: [...state.bonds, { ...bond }] });
}
export function deleteAtom(state, atomId) {
  if (!state.atoms.some(a => a.id === atomId)) return state;
  return checkpoint(state, { atoms: state.atoms.filter(a => a.id !== atomId), bonds: state.bonds.filter(b => b.a !== atomId && b.b !== atomId) });
}
export function breakBond(state, bondId) {
  if (!state.bonds.some(b => b.id === bondId)) return state;
  return checkpoint(state, { atoms: state.atoms, bonds: state.bonds.filter(b => b.id !== bondId) });
}
export function moveAtom(state, atomId, position) {
  if (!validPosition(position)) throw new TypeError('Position must contain three finite numbers');
  if (!state.atoms.some(a => a.id === atomId)) return state;
  return { ...state, atoms: state.atoms.map(a => a.id === atomId ? { ...a, position: [...position] } : a) };
}
export function bondMovedState(state, atomId) {
  const next = bondMovedAtom(state.atoms, state.bonds, atomId);
  return next.bonds.length === state.bonds.length ? state : checkpoint(state, next);
}
