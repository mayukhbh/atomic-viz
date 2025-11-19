import React, { useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Float, Stars } from '@react-three/drei';
import { ELEMENTS } from '../data/elements';
import { Atom } from './Atom';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Zap, CheckCircle, RotateCcw } from 'lucide-react';

const Particle = ({ type, position }) => {
    const color = type === 'proton' ? '#ff4d4d' : type === 'neutron' ? '#bfbfbf' : '#4d4dff';
    const radius = type === 'electron' ? 0.1 : 0.3;

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
            <Sphere args={[radius, 32, 32]} position={position}>
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.5} />
            </Sphere>
        </Float>
    );
};

export const AtomBuilder = () => {
    const [particles, setParticles] = useState({ protons: 0, neutrons: 0, electrons: 0 });
    const [showResult, setShowResult] = useState(false);

    const element = useMemo(() => {
        const atomicNumber = particles.protons;
        return Object.values(ELEMENTS).find(e => e.atomicNumber === atomicNumber) || null;
    }, [particles.protons]);

    // Stability Logic (Simplified)
    const stability = useMemo(() => {
        if (particles.protons === 0) return { stable: true, text: 'Empty' };

        const ratio = particles.neutrons / particles.protons;
        // Light elements (Z < 20) are stable around N/Z = 1
        // Heavier elements need more neutrons (N/Z > 1, up to 1.5)

        let stable = false;
        if (particles.protons === 1) { // Hydrogen
            stable = particles.neutrons === 0 || particles.neutrons === 1 || particles.neutrons === 2;
        } else if (particles.protons < 20) {
            stable = ratio >= 0.8 && ratio <= 1.2;
        } else {
            stable = ratio >= 1.0 && ratio <= 1.5;
        }

        return {
            stable,
            text: stable ? 'Stable Isotope' : 'Unstable Isotope',
            color: stable ? 'text-green-400' : 'text-yellow-400'
        };
    }, [particles.protons, particles.neutrons]);

    const charge = useMemo(() => {
        const q = particles.protons - particles.electrons;
        return {
            value: q,
            text: q === 0 ? 'Neutral Atom' : q > 0 ? `Cation (+${q})` : `Anion (${q})`,
            color: q === 0 ? 'text-green-400' : q > 0 ? 'text-red-400' : 'text-blue-400'
        };
    }, [particles.protons, particles.electrons]);

    const nucleusParticles = useMemo(() => {
        const p = [];
        const count = particles.protons + particles.neutrons;
        const radius = Math.pow(count, 1 / 3) * 0.4;

        for (let i = 0; i < particles.protons; i++) {
            const phi = Math.acos(-1 + (2 * i) / Math.max(1, count));
            const theta = Math.sqrt(count * Math.PI) * phi;
            p.push({
                id: `p-${i}`,
                type: 'proton',
                position: [
                    radius * Math.cos(theta) * Math.sin(phi),
                    radius * Math.sin(theta) * Math.sin(phi),
                    radius * Math.cos(phi)
                ]
            });
        }
        for (let i = 0; i < particles.neutrons; i++) {
            const idx = i + particles.protons;
            const phi = Math.acos(-1 + (2 * idx) / Math.max(1, count));
            const theta = Math.sqrt(count * Math.PI) * phi;
            p.push({
                id: `n-${i}`,
                type: 'neutron',
                position: [
                    radius * Math.cos(theta) * Math.sin(phi),
                    radius * Math.sin(theta) * Math.sin(phi),
                    radius * Math.cos(phi)
                ]
            });
        }
        return p;
    }, [particles.protons, particles.neutrons]);

    const electrons = useMemo(() => {
        const e = [];
        for (let i = 0; i < particles.electrons; i++) {
            const shell = Math.floor(Math.sqrt(i + 1));
            const r = 2 + shell * 1.5;
            const angle = (i * 137.5) * (Math.PI / 180);
            e.push({
                id: `e-${i}`,
                type: 'electron',
                position: [Math.cos(angle) * r, Math.sin(angle) * r, 0]
            });
        }
        return e;
    }, [particles.electrons]);

    const addParticle = (type) => {
        setParticles(prev => ({ ...prev, [type]: prev[type] + 1 }));
        setShowResult(false);
    };

    const reset = () => {
        setParticles({ protons: 0, neutrons: 0, electrons: 0 });
        setShowResult(false);
    };

    return (
        <div className="w-full h-full relative bg-black">
            {/* UI Controls */}
            <div className="absolute top-32 left-4 z-10 bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-white shadow-2xl w-80">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <div className="w-2 h-8 bg-cyan-500 rounded-full"></div>
                    Atom Builder
                </h2>

                <div className="space-y-3 mb-6">
                    <button onClick={() => addParticle('protons')} className="w-full flex items-center justify-between px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl transition group">
                        <span className="font-medium text-red-200">Proton</span>
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full group-hover:scale-110 transition">+1</span>
                    </button>
                    <button onClick={() => addParticle('neutrons')} className="w-full flex items-center justify-between px-4 py-3 bg-gray-500/10 hover:bg-gray-500/20 border border-gray-500/30 rounded-xl transition group">
                        <span className="font-medium text-gray-200">Neutron</span>
                        <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full group-hover:scale-110 transition">0</span>
                    </button>
                    <button onClick={() => addParticle('electrons')} className="w-full flex items-center justify-between px-4 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-xl transition group">
                        <span className="font-medium text-blue-200">Electron</span>
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full group-hover:scale-110 transition">-1</span>
                    </button>
                </div>

                <button onClick={reset} className="w-full py-2 text-sm text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition">
                    Reset All Particles
                </button>
            </div>

            {/* Stats Panel */}
            <div className="absolute top-32 right-4 z-10 bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-white w-80 shadow-2xl">
                <div className="text-center mb-6">
                    <div className="text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                        {element ? element.symbol : '?'}
                    </div>
                    <div className="text-xl font-medium text-cyan-400">
                        {element ? element.name : 'Unknown Element'}
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className={`w-4 h-4 ${stability.color}`} />
                            <span className="text-sm text-white/60">Stability</span>
                        </div>
                        <span className={`text-sm font-bold ${stability.color}`}>{stability.text}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2">
                            <Zap className={`w-4 h-4 ${charge.color}`} />
                            <span className="text-sm text-white/60">Charge</span>
                        </div>
                        <span className={`text-sm font-bold ${charge.color}`}>{charge.text}</span>
                    </div>
                </div>

                <div className="space-y-2 text-sm text-white/40 font-mono">
                    <div className="flex justify-between"><span>Protons (Z)</span> <span>{particles.protons}</span></div>
                    <div className="flex justify-between"><span>Neutrons (N)</span> <span>{particles.neutrons}</span></div>
                    <div className="flex justify-between"><span>Electrons (e-)</span> <span>{particles.electrons}</span></div>
                    <div className="h-px bg-white/10 my-2"></div>
                    <div className="flex justify-between text-white/80"><span>Mass Number</span> <span>{particles.protons + particles.neutrons}</span></div>
                </div>

                {element && (
                    <button
                        onClick={() => setShowResult(!showResult)}
                        className={`mt-6 w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${showResult
                            ? 'bg-white/10 text-white border border-white/20'
                            : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40'
                            }`}
                    >
                        {showResult ? 'Back to Builder' : 'Visualize Atom'}
                        {showResult ? <RotateCcw size={16} /> : <CheckCircle size={16} />}
                    </button>
                )}
            </div>

            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <color attach="background" args={['#050505']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <OrbitControls />

                {showResult && element ? (
                    <Atom element={element.symbol} scale={2} showElectrons={true} />
                ) : (
                    <>
                        <group>
                            {nucleusParticles.map(p => (
                                <Particle key={p.id} type={p.type} position={p.position} />
                            ))}
                        </group>

                        <group>
                            {electrons.map(e => (
                                <Particle key={e.id} type={e.type} position={e.position} />
                            ))}
                        </group>
                    </>
                )}
            </Canvas>
        </div>
    );
};
