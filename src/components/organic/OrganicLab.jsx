import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewerCanvas } from '../viewer/ViewerCanvas';
import { MoleculeView } from '../viewer/MoleculeView';
import {
  getOrganicByClass, ORGANIC_CLASS_ORDER, CLASS_INFO,
} from '../../engine/molecules';
import {
  Box, Circle, Grid3x3, Tag, Sparkles, RotateCw, Eye, EyeOff,
} from 'lucide-react';

const MODES = [
  { id: 'ballstick', label: 'Ball & Stick', icon: Circle },
  { id: 'spacefill', label: 'Space-filling', icon: Box },
  { id: 'wireframe', label: 'Wireframe', icon: Grid3x3 },
];

export function OrganicLab() {
  const grouped = useMemo(() => getOrganicByClass(), []);
  const [activeClass, setActiveClass] = useState('Alkane');
  const [activeId, setActiveId] = useState('methane');
  const [mode, setMode] = useState('ballstick');
  const [showLabels, setShowLabels] = useState(true);
  const [highlightFG, setHighlightFG] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);

  const list = grouped[activeClass] || [];
  const active = list.find((m) => m.id === activeId) || list[0];
  const classInfo = CLASS_INFO[activeClass];

  const selectClass = (c) => {
    setActiveClass(c);
    const first = grouped[c]?.[0];
    if (first) setActiveId(first.id);
  };

  return (
    <div className="w-full h-full relative">
      {/* 3D viewer fills the space */}
      <div className="absolute inset-0">
        <ViewerCanvas autoRotateControls={false} bloom={0.6}>
          <AnimatePresence mode="wait">
            {active && (
              <MoleculeView
                key={active.id + mode}
                molecule={active}
                mode={mode}
                showLabels={showLabels}
                highlightFG={highlightFG}
                autoRotate={autoRotate}
                scale={1}
              />
            )}
          </AnimatePresence>
        </ViewerCanvas>
      </div>

      {/* Left: class + molecule library */}
      <div className="absolute top-28 left-6 bottom-6 w-72 pointer-events-auto flex flex-col gap-3 z-10">
        <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center gap-2 mb-3 text-emerald-300">
            <Sparkles size={16} />
            <h2 className="text-sm font-bold tracking-wide uppercase">Functional Groups</h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ORGANIC_CLASS_ORDER.map((c) => {
              const info = CLASS_INFO[c];
              const on = c === activeClass;
              return (
                <button
                  key={c}
                  onClick={() => selectClass(c)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                    on ? 'text-black border-transparent' : 'text-white/70 border-white/10 hover:bg-white/10'
                  }`}
                  style={on ? { background: info.color } : {}}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-white/40">{activeClass}s</span>
            <span
              className="text-[11px] font-mono px-2 py-0.5 rounded-md"
              style={{ background: `${classInfo.color}22`, color: classInfo.color }}
            >
              {classInfo.group}
            </span>
          </div>
          <p className="text-[11px] text-white/50 mb-3 leading-relaxed">{classInfo.note}</p>
          <div className="grid grid-cols-1 gap-2">
            {list.map((m) => {
              const on = m.id === active?.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveId(m.id)}
                  className={`text-left px-3 py-2 rounded-xl border transition-all ${
                    on
                      ? 'bg-white/15 border-emerald-400/60'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-white">{m.name}</span>
                    <span className="font-mono text-xs text-emerald-300">{m.formula}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: render controls */}
      <div className="absolute top-28 right-6 pointer-events-auto flex flex-col gap-3 z-10 w-56">
        <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
          <span className="text-xs uppercase tracking-wider text-white/40">Render mode</span>
          <div className="mt-2 flex flex-col gap-1.5">
            {MODES.map((mo) => {
              const Icon = mo.icon;
              const on = mo.id === mode;
              return (
                <button
                  key={mo.id}
                  onClick={() => setMode(mo.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                    on ? 'bg-emerald-500 text-black font-semibold' : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Icon size={15} /> {mo.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-2">
          <Toggle icon={Tag} label="Atom labels" on={showLabels} onClick={() => setShowLabels((s) => !s)} />
          <Toggle icon={Sparkles} label="Highlight group" on={highlightFG} onClick={() => setHighlightFG((s) => !s)} />
          <Toggle icon={RotateCw} label="Auto-rotate" on={autoRotate} onClick={() => setAutoRotate((s) => !s)} />
        </div>
      </div>

      {/* Bottom: molecule info */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto z-10 w-[min(90vw,520px)]"
          >
            <div className="bg-black/55 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl text-center">
              <div className="flex items-center justify-center gap-3">
                <h1 className="text-2xl font-bold text-white">{active.name}</h1>
                <span
                  className="font-mono text-lg px-2 py-0.5 rounded-lg"
                  style={{ background: `${classInfo.color}22`, color: classInfo.color }}
                >
                  {active.formula}
                </span>
              </div>
              <p className="text-white/60 text-sm mt-1.5 leading-relaxed">{active.blurb}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Toggle({ icon: Icon, label, on, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${
        on ? 'bg-white/15 text-white' : 'text-white/50 hover:bg-white/10'
      }`}
    >
      <span className="flex items-center gap-2">
        <Icon size={15} /> {label}
      </span>
      {on ? <Eye size={14} className="text-emerald-300" /> : <EyeOff size={14} />}
    </button>
  );
}
