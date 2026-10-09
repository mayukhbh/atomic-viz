import React from 'react';
import { ELEMENTS } from '../data/elements';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useDialog } from './common/useDialog';
import { useSettings } from '../context/useSettings';
import { CATEGORY_ORDER, categoryColor } from '../data/categories';

const hexA = (hex, alpha) => `${hex}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;

export const PeriodicTable = ({ onSelect, activeElement, onClose }) => {
    const elementsList = Object.values(ELEMENTS);
    const activeData = ELEMENTS[activeElement] || ELEMENTS['H'];

    const handleClose = () => {
        if (onClose) onClose();
        else onSelect(activeElement);
    };

    const dialog = useDialog(handleClose);
    const { complexity } = useSettings();
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-8" onClick={handleClose}>
            <motion.div ref={dialog} role="dialog" aria-modal="true" aria-label="Periodic table" tabIndex={-1}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative bg-black/80 border border-white/10 rounded-3xl p-4 md:p-8 w-full max-w-7xl shadow-2xl overflow-auto max-h-[90dvh]"
                onClick={e => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    aria-label="Close periodic table"
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                >
                    <X className="w-6 h-6 text-white/60" />
                </button>

                <h2 className="text-xl md:text-3xl font-bold mb-4 text-center tracking-[0.2em] text-white/80">PERIODIC TABLE OF ELEMENTS</h2>

                {/* Legend: derived from the same map that colours the tiles, so it always matches. */}
                <ul aria-label="Element categories" className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/60 mb-6">
                    {CATEGORY_ORDER.map(cat => (
                        <li key={cat} className="flex items-center gap-2">
                            <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: categoryColor(cat) }} />
                            {cat}
                        </li>
                    ))}
                </ul>

                <div className="grid grid-cols-18 gap-1.5 mb-6 min-w-[900px]" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
                    {elementsList.map((el) => {
                        const active = activeElement === el.symbol;
                        const tint = categoryColor(el.category);
                        return (
                        <motion.button
                            key={el.symbol}
                            aria-label={`${el.name}, ${el.symbol}, atomic number ${el.atomicNumber}, ${el.category}`}
                            aria-pressed={active}
                            title={`${el.name} · ${el.category}`}
                            whileHover={{ scale: 1.08, zIndex: 10 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSelect(el.symbol)}
                            style={{
                                gridColumn: el.xpos,
                                gridRow: el.ypos,
                                borderColor: active ? '#ffffff' : hexA(tint, 0.35),
                                backgroundColor: hexA(tint, active ? 0.28 : 0.1),
                            }}
                            className={`aspect-[0.85] rounded-lg border flex flex-col items-center justify-center transition-colors relative ${active ? 'shadow-[0_0_20px_rgba(255,255,255,0.25)]' : 'hover:brightness-150'}`}
                        >
                            <span className="text-[0.6rem] text-white/50 absolute top-1 left-1">{el.atomicNumber}</span>
                            <span className="text-lg sm:text-xl font-bold" style={{ color: tint }}>{el.symbol}</span>
                            <span className="text-[0.5rem] sm:text-[0.6rem] text-white/60 truncate w-full text-center px-1 hidden sm:block">{el.name}</span>
                        </motion.button>
                        );
                    })}
                </div>

                {/* Legend & Description Panel */}
                <div className="flex flex-col md:flex-row gap-8 items-end justify-between mt-2">

                    {/* Description Panel (Bottom Left) */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-xl w-full backdrop-blur-md">
                        <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-3xl font-bold" style={{ color: categoryColor(activeData.category) }}>{activeData.name}</h3>
                            <span className="text-xl text-white/40 font-light">{activeData.category}</span>
                        </div>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {typeof activeData.description === 'string'
                              ? activeData.description
                              : activeData.description?.[complexity] || activeData.description?.basic || ''}
                        </p>
                        <div className="mt-4 flex gap-6 text-sm text-white/50 font-mono">
                            <span>Mass: <b className="text-white">{activeData.mass}</b></span>
                            <span>Display radius: <b className="text-white">{activeData.radius}</b></span>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};
