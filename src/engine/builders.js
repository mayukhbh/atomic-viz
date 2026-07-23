// Procedural molecular geometry builders.
//
// Rather than hand-typing hundreds of coordinate triples, molecules are grown from
// chemically correct primitives: tetrahedral (sp3) and trigonal (sp2) vertex geometry,
// standard bond lengths, and a homologous-series generator for alkanes/alcohols.
// This is what makes the structure library a real "generator" instead of a fixed table.

const TET = -1 / 3; // cos(109.47°), the ideal tetrahedral bond-bond cosine

// ---- minimal vec3 helpers (arrays of [x,y,z]) ----
export const v = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  scale: (a, s) => [a[0] * s, a[1] * s, a[2] * s],
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cross: (a, b) => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ],
  len: (a) => Math.hypot(a[0], a[1], a[2]),
  norm: (a) => {
    const l = Math.hypot(a[0], a[1], a[2]) || 1;
    return [a[0] / l, a[1] / l, a[2] / l];
  },
};

// Standard bond lengths (ångström).
export const BOND_LENGTH = {
  CC: 1.54, CCd: 1.34, CCt: 1.20, CCar: 1.39,
  CH: 1.09, CO: 1.43, COd: 1.23, OH: 0.96,
  CN: 1.47, CNd: 1.28, NH: 1.01, CCl: 1.77,
};

// An orthonormal pair perpendicular to a unit axis.
function perpBasis(axis) {
  const a = v.norm(axis);
  const ref = Math.abs(a[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  const e1 = v.norm(v.cross(a, ref));
  const e2 = v.norm(v.cross(a, e1));
  return [e1, e2];
}

// Two sp3 hydrogens on a carbon that already has two bonds (d1, d2 unit vectors).
export function tetrahedralPair(center, d1, d2, len = BOND_LENGTH.CH) {
  const s = v.scale(v.add(d1, d2), 0.5);
  const w = v.norm(v.cross(d1, d2));
  const k = Math.sqrt(Math.max(0, 1 - v.dot(s, s)));
  const h1 = v.add(v.scale(s, -1), v.scale(w, k));
  const h2 = v.sub(v.scale(s, -1), v.scale(w, k));
  return [v.add(center, v.scale(v.norm(h1), len)), v.add(center, v.scale(v.norm(h2), len))];
}

// Three sp3 substituents (a methyl cap) on a carbon with a single existing bond d1.
export function tetrahedralTripod(center, d1, len = BOND_LENGTH.CH, phase = 0) {
  const axis = v.norm(d1);
  const [e1, e2] = perpBasis(axis);
  const perp = Math.sqrt(1 - TET * TET);
  return [0, 1, 2].map((i) => {
    const phi = phase + (i * 2 * Math.PI) / 3;
    const dir = v.add(
      v.scale(axis, TET),
      v.scale(v.add(v.scale(e1, Math.cos(phi)), v.scale(e2, Math.sin(phi))), perp)
    );
    return v.add(center, v.scale(v.norm(dir), len));
  });
}

// The third bond of an sp2 (trigonal-planar) center given two in-plane bonds.
export function trigonalThird(center, d1, d2, len) {
  const dir = v.norm(v.scale(v.add(v.norm(d1), v.norm(d2)), -1));
  return v.add(center, v.scale(dir, len));
}

// Two sp2 bonds at ±120° from an existing bond d1, in the plane defined by d1 and `up`.
export function trigonalPair(center, d1, len, up = [0, 0, 1]) {
  const axis = v.norm(d1);
  const n = v.norm(v.cross(axis, up));
  const rot = (ang) => {
    const c = Math.cos(ang), s = Math.sin(ang);
    // rotate -axis by ang around n (Rodrigues, n already perpendicular to axis)
    const base = v.scale(axis, -1);
    return v.add(
      v.add(v.scale(base, c), v.scale(v.cross(n, base), s)),
      v.scale(n, v.dot(n, base) * (1 - c))
    );
  };
  const t = ((180 - 120) * Math.PI) / 180; // deviation from the reversed axis
  return [
    v.add(center, v.scale(v.norm(rot(t)), len)),
    v.add(center, v.scale(v.norm(rot(-t)), len)),
  ];
}

// ---- Homologous-series generator: straight-chain alkane CnH(2n+2) ----
// Builds a proper tetrahedral zig-zag backbone and caps every carbon with hydrogens.
export function buildAlkane(n) {
  // zig-zag geometry giving the exact tetrahedral C-C-C angle
  const a = 0.889, b = 1.257; // derived so |(a,b)|=1.54 and angle=109.47°
  const carbons = [];
  for (let i = 0; i < n; i++) carbons.push([i * a, (i % 2) * b, 0]);

  const atoms = carbons.map((pos) => ({ el: 'C', pos }));
  const bonds = [];
  for (let i = 0; i < n - 1; i++) bonds.push({ a: i, b: i + 1, order: 1 });

  const addH = (ci, hp) => {
    const idx = atoms.length;
    atoms.push({ el: 'H', pos: hp });
    bonds.push({ a: ci, b: idx, order: 1 });
  };

  carbons.forEach((c, i) => {
    if (n === 1) {
      // methane: perfect tetrahedron
      const dirs = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]];
      dirs.forEach((d) => addH(0, v.add(c, v.scale(v.norm(d), BOND_LENGTH.CH))));
      return;
    }
    if (i === 0 || i === n - 1) {
      const neighbor = i === 0 ? carbons[1] : carbons[n - 2];
      const d1 = v.norm(v.sub(c, neighbor)); // points away from chain
      tetrahedralTripod(c, d1).forEach((hp) => addH(i, hp));
    } else {
      const d1 = v.norm(v.sub(carbons[i - 1], c));
      const d2 = v.norm(v.sub(carbons[i + 1], c));
      tetrahedralPair(c, d1, d2).forEach((hp) => addH(i, hp));
    }
  });

  return { atoms, bonds };
}

// Center a molecule on its centroid so it orbits cleanly.
export function centerMolecule(mol) {
  const n = mol.atoms.length || 1;
  const c = mol.atoms.reduce((acc, at) => v.add(acc, at.pos), [0, 0, 0]);
  const centroid = v.scale(c, 1 / n);
  return {
    ...mol,
    atoms: mol.atoms.map((at) => ({ ...at, pos: v.sub(at.pos, centroid) })),
  };
}
