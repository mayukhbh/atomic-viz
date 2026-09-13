
import React, { useState, useRef, useMemo } from 'react';
import { bondMovedAtom, recognizeMolecules, readDiscoveries, saveDiscoveries, SANDBOX_ELEMENTS } from '../engine/sandbox';
import { MOLECULE_LIB } from '../engine/molecules';
import { SafeCanvas as Canvas } from './viewer/SafeCanvas';
import { OrbitControls, Line, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Label3D as Text } from './viewer/Label3D';

// Simple UUID generator to avoid dependencies
const uuid = () => crypto.randomUUID();
// Dragging uses R3F pointer events (onPointerDown/Move/Up) raycast onto a virtual plane —
// no extra gesture library required.

const DraggableAtom = ({ id, element, position, onDrag, onDragEnd, onDraggingChange }) => {
    const [isDragging, setIsDragging] = useState(false);
    const ref = useRef();

    // Plane for raycasting (z=0)
    const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0,0,1),0), []);
    const point = useMemo(() => new THREE.Vector3(), []);

    const handlePointerDown = (e) => {
        e.stopPropagation();
        setIsDragging(true);
        onDraggingChange(true);
        e.target.setPointerCapture(e.pointerId);
    };

    const handlePointerUp = (e) => {
        setIsDragging(false);
        onDraggingChange(false);
        e.target.releasePointerCapture(e.pointerId);
        onDragEnd(id);
    };

    const handlePointerMove = (e) => {
        if (isDragging) {
            e.stopPropagation();
            if(e.ray.intersectPlane(plane,point)) onDrag(id,[point.x,point.y,0]);
        }
    };

    const color = element === 'H' ? '#ffffff' : element === 'O' ? '#ff4d4d' : element === 'C' ? '#909090' : '#3b82f6';
    const radius = element === 'H' ? 0.3 : 0.5;

    return (
        <group position={position}>
            <mesh
                ref={ref}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerMove={handlePointerMove}
                onPointerCancel={handlePointerUp}
            >
                <sphereGeometry args={[radius, 32, 32]} />
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.5} />
            </mesh>
            <Text
                position={[0, 0, radius + 0.1]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {element}
            </Text>
        </group>
    );
};

const Bond = ({ start, end }) => {
    return (
        <Line
            points={[start, end]}
            color="white"
            lineWidth={2}
            transparent
            opacity={0.5}
        />
    );
};

export const MoleculeSandbox = () => {
    const [dragging, setDragging] = useState(false);
    const [atoms, setAtoms] = useState([]);
    const [bonds, setBonds] = useState([]);
    const [discovered, setDiscovered] = useState(() => {try{return readDiscoveries(localStorage);}catch{return [];}});
    const [notification, setNotification] = useState(null); // Added notification state

    // Valency rules


    const addAtom = (symbol) => {
        // Spawn near center with slight jitter to avoid perfect overlap
        const angle = atoms.length * 2.399963;
        const newAtom = {
            id: uuid(),
            element: symbol,
            position: [Math.cos(angle)*0.25, Math.sin(angle)*0.25, 0],
            bonds: []
        };
        setAtoms(prev => [...prev, newAtom]);
    };

    const updateAtomPosition = (id, newPos) => {
        setAtoms(prev => prev.map(atom =>
            atom.id === id ? { ...atom, position: newPos } : atom
        ));
    };

    const checkBonds = id => {
        const next = bondMovedAtom(atoms, bonds, id); setAtoms(next.atoms); setBonds(next.bonds);
        const added = recognizeMolecules(next.atoms,next.bonds).filter(id=>!discovered.includes(id));
        if(added.length){const all=[...discovered,...added];setDiscovered(all);let saved=false;
          try{saved=saveDiscoveries(localStorage,all);}catch{/* Restricted storage retains session state. */}
          setNotification(`Discovered ${added.map(id=>MOLECULE_LIB[id].name).join(', ')}!${saved?'':' Saved for this session only.'}`);
        }
    };

    const handleDrag = (id, pos) => {
        updateAtomPosition(id, pos);
    };

    const handleDragEnd = (id) => {
        checkBonds(id);
    };

    const reset = () => {
        setAtoms([]);
        setBonds([]);
        setNotification(null);
    };

    return (
        <div className="w-full h-full relative bg-black">
            {/* Notification */}
            {notification && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 bg-green-500/20 backdrop-blur-md border border-green-500 text-green-200 px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] animate-bounce">
                    <span role="status" className="font-bold text-lg">{notification}</span>
                </div>
            )}

            {/* UI Controls */}
            <div className="absolute top-32 left-4 z-10 bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-white shadow-2xl w-64">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <div className="w-2 h-6 bg-purple-500 rounded-full"></div>
                    Sandbox
                </h2>
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {SANDBOX_ELEMENTS.map(el => (
                        <button
                            key={el}
                            onClick={() => addAtom(el)}
                            className="aspect-square flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 font-bold text-lg transition"
                        >
                            {el}
                        </button>
                    ))}
                </div>
                <button onClick={reset} className="w-full py-2 text-sm text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition">
                    Clear All
                </button>
            </div>

            <div className="absolute bottom-6 right-6 z-10 bg-black/60 p-4 rounded-xl border border-white/10 text-white max-w-xs"><h3>Saved discoveries</h3><p className="text-xs text-white/60">{discovered.length?discovered.map(id=>MOLECULE_LIB[id].formula).join(' · '):'Connect atoms to discover molecules.'}</p><p className="text-xs text-white/50">Connectivity model; bond orders are not simulated.</p></div>
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <color attach="background" args={['#050505']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* We disable OrbitControls rotation when dragging, but for now let's just use it. 
                    Ideally, we should disable it if we are dragging an atom. 
                    But since we are dragging on a plane, OrbitControls might interfere.
                    Let's make OrbitControls only work with right click or something? 
                    Or just keep it simple: if dragging, stop propagation.
                */}
                <OrbitControls makeDefault enabled={!dragging} />

                <group>
                    {atoms.map(atom => (
                        <DraggableAtom
                            key={atom.id}
                            {...atom}
                            onDrag={handleDrag}
                            onDragEnd={handleDragEnd}
                            onDraggingChange={setDragging}
                        />
                    ))}
                </group>

                <group>
                    {bonds.map(bond => {
                        const atomA = atoms.find(a => a.id === bond.a);
                        const atomB = atoms.find(a => a.id === bond.b);
                        if (!atomA || !atomB) return null;
                        return <Bond key={bond.id} start={atomA.position} end={atomB.position} />;
                    })}
                </group>
            </Canvas>
        </div>
    );
};
