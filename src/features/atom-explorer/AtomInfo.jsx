import { useEffect, useRef, useState } from 'react';
import { ChevronRight, Share2 } from 'lucide-react';
import { shareAtom } from './shareAtom';
import { withElementParam } from '../../engine/deepLink';

const SHARE_STATUS = {
  copied: 'Link copied',
  shared: 'Shared',
  failed: 'Copy this link:',
};

export function AtomInfo({ activeElementData, complexity, getDescription, showPeriodicTable, setShowPeriodicTable }) {
  const [shareStatus, setShareStatus] = useState(null);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const onShare = async () => {
    clearTimeout(timer.current);
    const result = await shareAtom(activeElementData);
    if (result === 'cancelled') return setShareStatus(null);
    setShareStatus(result);
    // A failed copy keeps the link visible so it can be copied by hand.
    if (result !== 'failed') timer.current = setTimeout(() => setShareStatus(null), 2500);
  };

  const shells = activeElementData.electrons || [];

  return (
          <div className="atom-info absolute bottom-8 left-8 max-w-md pointer-events-auto flex flex-col gap-4">
            <div className="mb-4">
              <h2 className="atom-info-name text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                {activeElementData.name}
              </h2>
              <div className="flex items-center gap-3 text-sm text-cyan-100/80 font-light flex-wrap">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                  Atomic Number: <span className="text-white font-bold">{activeElementData.atomicNumber}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                  Mass: <span className="text-white font-bold">{activeElementData.mass}</span>
                </span>
                {shells.length > 0 && (
                  <span
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                    aria-label={`Electron shells, innermost first: ${shells.join(', ')}`}
                  >
                    Shells: <span className="text-white font-bold tabular-nums">{shells.join(' · ')}</span>
                  </span>
                )}
              </div>

              {complexity === 'advanced' && (
                <div className="flex items-center gap-3 text-xs text-cyan-100/60 font-light mt-2 flex-wrap">
                  {activeElementData.electronConfiguration && (
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                      Config: <span className="text-white font-mono">{activeElementData.electronConfiguration}</span>
                    </span>
                  )}
                  {activeElementData.electronegativity && (
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                      EN: <span className="text-white font-bold">{activeElementData.electronegativity}</span>
                    </span>
                  )}
                </div>
              )}

              <div className="mt-4 text-white/60 max-w-md text-sm leading-relaxed">
                {getDescription(activeElementData.description)}
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setShowPeriodicTable(!showPeriodicTable)}
                aria-haspopup="dialog"
                aria-expanded={showPeriodicTable}
                className="flex items-center gap-2 px-6 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 shadow-lg w-fit"
              >
                <span className="text-2xl font-bold text-cyan-400">{activeElementData.symbol}</span>
                <span className="text-white/90 font-medium">Select Element</span>
                <ChevronRight className={`w-4 h-4 text-white/50 transition-transform duration-300 ${showPeriodicTable ? 'rotate-90' : ''}`} />
              </button>
              <button
                onClick={onShare}
                aria-label={`Share ${activeElementData.name}`}
                className="flex items-center gap-2 px-4 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 shadow-lg text-white/90 font-medium"
              >
                <Share2 className="w-4 h-4 text-cyan-400" />
                Share
              </button>
              <span role="status" aria-live="polite" className="text-sm text-cyan-200 min-w-0">
                {shareStatus && SHARE_STATUS[shareStatus]}
                {shareStatus === 'failed' && (
                  <span className="block font-mono text-xs text-white/80 break-all select-all">
                    {withElementParam(window.location.href, activeElementData.symbol)}
                  </span>
                )}
              </span>
            </div>
          </div>
  );
}
