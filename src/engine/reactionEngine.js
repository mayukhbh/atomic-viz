// Reaction interpolation engine.
//
// Reactions are authored as a sequence of stages (each a full set of atoms + bonds keyed
// by stable ids). Instead of snapping between stages, this engine takes a continuous
// progress value in [0,1] and returns smoothly interpolated atom positions, scales and
// opacities plus fading bonds — the basis for premium, production-feeling animation.

// easing
export const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const lerp = (a, b, t) => a + (b - a) * t;
const lerp3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

const bondKey = (b) => [b.start, b.end].sort().join('::');

// Interpolate a reaction at global progress p ∈ [0,1].
export function interpolateReaction(reaction, p) {
  const stages = reaction.stages;
  if (!stages || stages.length === 0) return { atoms: [], bonds: [] };
  if (stages.length === 1) {
    return {
      atoms: stages[0].atoms.map((a) => ({
        id: a.id, element: a.element, position: a.position,
        opacity: a.hidden ? 0 : 1, scale: a.hidden ? 0 : 1,
      })),
      bonds: stages[0].bonds.map((b) => ({ ...b, opacity: 1 })),
    };
  }

  const clamped = Math.max(0, Math.min(1, p));
  const segments = stages.length - 1;
  const scaled = clamped * segments;
  let seg = Math.floor(scaled);
  if (seg >= segments) seg = segments - 1;
  const localT = scaled - seg;
  const t = easeInOutCubic(localT);

  const from = stages[seg];
  const to = stages[seg + 1];

  // atoms — assume stable ids across stages, fall back gracefully
  const toById = new Map(to.atoms.map((a) => [a.id, a]));
  const atoms = from.atoms.map((a) => {
    const b = toById.get(a.id) || a;
    const fromHidden = a.hidden ? 0 : 1;
    const toHidden = b.hidden ? 0 : 1;
    const vis = lerp(fromHidden, toHidden, t);
    return {
      id: a.id,
      element: b.hidden && !a.hidden ? a.element : b.element,
      position: lerp3(a.position, b.position, t),
      opacity: vis,
      scale: vis,
    };
  });

  // bonds — fade in/out by presence in from/to
  const fromMap = new Map(from.bonds.map((b) => [bondKey(b), b]));
  const toMap = new Map(to.bonds.map((b) => [bondKey(b), b]));
  const keys = new Set([...fromMap.keys(), ...toMap.keys()]);
  const bonds = [];
  keys.forEach((k) => {
    const fb = fromMap.get(k);
    const tb = toMap.get(k);
    if (fb && tb) bonds.push({ ...tb, opacity: 1 });
    else if (fb && !tb) bonds.push({ ...fb, opacity: 1 - t });
    else if (!fb && tb) bonds.push({ ...tb, opacity: t });
  });

  return { atoms, bonds, seg, localT };
}

// Discrete stage index closest to progress (for labels / dots).
export function stageIndexAt(reaction, p) {
  const n = reaction.stages?.length || 1;
  return Math.min(n - 1, Math.round(p * (n - 1)));
}

// ---- Energy profile (reaction coordinate diagram) ----
// Synthesises a physically-shaped curve: reactant plateau → activation barrier →
// product plateau. Heights are normalised for display; the sign of ΔH is honoured.
export function energyProfile(reaction, samples = 120) {
  const dH = reaction.enthalpy ?? 0;
  const exothermic = dH < 0;

  // normalise product level to [-1, 1]-ish band relative to reactants at 0
  const norm = Math.tanh((Math.abs(dH) || 1) / 400); // 0..1
  const productLevel = exothermic ? -norm : norm;

  // activation barrier: user-supplied or a plausible default above the higher plateau
  const base = Math.max(0, productLevel);
  const barrier = reaction.activationEnergy != null
    ? reaction.activationEnergy
    : base + 0.35 + norm * 0.25;

  const pts = [];
  for (let i = 0; i <= samples; i++) {
    const x = i / samples;
    let y;
    if (x < 0.25) {
      y = 0; // reactant plateau
    } else if (x > 0.75) {
      y = productLevel; // product plateau
    } else {
      // smooth barrier hump from reactant(0) to product level, peaking mid-way
      const u = (x - 0.25) / 0.5; // 0..1 across transition
      const bell = Math.sin(u * Math.PI); // 0 at ends, 1 at middle
      const baseline = lerp(0, productLevel, u);
      y = baseline + bell * (barrier - Math.max(0, lerp(0, productLevel, u)));
    }
    pts.push({ x, y });
  }
  return { points: pts, dH, exothermic, barrier, productLevel };
}
