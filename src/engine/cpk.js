// CPK render data for atoms: standardized colors and physically meaningful radii.
// Covalent radii drive bond geometry / ball-and-stick sizing; van der Waals radii
// drive the space-filling model. Values in ångström-like units, scaled for the scene.

export const CPK = {
  H:  { color: '#f5f7fa', covalent: 0.31, vdw: 1.20, valence: 1 },
  He: { color: '#d9ffff', covalent: 0.28, vdw: 1.40, valence: 0 },
  Li: { color: '#cc80ff', covalent: 1.28, vdw: 1.82, valence: 1 },
  Be: { color: '#c2ff00', covalent: 0.96, vdw: 1.53, valence: 2 },
  B:  { color: '#ffb5b5', covalent: 0.84, vdw: 1.92, valence: 3 },
  C:  { color: '#4a4f57', covalent: 0.76, vdw: 1.70, valence: 4 },
  N:  { color: '#2f6fff', covalent: 0.71, vdw: 1.55, valence: 3 },
  O:  { color: '#ff3b30', covalent: 0.66, vdw: 1.52, valence: 2 },
  F:  { color: '#7fff9f', covalent: 0.57, vdw: 1.47, valence: 1 },
  Ne: { color: '#b3e3f5', covalent: 0.58, vdw: 1.54, valence: 0 },
  Na: { color: '#ab5cf2', covalent: 1.66, vdw: 2.27, valence: 1 },
  Mg: { color: '#8aff00', covalent: 1.41, vdw: 1.73, valence: 2 },
  Al: { color: '#bfa6a6', covalent: 1.21, vdw: 1.84, valence: 3 },
  Si: { color: '#f0c8a0', covalent: 1.11, vdw: 2.10, valence: 4 },
  P:  { color: '#ff8000', covalent: 1.07, vdw: 1.80, valence: 3 },
  S:  { color: '#ffe019', covalent: 1.05, vdw: 1.80, valence: 2 },
  Cl: { color: '#3df23d', covalent: 1.02, vdw: 1.75, valence: 1 },
  Ar: { color: '#80d1e3', covalent: 1.06, vdw: 1.88, valence: 0 },
  K:  { color: '#8f40d4', covalent: 2.03, vdw: 2.75, valence: 1 },
  Ca: { color: '#3dff00', covalent: 1.76, vdw: 2.31, valence: 2 },
  Fe: { color: '#e06633', covalent: 1.32, vdw: 2.05, valence: 3 },
  Cu: { color: '#c88033', covalent: 1.32, vdw: 2.00, valence: 2 },
  Zn: { color: '#7d80b0', covalent: 1.22, vdw: 2.10, valence: 2 },
  Br: { color: '#a62929', covalent: 1.20, vdw: 1.85, valence: 1 },
  I:  { color: '#940094', covalent: 1.39, vdw: 1.98, valence: 1 },
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
