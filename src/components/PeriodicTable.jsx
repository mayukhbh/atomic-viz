import React from 'react';
import { ELEMENTS } from '../data/elements';
import { motion } from 'framer-motion';

export const PeriodicTable = ({ onSelect, activeElement }) => {
    // Helper to determine grid position based on atomic number (simplified for this subset)
    // For a full table, we'd map atomic numbers to specific row/col
    // Here we just render a flex grid for the available elements

    const elementsList = Object.values(ELEMENTS).sort((a, b) => a.atomicNumber - b.atomicNumber);

    return (
        <div className="p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl text-white max-w-4xl mx-auto max-h-[60vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-center tracking-wider">PERIODIC TABLE</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {elementsList.map((el) => (
                    <motion.button
                        key={el.symbol}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect(el.symbol)}
                        className={`
              aspect-square p-2 rounded-lg border flex flex-col items-center justify-center transition-all relative overflow-hidden
              ${activeElement === el.symbol
                                ? 'bg-white/20 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                                : 'bg-white/5 border-white/10 hover:border-white/30'}
            `}
                    >
                        <span className="text-xs text-gray-400 absolute top-1 left-2">{el.atomicNumber}</span>
                        <span className="text-xl font-bold mt-2" style={{ color: el.color }}>{el.symbol}</span>
                        <span className="text-[10px] text-gray-300 truncate w-full text-center">{el.name}</span>

                        {/* Category Indicator */}
                        <div
                            className="absolute bottom-0 left-0 w-full h-1 opacity-50"
                            style={{ backgroundColor: el.color }}
                        />
                    </motion.button>
                ))}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#D9FFFF]"></div> Noble Gas
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#CC80FF]"></div> Alkali Metal
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#1FF01F]"></div> Halogen
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#E06633]"></div> Transition Metal
                </div>
            </div>
        </div>
    );
};
