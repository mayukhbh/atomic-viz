// Vendor-neutral analytics hook. AtomicViz ships no analytics provider, so events are
// dispatched as a DOM CustomEvent that any provider can subscribe to later:
//
//   window.addEventListener('atomicviz:analytics', (e) => provider.track(e.detail.name, e.detail.props));
//
// Event catalogue: docs/ANALYTICS_EVENTS.md. Tracking must never break the app.
export const ANALYTICS_EVENT = 'atomicviz:analytics';

export function track(name, props = {}) {
  try {
    if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function') return;
    window.dispatchEvent(new CustomEvent(ANALYTICS_EVENT, { detail: { name, props, at: Date.now() } }));
  } catch {
    /* analytics is best-effort */
  }
}
