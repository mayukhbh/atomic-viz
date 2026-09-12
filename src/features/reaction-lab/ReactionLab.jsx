import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Gauge, RotateCcw, Play, Pause } from 'lucide-react';
import { useSettings } from '../../context/useSettings';
import { REACTIONS, REACTION_CATEGORIES } from '../../data/reactions';
import { stageIndexAt } from '../../engine/reactionEngine';
import { ReactionScene } from '../../components/reaction/ReactionScene';
import { EnergyDiagram } from '../../components/reaction/EnergyDiagram';
import { ViewerCanvas } from '../../components/viewer/ViewerCanvas';
const SpeedControl = ({ playbackSpeed, setPlaybackSpeed, speedPresets }) => (
  <div className="flex items-center gap-2">
    <Gauge size={14} className="text-white/50" />
    <div className="flex gap-1">
      {speedPresets.map((speed) => (
        <button
          key={speed}
          onClick={() => setPlaybackSpeed(speed)}
          className={`px-2 py-1 text-xs rounded transition-all ${
            playbackSpeed === speed
              ? 'bg-cyan-500 text-black font-bold'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          {speed}x
        </button>
      ))}
    </div>
  </div>
);

function DomainChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
        active ? 'bg-cyan-500 text-black border-transparent' : 'text-white/60 border-white/10 hover:bg-white/10'
      }`}
    >
      {label}
    </button>
  );
}

export function ReactionLab({ request }) {
 const {complexity, playbackSpeed, setPlaybackSpeed, speedPresets} = useSettings();
 const viewMode = 'reaction';
  const [activeReactionId, setActiveReactionId] = useState(request?.reactionId || 'water-formation');
  const [reactionDomain, setReactionDomain] = useState('all');
  const [progress, setProgress] = useState(() => { const r = REACTIONS.find(r => r.id === request?.reactionId); return Math.min(1, (request?.stage || 0) / Math.max(1, (r?.stages.length || 1) - 1)); });
  const [isPlaying, setIsPlaying] = useState(false);
  const activeReaction = REACTIONS.find((r) => r.id === activeReactionId);

  const filteredReactions = useMemo(
    () => (reactionDomain === 'all' ? REACTIONS : REACTIONS.filter((r) => r.domain === reactionDomain)),
    [reactionDomain]
  );

  const getDescription = (descObj) => {
    if (typeof descObj === 'string') return descObj;
    return descObj?.[complexity] || descObj?.basic || '';
  };

  // RAF-driven continuous playback for buttery, production-feeling motion.
  const rafRef = useRef();
  const progressRef = useRef(0);
  useEffect(() => { progressRef.current = progress; }, [progress]);
  useEffect(() => {
    if (!isPlaying || !activeReaction) return;
    const segments = Math.max(1, activeReaction.stages.length - 1);
    const duration = (segments * 2.4) / playbackSpeed; // seconds for full reaction
    let last = performance.now();
    let elapsed = progressRef.current;
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      elapsed = Math.min(1, elapsed + Math.min(dt, 0.1) / duration);
      setProgress(elapsed);
      if (elapsed >= 1) { setIsPlaying(false); return; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, activeReaction, playbackSpeed]);

  const togglePlay = () => {
    if (!isPlaying && progress >= 1) setProgress(0);
    setIsPlaying((p) => !p);
  };

  const resetReaction = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const numStages = activeReaction?.stages.length || 1;
  const currentStage = activeReaction ? stageIndexAt(activeReaction, progress) : 0;

 return <>
 <ViewerCanvas cameraPosition={[0,0,11]} fov={45} shadow={false} bloom={0.9}><ReactionScene reaction={activeReaction} progress={progress} /></ViewerCanvas>
        {/* Reaction Lab panel */}
        {viewMode === 'reaction' && activeReaction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-6 p-5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl text-white w-[380px] pointer-events-auto shadow-2xl"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-lg font-bold">{activeReaction.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-cyan-400 uppercase tracking-wider">{activeReaction.type}</span>
                  {activeReaction.domain && (
                    <span className="text-[10px] text-purple-400 uppercase tracking-wider">• {activeReaction.domain}</span>
                  )}
                </div>
              </div>
              <button onClick={resetReaction} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Reset">
                <RotateCcw size={16} />
              </button>
            </div>

            <p className="text-gray-200 text-sm mb-3 font-mono bg-black/40 p-2 rounded border border-white/5 text-center">
              {activeReaction.equation || activeReaction.description}
            </p>

            {/* Energy diagram */}
            <div className="mb-3 bg-white/[0.03] rounded-xl border border-white/5 p-2">
              <EnergyDiagram reaction={activeReaction} progress={progress} />
            </div>

            {complexity === 'advanced' && activeReaction.enthalpy != null && (
              <div className="mb-3 p-2 bg-white/5 rounded border border-white/10 text-xs">
                <span className="text-white/50">Enthalpy: </span>
                <span className={`font-mono ${activeReaction.enthalpy < 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ΔH = {activeReaction.enthalpy} kJ/mol
                </span>
                <span className="text-white/50 ml-2">({activeReaction.enthalpy < 0 ? 'Exothermic' : 'Endothermic'})</span>
              </div>
            )}

            {typeof activeReaction.description === 'object' && (
              <p className="text-white/55 text-xs mb-3 leading-relaxed">{getDescription(activeReaction.description)}</p>
            )}

            {/* Scrubber */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={progress}
              onChange={(e) => { setIsPlaying(false); setProgress(parseFloat(e.target.value)); }}
              className="w-full accent-cyan-400 mb-3 cursor-pointer"
            />

            <div className="mb-3">
              <SpeedControl playbackSpeed={playbackSpeed} setPlaybackSpeed={setPlaybackSpeed} speedPresets={speedPresets} />
            </div>

            <button
              onClick={togglePlay}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                isPlaying ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-cyan-500 text-black hover:bg-cyan-400'
              }`}
            >
              {isPlaying ? <><Pause size={18} /> Pause</> : <>{progress >= 1 ? 'Replay' : 'Start'} Reaction <Play size={18} fill="currentColor" /></>}
            </button>

            <div className="mt-3 flex justify-between text-xs text-gray-500 items-center">
              <span>Stage {currentStage + 1} / {numStages}</span>
              <div className="flex gap-1">
                {activeReaction.stages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setIsPlaying(false); setProgress(numStages === 1 ? 0 : i / (numStages - 1)); }}
                    className={`w-2 h-2 rounded-full transition-all ${i === currentStage ? 'bg-cyan-400 scale-125' : 'bg-white/10 hover:bg-white/30'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Reaction picker (right side) */}
        {viewMode === 'reaction' && (
          <div className="absolute top-28 right-6 w-64 pointer-events-auto z-10">
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl max-h-[70vh] overflow-y-auto">
              <span className="text-xs uppercase tracking-wider text-white/40">Reaction library</span>
              <div className="flex flex-wrap gap-1.5 my-3">
                <DomainChip label="All" active={reactionDomain === 'all'} onClick={() => setReactionDomain('all')} />
                {Object.entries(REACTION_CATEGORIES).map(([k, v]) => (
                  <DomainChip key={k} label={v} active={reactionDomain === k} onClick={() => setReactionDomain(k)} />
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                {filteredReactions.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => { setActiveReactionId(r.id); resetReaction(); }}
                    className={`text-left px-3 py-2 rounded-xl border text-sm transition-all ${
                      activeReactionId === r.id ? 'bg-white/15 border-cyan-400/60 text-cyan-200' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

 </>;
}
