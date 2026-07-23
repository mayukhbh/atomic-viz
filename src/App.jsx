import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Scene } from './components/Scene';
import { Atom } from './components/Atom';
import { AtomBuilder } from './components/AtomBuilder';
import { ELEMENTS } from './data/elements';
import { MoleculeSandbox } from './components/MoleculeSandbox';
import { ReactionScene } from './components/reaction/ReactionScene';
import { EnergyDiagram } from './components/reaction/EnergyDiagram';
import { ViewerCanvas } from './components/viewer/ViewerCanvas';
import { OrganicLab } from './components/organic/OrganicLab';
import { PeriodicTable } from './components/PeriodicTable';
import { ExportPanel } from './components/export/ExportPanel';
import { TutorialOverlay, TutorialMenu } from './components/tutorials';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { stageIndexAt } from './engine/reactionEngine';
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
  BookOpen,
  Hexagon,
} from 'lucide-react';
import { REACTIONS, REACTION_CATEGORIES } from './data/reactions';

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
    startTutorial,
  } = useSettings();

  const [viewMode, setViewMode] = useState('atom'); // atom | reaction | organic | builder | sandbox
  const [activeElement, setActiveElement] = useState('C');
  const [activeReactionId, setActiveReactionId] = useState('water-formation');
  const [reactionDomain, setReactionDomain] = useState('all');
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPeriodicTable, setShowPeriodicTable] = useState(false);
  const [showExportPanel, setShowExportPanel] = useState(false);
  const [showTutorialMenu, setShowTutorialMenu] = useState(false);

  const activeReaction = REACTIONS.find((r) => r.id === activeReactionId);
  const activeElementData = ELEMENTS[activeElement] || ELEMENTS['H'];

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
  useEffect(() => {
    if (!isPlaying || !activeReaction) return;
    const segments = Math.max(1, activeReaction.stages.length - 1);
    const duration = (segments * 2.4) / playbackSpeed; // seconds for full reaction
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setProgress((p) => {
        const np = p + dt / duration;
        if (np >= 1) {
          setIsPlaying(false);
          return 1;
        }
        return np;
      });
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

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#04060a' }}>
      {/* 3D Scene Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {viewMode === 'builder' ? (
          <AtomBuilder />
        ) : viewMode === 'sandbox' ? (
          <MoleculeSandbox />
        ) : viewMode === 'organic' ? (
          <OrganicLab />
        ) : viewMode === 'reaction' ? (
          <ViewerCanvas cameraPosition={[0, 0, 11]} fov={45} shadow={false} bloom={0.9}>
            {activeReaction && <ReactionScene reaction={activeReaction} progress={progress} />}
          </ViewerCanvas>
        ) : (
          <Scene>
            <Atom element={activeElement} showElectrons scale={1.5} orbitalMode={orbitalMode} />
          </Scene>
        )}
      </div>

      {/* UI Overlay Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 100, pointerEvents: 'none' }}>
        <nav className="p-6 flex justify-between items-center pointer-events-auto">
          <div className="flex items-center gap-2 text-white cursor-pointer" onClick={() => setViewMode('atom')}>
            <AtomIcon className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold tracking-wider">ATOMIC<span className="text-cyan-400">VIZ</span></h1>
          </div>

          <div className="flex gap-1 bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10">
            <NavButton active={viewMode === 'atom'} onClick={() => setViewMode('atom')} icon={AtomIcon} label="Atom" />
            <NavButton active={viewMode === 'reaction'} onClick={() => setViewMode('reaction')} icon={FlaskConical} label="Reactions" />
            <NavButton active={viewMode === 'organic'} onClick={() => setViewMode('organic')} icon={Hexagon} label="Organic" accent="emerald" />
            <NavButton active={viewMode === 'builder'} onClick={() => setViewMode('builder')} icon={Hammer} label="Builder" />
            <NavButton active={viewMode === 'sandbox'} onClick={() => setViewMode('sandbox')} icon={Box} label="Sandbox" accent="purple" />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleComplexity}
              className={`px-3 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 border ${
                complexity === 'advanced'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                  : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
              }`}
              title={complexity === 'basic' ? 'Switch to University Level' : 'Switch to High School Level'}
            >
              <GraduationCap size={14} />
              {complexity === 'basic' ? 'High School' : 'University'}
            </button>

            {viewMode === 'atom' && (
              <button
                onClick={toggleOrbitalMode}
                className={`px-3 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 border ${
                  orbitalMode === 'quantum'
                    ? 'bg-orange-500/20 text-orange-300 border-orange-500/50'
                    : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                }`}
                title={orbitalMode === 'bohr' ? 'Switch to Quantum Orbitals' : 'Switch to Bohr Model'}
              >
                <Orbit size={14} />
                {orbitalMode === 'bohr' ? 'Bohr' : 'Quantum'}
              </button>
            )}

            <button
              onClick={() => setShowTutorialMenu(true)}
              className={`px-3 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 border ${
                tutorialActive
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
              }`}
            >
              <BookOpen size={14} />
              Tutorials
            </button>

            <button
              onClick={() => setShowExportPanel(!showExportPanel)}
              className={`px-3 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 border ${
                showExportPanel
                  ? 'bg-green-500/20 text-green-300 border-green-500/50'
                  : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
              }`}
            >
              <Download size={14} />
              Export
            </button>
          </div>
        </nav>

        {/* Atom explorer info */}
        {viewMode === 'atom' && (
          <div className="absolute bottom-8 left-8 max-w-md pointer-events-auto flex flex-col gap-4">
            <div className="mb-4">
              <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                {activeElementData.name}
              </h1>
              <div className="flex items-center gap-3 text-sm text-cyan-100/80 font-light flex-wrap">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                  Atomic Number: <span className="text-white font-bold">{activeElementData.atomicNumber}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                  Mass: <span className="text-white font-bold">{activeElementData.mass}</span>
                </span>
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

            <button
              onClick={() => setShowPeriodicTable(!showPeriodicTable)}
              className="flex items-center gap-2 px-6 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 shadow-lg w-fit"
            >
              <span className="text-2xl font-bold text-cyan-400">{activeElementData.symbol}</span>
              <span className="text-white/90 font-medium">Select Element</span>
              <ChevronRight className={`w-4 h-4 text-white/50 transition-transform duration-300 ${showPeriodicTable ? 'rotate-90' : ''}`} />
            </button>
          </div>
        )}

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

        <AnimatePresence>
          {showExportPanel && <ExportPanel onClose={() => setShowExportPanel(false)} />}
        </AnimatePresence>
      </div>

      {/* Overlays outside pointer-events wrapper */}
      <AnimatePresence>
        {showTutorialMenu && (
          <TutorialMenu
            onSelect={(tutorialId) => { startTutorial(tutorialId); setShowTutorialMenu(false); }}
            onClose={() => setShowTutorialMenu(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {tutorialActive && (
          <TutorialOverlay
            onClose={() => setShowTutorialMenu(false)}
            onElementChange={setActiveElement}
            onViewChange={setViewMode}
            onReactionChange={(id) => { setActiveReactionId(id); setProgress(0); setIsPlaying(false); }}
            onStageChange={(stage) => {
              const r = REACTIONS.find((x) => x.id === activeReactionId);
              const n = r?.stages.length || 1;
              setIsPlaying(false);
              setProgress(n === 1 ? 0 : Math.max(0, Math.min(1, stage / (n - 1))));
            }}
            onOrbitalModeChange={setOrbitalMode}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPeriodicTable && (
          <PeriodicTable
            onSelect={(el) => { setActiveElement(el); setShowPeriodicTable(false); }}
            activeElement={activeElement}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function NavButton({ active, onClick, icon: Icon, label, accent = 'cyan' }) {
  const activeBg = accent === 'purple' ? 'bg-purple-500 text-white' : accent === 'emerald' ? 'bg-emerald-500 text-black' : 'bg-cyan-500 text-black';
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${active ? activeBg : 'text-white hover:bg-white/10'}`}
    >
      <Icon size={15} /> {label}
    </button>
  );
}

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

function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

export default App;
