import React from 'react';
import { ELEMENTS } from '../data/elements';
import { motion } from 'framer-motion';

export const PeriodicTable = ({ onSelect, activeElement }) => {
    const elementsList = Object.values(ELEMENTS);
    const activeData = ELEMENTS[activeElement] || ELEMENTS['H'];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8" onClick={() => onSelect(activeElement)}>
            <div className="relative bg-black/80 border border-white/10 rounded-3xl p-8 w-full max-w-7xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                <h2 className="text-3xl font-bold mb-8 text-center tracking-[0.2em] text-white/80">PERIODIC TABLE OF ELEMENTS</h2>

                <div className="grid grid-cols-18 gap-2 mb-8" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
                    {elementsList.map((el) => (
                        <motion.button
                            key={el.symbol}
                            whileHover={{ scale: 1.1, zIndex: 10, backgroundColor: 'rgba(255,255,255,0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSelect(el.symbol)}
                            style={{
                                gridColumn: el.xpos,
                                gridRow: el.ypos,
                                borderColor: activeElement === el.symbol ? el.color : 'rgba(255,255,255,0.1)',
                                backgroundColor: activeElement === el.symbol ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'
                            }}
                            className={`
                                aspect-[0.85] rounded-lg border flex flex-col items-center justify-center transition-colors relative group
                                ${activeElement === el.symbol ? 'shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'hover:border-white/40'}
                            `}
                        >
                            <span className="text-[0.6rem] text-white/40 absolute top-1 left-1">{el.atomicNumber}</span>
                            <span className="text-lg sm:text-xl font-bold" style={{ color: el.color }}>{el.symbol}</span>
                            <span className="text-[0.5rem] sm:text-[0.6rem] text-white/60 truncate w-full text-center px-1 hidden sm:block">{el.name}</span>
                        </motion.button>
                    ))}
                </div>

                {/* Legend & Description Panel */}
                <div className="flex flex-col md:flex-row gap-8 items-end justify-between mt-4">

                    {/* Description Panel (Bottom Left) */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-xl w-full backdrop-blur-md">
                        <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-3xl font-bold" style={{ color: activeData.color }}>{activeData.name}</h3>
                            <span className="text-xl text-white/40 font-light">{activeData.category}</span>
                        </div>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {activeData.description}
                        </p>
                        <div className="mt-4 flex gap-6 text-sm text-white/50 font-mono">
                            <span>Mass: <b className="text-white">{activeData.mass}</b></span>
                            <span>Radius: <b className="text-white">{activeData.radius} Å</b></span>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap justify-end gap-x-6 gap-y-2 text-xs text-gray-400 max-w-md">
                        {[
                            { color: '#D9FFFF', label: 'Noble Gas' },
                            { color: '#CC80FF', label: 'Alkali Metal' },
                            { color: '#C2FF00', label: 'Alkaline Earth' },
                            { color: '#E06633', label: 'Transition Metal' },
                            { color: '#1FF01F', label: 'Halogen' },
                            { color: '#3050F8', label: 'Nonmetal' },
                            { color: '#F0C8A0', label: 'Metalloid' },
                            { color: '#BFA6A6', label: 'Post-transition' },
                        ].map(cat => (
                            <div key={cat.label} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                                <span>{cat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
