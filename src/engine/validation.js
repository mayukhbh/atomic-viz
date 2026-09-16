/** Render-contract validation; not a scientific correctness or energy-stability check. */
export function validateMolecule(m){
 if(!m||!Array.isArray(m.atoms)||!m.atoms.length||!Array.isArray(m.bonds))throw Error('Molecule needs atoms and bonds');
 for(const a of m.atoms)if(typeof a.el!=='string'||!Array.isArray(a.pos)||a.pos.length!==3||!a.pos.every(Number.isFinite))throw Error('Invalid molecule atom');
 for(const b of m.bonds)if(![b.a,b.b].every(i=>Number.isInteger(i)&&i>=0&&i<m.atoms.length)||b.a===b.b||![1,2,3].includes(b.order))throw Error('Invalid molecule bond');
 return m;
}
