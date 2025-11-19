import React, { useState, useEffect } from 'react';
import { Scene } from './components/Scene';
import { Atom } from './components/Atom';
import { AtomBuilder } from './components/AtomBuilder';
import { Molecule } from './components/Molecule';
import { ReactionRenderer } from './components/ReactionRenderer';
import { PeriodicTable } from './components/PeriodicTable';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom as AtomIcon, Zap, Play, RotateCcw, ChevronRight, FlaskConical } from 'lucide-react';
import { REACTIONS } from './data/reactions';

function App() {
  const [viewMode, setViewMode] = useState('atom'); // 'atom' | 'reaction'
  const [activeElement, setActiveElement] = useState('U');
  const [activeReactionId, setActiveReactionId] = useState('water-formation');
  const [reactionStage, setReactionStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPeriodicTable, setShowPeriodicTable] = useState(false);

  const activeReaction = REACTIONS.find(r => r.id === activeReactionId);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setReactionStage(prev => {
          if (prev < activeReaction.stages.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeReaction]);

  const resetReaction = () => {
    setIsPlaying(false);
    setReactionStage(0);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      {/* 3D Scene Layer */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Scene>
          <AnimatePresence mode="wait">
            {viewMode === 'builder' ? (
              <AtomBuilder />
            ) : (
              <motion.group
                key="scene-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {viewMode === 'atom' && (
                  <Atom
                    element={activeElement.symbol}
                    showElectrons={true}
                    scale={1.5}
                  />
                )}
                {viewMode === 'reaction' && (
                  <AnimatePresence mode="wait">
                    {activeReaction && (
                      <motion.group
                        key="reaction-view"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ReactionRenderer stage={activeReaction.stages[reactionStage]} />
                      </motion.group>
                    )}
                  </AnimatePresence>
                )}
              </motion.group>
            )}
          </AnimatePresence>
        </Scene>
      </div>

      {/* UI Overlay Layer */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100, pointerEvents: 'none' }}>
        <nav className="p-8 flex justify-between items-center pointer-events-auto">
          <div className="flex items-center gap-2 text-white cursor-pointer" onClick={() => setViewMode('atom')}>
            <AtomIcon className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold tracking-wider">ATOMIC<span className="text-cyan-400">VIZ</span></h1>
          </div>

          <div className="flex gap-2 bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'atom' ? 'bg-cyan-500 text-black' : 'text-white hover:bg-white/10'}`}
              onClick={() => setViewMode('atom')}
            >
              <AtomIcon size={16} /> Atom Explorer
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'reaction' ? 'bg-cyan-500 text-black' : 'text-white hover:bg-white/10'}`}
              onClick={() => setViewMode('reaction')}
            >
              <FlaskConical size={16} /> Reaction Lab
            </button>
          </div>
        </nav>

        <div className="absolute bottom-8 left-8 max-w-md pointer-events-auto flex flex-col gap-4">
          {viewMode === 'atom' ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl text-white"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Current Element: <span className="text-cyan-400">{activeElement}</span>
                </h2>
                <button
                  onClick={() => setShowPeriodicTable(!showPeriodicTable)}
                  className="w-full py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all text-sm font-bold tracking-wide"
                >
                  {showPeriodicTable ? 'Close Periodic Table' : 'Open Periodic Table'}
                </button>
              </motion.div>

              <AnimatePresence>
                {showPeriodicTable && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm"
                    onClick={() => setShowPeriodicTable(false)}
                  >
                    <div onClick={e => e.stopPropagation()}>
                      <PeriodicTable
                        activeElement={activeElement}
                        onSelect={(el) => { setActiveElement(el); setShowPeriodicTable(false); }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl text-white w-96"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{activeReaction.name}</h2>
                  <span className="text-xs text-cyan-400 uppercase tracking-wider">{activeReaction.type} Reaction</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={resetReaction}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    title="Reset"
                  >
                    <RotateCcw size={18} />
                  </button>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-6 font-mono bg-black/30 p-2 rounded border border-white/5 text-center">
                {activeReaction.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {REACTIONS.map(r => (
                  <button
                    key={r.id}
                    onClick={() => { setActiveReactionId(r.id); resetReaction(); }}
                    className={`px-3 py-1 text-xs rounded-full border transition-all ${activeReactionId === r.id ? 'bg-white/20 border-cyan-400 text-cyan-400' : 'border-white/10 hover:border-white/30'}`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isPlaying ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-cyan-500 text-black hover:bg-cyan-400'}`}
              >
                {isPlaying ? 'Pause Simulation' : 'Start Reaction'}
                {!isPlaying && <Play size={18} fill="currentColor" />}
              </button>

              <div className="mt-4 flex justify-between text-xs text-gray-500">
                <span>Stage {reactionStage + 1} / {activeReaction.stages.length}</span>
                <div className="flex gap-1">
                  {activeReaction.stages.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i === reactionStage ? 'bg-cyan-400' : 'bg-white/10'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
