import { useEffect, useRef, useState } from 'react';
import { parseElementParam, withElementParam } from '../../engine/deepLink';
import { track } from '../../engine/analytics';

/**
 * Active element state backed by the ?el= query parameter.
 * - Reads the initial element from the URL (Carbon when missing or invalid).
 * - Keeps the URL in step with history.replaceState, so switching elements never adds
 *   Back-button entries.
 * - Removes an invalid ?el= value so the address bar never shows a symbol that isn't displayed.
 * - Emits atom_deeplink_opened once when the page was opened from a valid link.
 */
export function useElementDeepLink() {
  const [initial] = useState(() => parseElementParam(typeof window === 'undefined' ? '' : window.location.search));
  const [symbol, setSymbol] = useState(initial.symbol);
  const reported = useRef(false);

  useEffect(() => {
    if (reported.current || !initial.fromLink) return;
    reported.current = true;
    track('atom_deeplink_opened', { element: initial.symbol });
  }, [initial]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // A plain (or invalid) visit shows a clean URL while Carbon is on screen; any real
    // choice, or an opened link, is written as ?el=.
    const wanted = !initial.fromLink && symbol === initial.symbol ? null : symbol;
    const next = withElementParam(window.location.href, wanted);
    if (next !== window.location.href) window.history.replaceState(window.history.state, '', next);
  }, [symbol, initial]);

  return [symbol, setSymbol];
}
