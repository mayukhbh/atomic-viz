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
