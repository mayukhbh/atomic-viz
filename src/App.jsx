import React, { useState, useEffect } from 'react';
import { Scene } from './components/Scene';
import { Atom } from './components/Atom';
import { AtomBuilder } from './components/AtomBuilder';
import { ELEMENTS } from './data/elements';
import { Molecule } from './components/Molecule';
import { MoleculeSandbox } from './components/MoleculeSandbox';
import { ReactionRenderer } from './components/ReactionRenderer';
import { PeriodicTable } from './components/PeriodicTable';
import { ExportPanel } from './components/export/ExportPanel';
import { TutorialOverlay, TutorialMenu } from './components/tutorials';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { getTutorialById } from './data/tutorials';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Atom as AtomIcon,
  RotateCcw,
  Play,
  Pause,
  ChevronRight,
  FlaskConical,
  Hammer,
  Box,
  Gauge,
  GraduationCap,
  Orbit,
  Download,
  BookOpen
} from 'lucide-react';
import { REACTIONS } from './data/reactions';

// Speed control component
const SpeedControl = ({ playbackSpeed, setPlaybackSpeed, speedPresets }) => {
  return (
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
};

// Main app content with settings context access
function AppContent() {
  const {
    complexity,
    toggleComplexity,
    orbitalMode,
    setOrbitalMode,
    toggleOrbitalMode,
    playbackSpeed,
    setPlaybackSpeed,
    speedPresets,
    tutorialActive,
    currentTutorial,
    tutorialStep,
    startTutorial
  } = useSettings();

  const [viewMode, setViewMode] = useState('atom'); // 'atom' | 'reaction' | 'builder' | 'sandbox'
  const [activeElement, setActiveElement] = useState('U');
  const [activeReactionId, setActiveReactionId] = useState('water-formation');
  const [reactionStage, setReactionStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPeriodicTable, setShowPeriodicTable] = useState(false);
  const [showExportPanel, setShowExportPanel] = useState(false);
  const [showTutorialMenu, setShowTutorialMenu] = useState(false);

  const activeReaction = REACTIONS.find(r => r.id === activeReactionId);
  // Helper to get full element data for UI display
  const activeElementData = ELEMENTS[activeElement] || ELEMENTS['H'];

  // Get description based on complexity
  const getDescription = (descObj) => {
    if (typeof descObj === 'string') return descObj;
    return descObj?.[complexity] || descObj?.basic || '';
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setReactionStage(prev => {
          if (prev < activeReaction.stages.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 1500 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeReaction, playbackSpeed]);

  const resetReaction = () => {
    setIsPlaying(false);
    setReactionStage(0);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      {/* 3D Scene Layer */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        {viewMode === 'builder' ? (
          <AtomBuilder />
        ) : viewMode === 'sandbox' ? (
          <MoleculeSandbox />
        ) : (
          <Scene>
            <AnimatePresence mode="wait">
              <motion.group
                key="scene-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {viewMode === 'atom' && (
                  <Atom
                    element={activeElement}
                    showElectrons={true}
                    scale={1.5}
                    orbitalMode={orbitalMode}
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
                        <ReactionRenderer
                          stage={activeReaction.stages[reactionStage]}
                          reactionData={activeReaction}
                        />
                      </motion.group>
                    )}
                  </AnimatePresence>
                )}
              </motion.group>
            </AnimatePresence>
          </Scene>
        )}
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
              onClick={() => setViewMode('reaction')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'reaction' ? 'bg-cyan-500 text-black' : 'text-white hover:bg-white/10'}`}
            >
              <FlaskConical size={16} /> Reaction Lab
            </button>
            <button
              onClick={() => setViewMode('builder')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'builder' ? 'bg-cyan-500 text-black' : 'text-white hover:bg-white/10'}`}
            >
              <Hammer size={16} /> Builder
            </button>
            <button
              onClick={() => setViewMode('sandbox')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'sandbox' ? 'bg-purple-500 text-white' : 'text-white hover:bg-white/10'}`}
            >
              <Box size={16} /> Sandbox
            </button>
          </div>

          {/* Settings toggles */}
          <div className="flex items-center gap-3">
            {/* Complexity toggle */}
            <button
              onClick={toggleComplexity}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 border ${
                complexity === 'advanced'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                  : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
              }`}
              title={complexity === 'basic' ? 'Switch to University Level' : 'Switch to High School Level'}
            >
              <GraduationCap size={16} />
              {complexity === 'basic' ? 'High School' : 'University'}
            </button>

            {/* Orbital mode toggle (only show in atom view) */}
            {viewMode === 'atom' && (
              <button
                onClick={toggleOrbitalMode}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 border ${
                  orbitalMode === 'quantum'
                    ? 'bg-orange-500/20 text-orange-300 border-orange-500/50'
                    : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                }`}
                title={orbitalMode === 'bohr' ? 'Switch to Quantum Orbitals' : 'Switch to Bohr Model'}
              >
                <Orbit size={16} />
                {orbitalMode === 'bohr' ? 'Bohr' : 'Quantum'}
              </button>
            )}

            {/* Tutorial button */}
            <button
              onClick={() => setShowTutorialMenu(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 border ${
                tutorialActive
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
              }`}
            >
              <BookOpen size={16} />
              Tutorials
            </button>

            {/* Export button */}
            <button
              onClick={() => setShowExportPanel(!showExportPanel)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 border ${
                showExportPanel
                  ? 'bg-green-500/20 text-green-300 border-green-500/50'
                  : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
              }`}
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </nav>

        <div className="absolute bottom-8 left-8 max-w-md pointer-events-auto flex flex-col gap-4">
          {viewMode === 'atom' ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                  {activeElementData.name}
                </h1>
                <div className="flex items-center justify-center gap-4 text-lg text-cyan-100/80 font-light">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                    Atomic Number: <span className="text-white font-bold">{activeElementData.atomicNumber}</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                    Mass: <span className="text-white font-bold">{activeElementData.mass}</span>
                  </span>
                </div>

                {/* Enhanced info for advanced mode */}
                {complexity === 'advanced' && (
                  <div className="flex items-center justify-center gap-4 text-sm text-cyan-100/60 font-light mt-2">
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
                    {activeElementData.block && (
                      <span className={`px-3 py-1 rounded-full border backdrop-blur-sm ${
                        activeElementData.block === 's' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' :
                        activeElementData.block === 'p' ? 'bg-green-500/20 border-green-500/50 text-green-300' :
                        activeElementData.block === 'd' ? 'bg-orange-500/20 border-orange-500/50 text-orange-300' :
                        'bg-purple-500/20 border-purple-500/50 text-purple-300'
                      }`}>
                        Block: <span className="font-bold">{activeElementData.block}</span>
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-4 text-white/60 max-w-md mx-auto text-sm leading-relaxed">
                  {getDescription(activeElementData.description)}
                </div>
              </div>

              {/* Element Selector */}
              <div className="relative group">
                <button
                  onClick={() => setShowPeriodicTable(!showPeriodicTable)}
                  className="flex items-center gap-2 px-6 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 shadow-lg group-hover:shadow-cyan-500/20"
                >
                  <span className="text-2xl font-bold text-cyan-400">{activeElementData.symbol}</span>
                  <span className="text-white/90 font-medium">Select Element</span>
                  <ChevronRight className={`w-4 h-4 text-white/50 transition-transform duration-300 ${showPeriodicTable ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </>
          ) : viewMode === 'reaction' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl text-white w-96"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{activeReaction.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-cyan-400 uppercase tracking-wider">{activeReaction.type} Reaction</span>
                    {activeReaction.domain && (
                      <span className="text-xs text-purple-400 uppercase tracking-wider">• {activeReaction.domain}</span>
                    )}
                  </div>
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

              <p className="text-gray-300 text-sm mb-4 font-mono bg-black/30 p-2 rounded border border-white/5 text-center">
                {activeReaction.equation || activeReaction.description}
              </p>

              {/* Reaction description based on complexity */}
              {activeReaction.description && typeof activeReaction.description === 'object' && (
                <p className="text-white/60 text-xs mb-4 leading-relaxed">
                  {getDescription(activeReaction.description)}
                </p>
              )}

              {/* Enthalpy for advanced mode */}
              {complexity === 'advanced' && activeReaction.enthalpy && (
                <div className="mb-4 p-2 bg-white/5 rounded border border-white/10">
                  <span className="text-xs text-white/50">Enthalpy: </span>
                  <span className={`text-sm font-mono ${activeReaction.enthalpy < 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ΔH = {activeReaction.enthalpy} kJ/mol
                  </span>
                  <span className="text-xs text-white/50 ml-2">
                    ({activeReaction.enthalpy < 0 ? 'Exothermic' : 'Endothermic'})
                  </span>
                </div>
              )}

              {/* Speed control */}
              <div className="mb-4">
                <SpeedControl
                  playbackSpeed={playbackSpeed}
                  setPlaybackSpeed={setPlaybackSpeed}
                  speedPresets={speedPresets}
                />
              </div>

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
                {isPlaying ? <><Pause size={18} /> Pause Simulation</> : <>Start Reaction <Play size={18} fill="currentColor" /></>}
              </button>

              <div className="mt-4 flex justify-between text-xs text-gray-500">
                <span>Stage {reactionStage + 1} / {activeReaction.stages.length}</span>
                <div className="flex gap-1">
                  {activeReaction.stages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setReactionStage(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === reactionStage ? 'bg-cyan-400 scale-125' : 'bg-white/10 hover:bg-white/30'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </div>

        {/* Export Panel */}
        <AnimatePresence>
          {showExportPanel && (
            <ExportPanel onClose={() => setShowExportPanel(false)} />
          )}
        </AnimatePresence>

      </div>

      {/* Tutorial Menu - Outside the pointer-events-none overlay */}
      <AnimatePresence>
        {showTutorialMenu && (
          <TutorialMenu
            onSelect={(tutorialId) => {
              startTutorial(tutorialId);
              setShowTutorialMenu(false);
            }}
            onClose={() => setShowTutorialMenu(false)}
          />
        )}
      </AnimatePresence>

      {/* Tutorial Overlay - Outside the pointer-events-none overlay */}
      <AnimatePresence>
        {tutorialActive && (
          <TutorialOverlay
            onClose={() => setShowTutorialMenu(false)}
            onElementChange={setActiveElement}
            onViewChange={setViewMode}
            onReactionChange={(id) => {
              setActiveReactionId(id);
              setReactionStage(0);
            }}
            onStageChange={setReactionStage}
            onOrbitalModeChange={setOrbitalMode}
          />
        )}
      </AnimatePresence>

      {/* Periodic Table - Outside the pointer-events-none overlay */}
      <AnimatePresence>
        {showPeriodicTable && (
          <PeriodicTable
            onSelect={(el) => {
              setActiveElement(el);
              setShowPeriodicTable(false);
            }}
            activeElement={activeElement}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

export default App;
