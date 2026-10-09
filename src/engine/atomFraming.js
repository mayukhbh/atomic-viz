// Shared Bohr-shell geometry and the camera framing derived from it. BohrModel draws
// its rings from these constants, so the camera always frames what is actually drawn.

export const BOHR_FIRST_SHELL = 1.6; // first ring radius as a multiple of the nucleus radius
export const BOHR_SHELL_STEP = 0.55; // spacing between successive rings (scene units)
export const ELECTRON_SIZE = 0.045;

export function bohrShellRadius(elementData, shellIndex) {
  return elementData.radius * BOHR_FIRST_SHELL + shellIndex * BOHR_SHELL_STEP;
}

/** Radius of the outermost ring plus its electrons, in the atom's local units. */
export function bohrOuterRadius(elementData) {
  const shells = elementData?.electrons?.length || 0;
  if (!shells) return elementData?.radius || 0.5;
  return bohrShellRadius(elementData, shells - 1) + ELECTRON_SIZE;
}

// Share of the half-frustum the atom may fill. Compact (phone) layouts reserve the
// bottom of the screen for the element name and controls, so the atom is framed in
// the upper region and shifted up by COMPACT_SHIFT of the viewport height.
export const FRAMING = {
  roomy: { fillV: 0.86, fillH: 0.9, shift: 0 },
  compact: { fillV: 0.52, fillH: 0.92, shift: 0.15 },
};
export const COMPACT_MAX_WIDTH = 700; // matches the phone breakpoint in index.css
export const MIN_ATOM_DISTANCE = 10; // the original fixed camera distance; light atoms keep it

/** Camera distance that fits a sphere of `radius` into the viewport, never closer than MIN_ATOM_DISTANCE. */
export function fitDistance({ radius, fovDeg, aspect, compact }) {
  const { fillV, fillH } = compact ? FRAMING.compact : FRAMING.roomy;
  const tanHalf = Math.tan((fovDeg * Math.PI) / 360);
  const safeAspect = aspect > 0 && Number.isFinite(aspect) ? aspect : 1;
  const vertical = radius / (tanHalf * fillV);
  const horizontal = radius / (tanHalf * safeAspect * fillH);
  return Math.max(MIN_ATOM_DISTANCE, vertical, horizontal);
}

/** Keep a user's zoom when only the viewport changes; ignore small browser-chrome height shifts. */
export function shouldRefitCamera(previous, { radius, width, height, distance }) {
  if (!previous || previous.radius !== radius) return true;
  if (Math.abs(distance - previous.distance) > 0.01) return false;
  if (width === previous.width && Math.abs(height - previous.height) / previous.height < 0.15) return false;
  return true;
}
