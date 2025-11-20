
import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Text, Float, Line, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { ELEMENTS } from '../data/elements';
import { MOLECULES } from '../data/reactions';

// Simple UUID generator to avoid dependencies
const uuid = () => Math.random().toString(36).substr(2, 9);
// We will use standard mesh for dragging for now to keep it simple and robust
import { useDrag } from '@use-gesture/react'; // We might need to install this, or use Drei's PivotControls/DragControls
// Actually, let's use Drei's DragControls or simple raycasting for V1.
// PivotControls is good but adds a gizmo.
// Let's try a custom DraggableAtom component using useDrag logic or simple pointer events.

// Since we might not have use-gesture installed, let's check package.json or just use R3F events.
// R3F events (onPointerDown, onPointerMove, onPointerUp) are sufficient for basic dragging on a plane.

const DraggableAtom = ({ id, element, position, onDrag, onDragEnd }) => {
    const [isDragging, setIsDragging] = useState(false);
    const ref = useRef();
    const { camera, raycaster, size, viewport } = useThree();

    // Plane for raycasting (z=0)
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const handlePointerDown = (e) => {
        e.stopPropagation();
        setIsDragging(true);
        e.target.setPointerCapture(e.pointerId);
    };

    const handlePointerUp = (e) => {
        setIsDragging(false);
        e.target.releasePointerCapture(e.pointerId);
        onDragEnd(id);
    };

    const handlePointerMove = (e) => {
        if (isDragging) {
            // Simple drag on XY plane
            // We need to project the mouse to the z=0 plane
            const point = new THREE.Vector3();
            // e.point is the intersection point on the object, which isn't enough for dragging ON A PLANE
            // We need to raycast against a virtual plane

            // Standard R3F way:
            // The event 'e' has 'ray' but we want to intersect with our plane
            raycaster.ray.intersectPlane(plane, point);
            onDrag(id, [point.x, point.y, 0]);
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
                cursor={isDragging ? 'grabbing' : 'grab'}
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
    const [atoms, setAtoms] = useState([]);
    const [bonds, setBonds] = useState([]);
    const [discovered, setDiscovered] = useState([]);
    const [notification, setNotification] = useState(null); // Added notification state

    // Valency rules
    const VALENCY = { H: 1, O: 2, N: 3, C: 4 };

    const addAtom = (symbol) => {
        // Spawn near center with slight jitter to avoid perfect overlap
        const jitter = 0.5;
        const newAtom = {
            id: uuid(),
            element: symbol,
            position: [(Math.random() - 0.5) * jitter, (Math.random() - 0.5) * jitter, 0],
            bonds: []
        };
        setAtoms(prev => [...prev, newAtom]);
    };

    const updateAtomPosition = (id, newPos) => {
        setAtoms(prev => prev.map(atom =>
            atom.id === id ? { ...atom, position: newPos } : atom
        ));
    };

    // ... (checkMolecule remains same)

    const checkBonds = (movedAtomId) => {
        const movedAtom = atoms.find(a => a.id === movedAtomId);
        if (!movedAtom) return;

        const BOND_DISTANCE = 1.5; // Slightly increased for better snapping
        let newBonds = [...bonds];
        let bondsChanged = false;
        let atomPositionChanged = false;
        let finalPosition = [...movedAtom.position];

        // Count current bonds
        const getBondCount = (atomId, currentBondsList) => {
            return currentBondsList.filter(b => b.a === atomId || b.b === atomId).length;
        };

        atoms.forEach(other => {
            if (other.id === movedAtomId) return;

            const dist = new THREE.Vector3(...finalPosition).distanceTo(new THREE.Vector3(...other.position));

            // Check if bond already exists
            const bondExists = newBonds.some(b =>
                (b.a === movedAtomId && b.b === other.id) ||
                (b.a === other.id && b.b === movedAtomId)
            );

            if (dist < BOND_DISTANCE && !bondExists) {
                // Check Valency
                const bondsA = getBondCount(movedAtomId, newBonds);
                const bondsB = getBondCount(other.id, newBonds);

                if (bondsA < VALENCY[movedAtom.element] && bondsB < VALENCY[other.element]) {
                    // Create Bond
                    newBonds.push({ a: movedAtomId, b: other.id, id: uuid() });
                    bondsChanged = true;

                    // Snap Logic: Move movedAtom to exact bond distance
                    // Calculate direction vector from other to movedAtom
                    const direction = new THREE.Vector3()
                        .subVectors(new THREE.Vector3(...finalPosition), new THREE.Vector3(...other.position))
                        .normalize();

                    // New position = other.position + direction * 1.0 (ideal bond length)
                    const snapPos = new THREE.Vector3(...other.position).add(direction.multiplyScalar(1.0));
                    finalPosition = [snapPos.x, snapPos.y, snapPos.z];
                    atomPositionChanged = true;
                }
            }
        });

        if (bondsChanged) {
            setBonds(newBonds);
            checkMolecule(newBonds, atoms);
        }

        if (atomPositionChanged) {
            updateAtomPosition(movedAtomId, finalPosition);
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
    };

    return (
        <div className="w-full h-full relative bg-black">
            {/* Notification */}
            {notification && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 bg-green-500/20 backdrop-blur-md border border-green-500 text-green-200 px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] animate-bounce">
                    <span className="font-bold text-lg">{notification}</span>
                </div>
            )}

            {/* UI Controls */}
            <div className="absolute top-32 left-4 z-10 bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-white shadow-2xl w-64">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <div className="w-2 h-6 bg-purple-500 rounded-full"></div>
                    Sandbox
                </h2>
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {['H', 'C', 'O', 'N'].map(el => (
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
                <OrbitControls makeDefault />

                <group>
                    {atoms.map(atom => (
                        <DraggableAtom
                            key={atom.id}
                            {...atom}
                            onDrag={handleDrag}
                            onDragEnd={handleDragEnd}
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
