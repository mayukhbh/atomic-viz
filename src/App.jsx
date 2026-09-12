import React, { useState, useCallback, lazy, Suspense } from 'react';
import { Scene } from './components/Scene';
import { Atom } from './components/Atom';
const AtomBuilder = lazy(() => import('./components/AtomBuilder').then(m => ({ default: m.AtomBuilder })));
import { ELEMENTS } from './data/elements';
const MoleculeSandbox = lazy(() => import('./components/MoleculeSandbox').then(m => ({ default: m.MoleculeSandbox })));
const OrganicLab = lazy(() => import('./components/organic/OrganicLab').then(m => ({ default: m.OrganicLab })));
const PeriodicTable = lazy(() => import('./components/PeriodicTable').then(m => ({ default: m.PeriodicTable })));
const ExportPanel = lazy(() => import('./components/export/ExportPanel').then(m => ({ default: m.ExportPanel })));
const TutorialOverlay = lazy(() => import('./components/tutorials/TutorialOverlay').then(m => ({ default: m.TutorialOverlay })));
const TutorialMenu = lazy(() => import('./components/tutorials/TutorialOverlay').then(m => ({ default: m.TutorialMenu })));
const ReactionLab = lazy(() => import('./features/reaction-lab/ReactionLab').then(m => ({ default: m.ReactionLab })));
import { SettingsProvider } from './context/SettingsContext';
import { useSettings } from './context/useSettings';
import { AtomInfo } from './features/atom-explorer/AtomInfo';
import { AnimatePresence } from 'framer-motion';
import {
  Atom as AtomIcon,
  FlaskConical,
  Hammer,
  Box,
  GraduationCap,
  Orbit,
  Download,
  BookOpen,
  Hexagon,
} from 'lucide-react';


function AppContent() {
  const {
    complexity,
    toggleComplexity,
    orbitalMode,
    setOrbitalMode,
    toggleOrbitalMode,
    tutorialActive,
    startTutorial,
  } = useSettings();

  const [viewMode, setViewMode] = useState('atom'); // atom | reaction | organic | builder | sandbox
  const [activeElement, setActiveElement] = useState('C');
  const [reactionRequest, setReactionRequest] = useState(null);
  const [showPeriodicTable, setShowPeriodicTable] = useState(false);
  const [showExportPanel, setShowExportPanel] = useState(false);
  const [showTutorialMenu, setShowTutorialMenu] = useState(false);

  const activeElementData = ELEMENTS[activeElement] || ELEMENTS.H;
  const getDescription = d => typeof d === 'string' ? d : d?.[complexity] || d?.basic || '';
  const applyTutorialStep = useCallback(step => {
    if (step.element) setActiveElement(step.element);
    if (step.view) setViewMode(step.view);
    if (step.orbitalMode) setOrbitalMode(step.orbitalMode);
    setShowPeriodicTable(!!step.showPeriodicTable);
    if (step.reactionId) setReactionRequest({ ...step, key: `${step.reactionId}-${step.stage ?? 0}` });
  }, [setOrbitalMode]);

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
          <ReactionLab key={reactionRequest?.key} request={reactionRequest} />
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
          <AtomInfo {...{activeElementData, complexity, getDescription, showPeriodicTable, setShowPeriodicTable}} />
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
            onApplyStep={applyTutorialStep}
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


function App() {
  return (
    <SettingsProvider>
      <Suspense fallback={<div role="status" className="p-8 text-cyan-200">Loading AtomicViz…</div>}><AppContent /></Suspense>
    </SettingsProvider>
  );
}

export default App;
