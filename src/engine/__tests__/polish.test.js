import { describe, it, expect } from 'vitest';
import { formatEnergy } from '../format';
import { CATEGORY_ORDER, CATEGORY_COLORS } from '../../data/categories';
import { ELEMENTS } from '../../data/elements';
import { REACTIONS } from '../../data/reactions';
import { energyProfile } from '../reactionEngine';

describe('formatEnergy', () => {
  it('keeps ordinary chemical enthalpies readable', () => {
    expect(formatEnergy(-572)).toBe('−572');
    expect(formatEnergy(30.5)).toBe('+30.5');
    expect(formatEnergy(2803)).toBe('+2,803');
    expect(formatEnergy(0)).toBe('0');
  });
  it('switches nuclear-scale values to scientific notation', () => {
    expect(formatEnergy(-200000000)).toBe('−2.0 × 10⁸');
    expect(formatEnergy(-17600000)).toBe('−1.8 × 10⁷');
    expect(formatEnergy(-156000)).toBe('−1.6 × 10⁵');
    expect(formatEnergy(999999)).toBe('+1.0 × 10⁶');
  });
  it('handles missing or invalid input', () => {
    expect(formatEnergy(null)).toBe('—');
    expect(formatEnergy(undefined)).toBe('—');
    expect(formatEnergy(Number.NaN)).toBe('—');
    expect(formatEnergy(Infinity)).toBe('—');
  });
  it('produces a short string for every authored reaction', () => {
    for (const r of REACTIONS) expect(formatEnergy(r.enthalpy).length).toBeLessThan(14);
  });
});

describe('periodic table categories', () => {
  it('colours every element category and lists each one in the legend', () => {
    const used = new Set(Object.values(ELEMENTS).map((e) => e.category));
    for (const category of used) {
      expect(CATEGORY_COLORS[category], category).toMatch(/^#[0-9a-f]{6}$/i);
      expect(CATEGORY_ORDER).toContain(category);
    }
  });
  it('uses a distinct colour per category', () => {
    const colours = CATEGORY_ORDER.map((c) => CATEGORY_COLORS[c].toLowerCase());
    expect(new Set(colours).size).toBe(colours.length);
  });
});

describe('energy profile extremes', () => {
  it('stays finite and bounded for nuclear-scale and missing enthalpy', () => {
    for (const enthalpy of [-200000000, 1e9, undefined, 0]) {
      const { points } = energyProfile({ enthalpy }, 60);
      for (const p of points) {
        expect(Number.isFinite(p.y)).toBe(true);
        expect(Math.abs(p.y)).toBeLessThan(2);
      }
    }
  });
});

describe('nuclear particle stand-ins', () => {
  it('labels every particle drawn with a stand-in element to match the equation', async () => {
    const { interpolateReaction } = await import('../reactionEngine');
    const fission = REACTIONS.find((r) => r.id === 'fission');
    const end = interpolateReaction(fission, 1).atoms.filter((a) => a.opacity > 0.5);
    const shown = end.map((a) => a.label || ELEMENTS[a.element].symbol).sort();
    expect(shown).toEqual(['Ba', 'Kr', 'n', 'n', 'n']);
    const beta = interpolateReaction(REACTIONS.find((r) => r.id === 'beta-decay'), 1).atoms.filter((a) => a.opacity > 0.5);
    expect(beta.map((a) => a.label || a.element).sort()).toEqual(['N', 'e⁻']);
  });
});
