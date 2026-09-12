import { ELEMENTS } from '../data/elements';
const BY_NUMBER=new Map(Object.values(ELEMENTS).map(e=>[e.atomicNumber,e]));
export const elementByAtomicNumber=n=>BY_NUMBER.get(n)||null;
export function chargeFor(protons,electrons){const value=protons-electrons;return {value,text:value===0?'Neutral Atom':value>0?`Cation (+${value})`:`Anion (${value})`,color:value===0?'text-green-400':value>0?'text-red-400':'text-blue-400'};}
/** Preserved legacy N/Z heuristic. NOT isotope data, including its broad hydrogen band. */
export function stabilityHint(protons,neutrons){
 if(!protons)return {stable:false,text:'No nucleus',color:'text-white/60'};
 const ratio=neutrons/protons,stable=protons===1?neutrons<=2:protons<20?ratio>=0.8&&ratio<=1.2:ratio>=1&&ratio<=1.5;
 return {stable,text:stable?'Within heuristic range':'Outside heuristic range',color:stable?'text-cyan-300':'text-yellow-400'};
}
