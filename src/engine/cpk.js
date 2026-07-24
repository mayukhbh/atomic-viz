// CPK render data for atoms: standardized colors and physically meaningful radii.
// Covalent radii drive bond geometry / ball-and-stick sizing; van der Waals radii
// drive the space-filling model. Values in ångström-like units, scaled for the scene.

// Vibrant, luminous take on the CPK convention — element identities stay recognisable
// (O red, N blue, S yellow, halogens green…) but colors are pushed brighter and more
// saturated, and carbon is a light slate-blue instead of near-black so molecules pop.
export const CPK = {
  H:  { color: '#eaf1ff', covalent: 0.31, vdw: 1.20, valence: 1 },
  He: { color: '#c6fbff', covalent: 0.28, vdw: 1.40, valence: 0 },
  Li: { color: '#d98cff', covalent: 1.28, vdw: 1.82, valence: 1 },
  Be: { color: '#b6ff3d', covalent: 0.96, vdw: 1.53, valence: 2 },
  B:  { color: '#ff9d9d', covalent: 0.84, vdw: 1.92, valence: 3 },
  C:  { color: '#7c8aa5', covalent: 0.76, vdw: 1.70, valence: 4 },
  N:  { color: '#4d6bff', covalent: 0.71, vdw: 1.55, valence: 3 },
  O:  { color: '#ff4d5e', covalent: 0.66, vdw: 1.52, valence: 2 },
  F:  { color: '#57e8a0', covalent: 0.57, vdw: 1.47, valence: 1 },
  Ne: { color: '#7fe0f5', covalent: 0.58, vdw: 1.54, valence: 0 },
  Na: { color: '#b57cff', covalent: 1.66, vdw: 2.27, valence: 1 },
  Mg: { color: '#7bff3d', covalent: 1.41, vdw: 1.73, valence: 2 },
  Al: { color: '#e0a6b8', covalent: 1.21, vdw: 1.84, valence: 3 },
  Si: { color: '#f5b98a', covalent: 1.11, vdw: 2.10, valence: 4 },
  P:  { color: '#ff9a3d', covalent: 1.07, vdw: 1.80, valence: 3 },
  S:  { color: '#ffd22e', covalent: 1.05, vdw: 1.80, valence: 2 },
  Cl: { color: '#45e06a', covalent: 1.02, vdw: 1.75, valence: 1 },
  Ar: { color: '#7fd6e8', covalent: 1.06, vdw: 1.88, valence: 0 },
  K:  { color: '#a15cff', covalent: 2.03, vdw: 2.75, valence: 1 },
  Ca: { color: '#61ff4d', covalent: 1.76, vdw: 2.31, valence: 2 },
  Fe: { color: '#ff8a4d', covalent: 1.32, vdw: 2.05, valence: 3 },
  Cu: { color: '#ff9d5c', covalent: 1.32, vdw: 2.00, valence: 2 },
  Zn: { color: '#8fa0d6', covalent: 1.22, vdw: 2.10, valence: 2 },
  Br: { color: '#e05a2e', covalent: 1.20, vdw: 1.85, valence: 1 },
  I:  { color: '#b84dff', covalent: 1.39, vdw: 1.98, valence: 1 },
  U:  { color: '#66c8ff', covalent: 1.96, vdw: 1.86, valence: 6 },
};

const DEFAULT = { color: '#ff69b4', covalent: 0.9, vdw: 1.6, valence: 4 };

export const cpk = (element) => CPK[element] || DEFAULT;

// Standard bond colors used when a bond should not simply inherit atom color.
export const BOND_COLORS = {
  single: '#c9d2dc',
  double: '#c9d2dc',
  triple: '#c9d2dc',
  aromatic: '#c9d2dc',
  polar: '#4ecdc4',
  ionic: '#ff6b6b',
  hydrogen: '#8fb7ff',
};

// A gentle scene-wide scale so ångström coordinates read well at the default camera.
export const SCENE_SCALE = 1.35;
