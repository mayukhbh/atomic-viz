import { withElementParam } from '../../engine/deepLink';
import { track } from '../../engine/analytics';

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** Share copy built from element data only. */
export function shareMessage(element) {
  const shells = element.electrons?.length || 0;
  return `${element.name} has ${plural(element.atomicNumber, 'electron')} in ${plural(shells, 'shell')}. Spin it in 3D:`;
}

/**
 * Share a link to this element. Uses the native share sheet where the browser supports it,
 * otherwise copies text and link to the clipboard.
 * Resolves to 'shared' | 'cancelled' | 'copied' | 'failed' and never throws.
 */
export async function shareAtom(element, { nav = globalThis.navigator, href = globalThis.location?.href } = {}) {
  const url = withElementParam(href, element.symbol);
  const text = shareMessage(element);
  const data = { title: `${element.name} · AtomicViz`, text, url };
  const canNativeShare = typeof nav?.share === 'function' && (typeof nav.canShare !== 'function' || nav.canShare(data));
  const method = canNativeShare ? 'native' : 'clipboard';
  track('atom_share_clicked', { element: element.symbol, method });

  if (canNativeShare) {
    try {
      await nav.share(data);
      return 'shared';
    } catch (error) {
      // Dismissing the sheet is a normal outcome, not an error.
      if (error?.name === 'AbortError') return 'cancelled';
      // Some browsers expose share() but refuse it (e.g. permissions); fall back to copying.
    }
  }
  try {
    await nav.clipboard.writeText(`${text} ${url}`);
    return 'copied';
  } catch {
    return 'failed';
  }
}
