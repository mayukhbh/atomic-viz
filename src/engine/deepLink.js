import { ELEMENTS } from '../data/elements';

export const DEFAULT_ELEMENT = 'C';
export const ELEMENT_PARAM = 'el';

/** Normalise user input ("au", "AU", " Au ") to a canonical symbol, or null if unknown. */
export function normalizeSymbol(raw) {
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!/^[a-z]{1,3}$/i.test(trimmed)) return null;
  const symbol = trimmed[0].toUpperCase() + trimmed.slice(1).toLowerCase();
  return Object.hasOwn(ELEMENTS, symbol) ? symbol : null;
}

/**
 * Read the element deep link from a query string.
 * - symbol: the element to open (always valid; Carbon when missing or invalid)
 * - fromLink: true only when a valid symbol came from the URL
 * - invalid: true when an ?el= value was present but not a known element
 */
export function parseElementParam(search) {
  let raw = null;
  try { raw = new URLSearchParams(search || '').get(ELEMENT_PARAM); } catch { raw = null; }
  if (raw == null) return { symbol: DEFAULT_ELEMENT, fromLink: false, invalid: false };
  const symbol = normalizeSymbol(raw);
  return symbol
    ? { symbol, fromLink: true, invalid: false }
    : { symbol: DEFAULT_ELEMENT, fromLink: false, invalid: true };
}

/** Return href with ?el= set to symbol, keeping other params and the hash. Pass null to remove it. */
export function withElementParam(href, symbol) {
  const url = new URL(href);
  if (symbol) url.searchParams.set(ELEMENT_PARAM, symbol);
  else url.searchParams.delete(ELEMENT_PARAM);
  return url.toString();
}
