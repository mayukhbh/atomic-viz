// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, act, cleanup } from '@testing-library/react';
import { normalizeSymbol, parseElementParam, withElementParam, DEFAULT_ELEMENT } from '../../../engine/deepLink';
import { ANALYTICS_EVENT } from '../../../engine/analytics';
import { bohrOuterRadius, fitDistance, MIN_ATOM_DISTANCE } from '../../../engine/atomFraming';
import { ELEMENTS } from '../../../data/elements';
import { useElementDeepLink } from '../useElementDeepLink';
import { shareAtom, shareMessage } from '../shareAtom';

describe('deep-link parsing', () => {
  it('accepts every element symbol, case-insensitively', () => {
    for (const symbol of Object.keys(ELEMENTS)) {
      expect(parseElementParam(`?el=${symbol}`)).toEqual({ symbol, fromLink: true, invalid: false });
      expect(normalizeSymbol(symbol.toUpperCase())).toBe(symbol);
      expect(normalizeSymbol(` ${symbol.toLowerCase()} `)).toBe(symbol);
    }
  });

  it('falls back to Carbon for missing, empty or invalid values', () => {
    expect(parseElementParam('')).toEqual({ symbol: 'C', fromLink: false, invalid: false });
    expect(parseElementParam('?view=atom')).toEqual({ symbol: 'C', fromLink: false, invalid: false });
    for (const bad of ['?el=', '?el=Xx', '?el=Uuo', '?el=gold', '?el=1', '?el=%3Cscript%3E', '?el=__proto__', '?el=constructor']) {
      expect(parseElementParam(bad), bad).toEqual({ symbol: DEFAULT_ELEMENT, fromLink: false, invalid: true });
    }
    expect(parseElementParam(undefined).symbol).toBe('C');
  });

  it('sets or removes ?el= while keeping other params and the hash', () => {
    expect(withElementParam('https://x.test/app?profile=1#top', 'Au')).toBe('https://x.test/app?profile=1&el=Au#top');
    expect(withElementParam('https://x.test/?el=Au&profile=1', 'Og')).toBe('https://x.test/?el=Og&profile=1');
    expect(withElementParam('https://x.test/?el=Au', null)).toBe('https://x.test/');
  });
});

describe('useElementDeepLink', () => {
  let events;
  const listener = (e) => events.push(e.detail);
  beforeEach(() => { events = []; window.addEventListener(ANALYTICS_EVENT, listener); });
  afterEach(() => { cleanup(); window.removeEventListener(ANALYTICS_EVENT, listener); window.history.replaceState(null, '', '/'); });

  it('opens the linked element and reports the deep link once', () => {
    window.history.replaceState(null, '', '/?el=au');
    const { result, rerender } = renderHook(() => useElementDeepLink());
    rerender();
    expect(result.current[0]).toBe('Au');
    expect(window.location.search).toBe('?el=Au'); // canonicalised
    expect(events.filter((e) => e.name === 'atom_deeplink_opened')).toEqual([
      expect.objectContaining({ name: 'atom_deeplink_opened', props: { element: 'Au' } }),
    ]);
  });

  it('keeps a plain visit on a clean URL and does not report a deep link', () => {
    window.history.replaceState(null, '', '/');
    const { result } = renderHook(() => useElementDeepLink());
    expect(result.current[0]).toBe('C');
    expect(window.location.search).toBe('');
    expect(events).toEqual([]);
  });

  it('falls back to Carbon and removes an invalid symbol from the URL', () => {
    window.history.replaceState(null, '', '/?el=Zz&profile=1');
    const { result } = renderHook(() => useElementDeepLink());
    expect(result.current[0]).toBe('C');
    expect(window.location.search).toBe('?profile=1');
    expect(events).toEqual([]);
  });

  it('updates the URL on every change without adding history entries', () => {
    window.history.replaceState(null, '', '/');
    const pushSpy = vi.spyOn(window.history, 'pushState');
    const startLength = window.history.length;
    const { result } = renderHook(() => useElementDeepLink());
    for (const symbol of ['Au', 'U', 'Og']) {
      act(() => result.current[1](symbol));
      expect(window.location.search).toBe(`?el=${symbol}`);
    }
    act(() => result.current[1]('C'));
    expect(window.location.search).toBe(''); // back to the default view
    expect(window.history.length).toBe(startLength);
    expect(pushSpy).not.toHaveBeenCalled();
    pushSpy.mockRestore();
  });

  it('keeps an explicit ?el=C link', () => {
    window.history.replaceState(null, '', '/?el=C');
    renderHook(() => useElementDeepLink());
    expect(window.location.search).toBe('?el=C');
  });
});

describe('camera framing', () => {
  const at = (symbol, viewport) => fitDistance({ radius: bohrOuterRadius(ELEMENTS[symbol]) * 1.5, fovDeg: 45, ...viewport });
  const desktop = { aspect: 1440 / 900, compact: false };
  const phone = { aspect: 390 / 844, compact: true };

  it('keeps the original distance for light atoms on desktop', () => {
    expect(at('H', desktop)).toBe(MIN_ATOM_DISTANCE);
    expect(at('C', desktop)).toBe(MIN_ATOM_DISTANCE);
  });

  it('pulls back so the outer shell fits for heavy atoms and on phones', () => {
    for (const symbol of ['C', 'Au', 'U', 'Og']) {
      for (const viewport of [desktop, phone]) {
        const r = bohrOuterRadius(ELEMENTS[symbol]) * 1.5;
        const d = at(symbol, viewport);
        const halfH = d * Math.tan(Math.PI / 8);
        expect(r, `${symbol} vertical`).toBeLessThanOrEqual(halfH + 1e-9);
        expect(r, `${symbol} horizontal`).toBeLessThanOrEqual(halfH * viewport.aspect + 1e-9);
      }
    }
    expect(at('Og', desktop)).toBeGreaterThan(MIN_ATOM_DISTANCE);
  });

  it('derives the outer radius from the element data', () => {
    const shells = ELEMENTS.Au.electrons.length;
    expect(bohrOuterRadius(ELEMENTS.Au)).toBeCloseTo(ELEMENTS.Au.radius * 1.6 + (shells - 1) * 0.55 + 0.045);
    expect(bohrOuterRadius({ radius: 0.7 })).toBe(0.7);
  });
});

describe('shareAtom', () => {
  const href = 'https://atomic.test/?el=C';
  const gold = ELEMENTS.Au;

  it('builds share copy from element data', () => {
    expect(shareMessage(gold)).toBe(`Gold has 79 electrons in ${gold.electrons.length} shells. Spin it in 3D:`);
    expect(shareMessage(ELEMENTS.H)).toBe('Hydrogen has 1 electron in 1 shell. Spin it in 3D:');
  });

  it('uses the native share sheet when available', async () => {
    const nav = { share: vi.fn().mockResolvedValue(undefined), clipboard: { writeText: vi.fn() } };
    const events = [];
    const listen = (e) => events.push(e.detail);
    window.addEventListener(ANALYTICS_EVENT, listen);
    expect(await shareAtom(gold, { nav, href })).toBe('shared');
    window.removeEventListener(ANALYTICS_EVENT, listen);
    expect(nav.share).toHaveBeenCalledWith(expect.objectContaining({ url: 'https://atomic.test/?el=Au' }));
    expect(nav.clipboard.writeText).not.toHaveBeenCalled();
    expect(events).toEqual([expect.objectContaining({ name: 'atom_share_clicked', props: { element: 'Au', method: 'native' } })]);
  });

  it('treats a dismissed share sheet as cancelled, not an error', async () => {
    const nav = { share: vi.fn().mockRejectedValue(Object.assign(new Error('x'), { name: 'AbortError' })), clipboard: { writeText: vi.fn() } };
    expect(await shareAtom(gold, { nav, href })).toBe('cancelled');
    expect(nav.clipboard.writeText).not.toHaveBeenCalled();
  });

  it('falls back to the clipboard when native share is missing or refused', async () => {
    const clip = { writeText: vi.fn().mockResolvedValue(undefined) };
    expect(await shareAtom(gold, { nav: { clipboard: clip }, href })).toBe('copied');
    expect(clip.writeText).toHaveBeenCalledWith(expect.stringContaining('https://atomic.test/?el=Au'));
    const refused = { share: vi.fn().mockRejectedValue(new Error('NotAllowedError')), clipboard: clip };
    expect(await shareAtom(gold, { nav: refused, href })).toBe('copied');
  });

  it('reports failure instead of throwing when nothing is available', async () => {
    expect(await shareAtom(gold, { nav: {}, href })).toBe('failed');
  });
});
