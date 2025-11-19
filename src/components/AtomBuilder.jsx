import React, { useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Float } from '@react-three/drei';
import { ELEMENTS } from '../data/elements';
import * as THREE from 'three';

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

    const element = useMemo(() => {
        const atomicNumber = particles.protons;
        return Object.values(ELEMENTS).find(e => e.atomicNumber === atomicNumber) || null;
    }, [particles.protons]);

    const nucleusParticles = useMemo(() => {
        const p = [];
        const count = particles.protons + particles.neutrons;
        const radius = Math.pow(count, 1 / 3) * 0.4; // Approximate radius growth

        // Simple packing: random points in sphere
        // For better stability, we could use Fibonacci sphere, but random is okay for v1 dynamic adding
        // To make it deterministic, we can seed or just append.
        // Let's just generate positions based on index.

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
            // Simple shells
            const shell = Math.floor(Math.sqrt(i + 1)); // Very rough approximation
            const r = 2 + shell * 1.5;
            const angle = (i * 137.5) * (Math.PI / 180); // Golden angle
            e.push({
                id: `e-${i}`,
                type: 'electron',
                position: [Math.cos(angle) * r, Math.sin(angle) * r, 0] // Flat for now, or rotate
            });
        }
        return e;
    }, [particles.electrons]);

    const addParticle = (type) => {
        setParticles(prev => ({ ...prev, [type]: prev[type] + 1 }));
    };

    const reset = () => setParticles({ protons: 0, neutrons: 0, electrons: 0 });

    return (
        <div className="w-full h-full relative">
            {/* UI Controls */}
            <div className="absolute top-32 left-4 z-10 bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white">
                <h2 className="text-xl font-bold mb-4">Atom Builder</h2>
                <div className="flex gap-2 mb-4">
                    <button onClick={() => addParticle('protons')} className="px-3 py-1 bg-red-500/20 hover:bg-red-500/40 border border-red-500 rounded transition">
                        + Proton
                    </button>
                    <button onClick={() => addParticle('neutrons')} className="px-3 py-1 bg-gray-500/20 hover:bg-gray-500/40 border border-gray-500 rounded transition">
                        + Neutron
                    </button>
                    <button onClick={() => addParticle('electrons')} className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500 rounded transition">
                        + Electron
                    </button>
                </div>
                <button onClick={reset} className="w-full py-1 bg-white/10 hover:bg-white/20 rounded transition">
                    Reset
                </button>
            </div>

            {/* Stats Panel */}
            <div className="absolute top-32 right-4 z-10 bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white w-64">
                <div className="text-4xl font-bold text-center mb-2">
                    {element ? element.symbol : '?'}
                </div>
                <div className="text-center text-lg mb-4">
                    {element ? element.name : 'Unknown'}
                </div>
                <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span>Protons:</span> <span>{particles.protons}</span></div>
                    <div className="flex justify-between"><span>Neutrons:</span> <span>{particles.neutrons}</span></div>
                    <div className="flex justify-between"><span>Electrons:</span> <span>{particles.electrons}</span></div>
                    <div className="h-px bg-white/20 my-2"></div>
                    <div className="flex justify-between"><span>Mass:</span> <span>{particles.protons + particles.neutrons}</span></div>
                    <div className="flex justify-between"><span>Charge:</span> <span>{particles.protons - particles.electrons}</span></div>
                </div>
            </div>

            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <OrbitControls />

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
            </Canvas>
        </div>
    );
};
