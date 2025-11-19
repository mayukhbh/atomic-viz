import React from 'react';
import { useSpring, animated, config } from '@react-spring/three';
import { Atom } from './Atom';
import * as THREE from 'three';

const AnimatedBond = ({ start, end }) => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const direction = new THREE.Vector3().subVectors(endVec, startVec);
    const length = direction.length();
    const position = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);

    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    const rotation = new THREE.Euler().setFromQuaternion(quaternion);

    const { pos, rot, scale } = useSpring({
        pos: [position.x, position.y, position.z],
        rot: [rotation.x, rotation.y, rotation.z],
        scale: [1, length, 1],
        config: config.molasses // Smooth, slow transition
    });

    return (
        <animated.group position={pos} rotation={rot}>
            <animated.mesh scale={scale}>
                <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
                <meshStandardMaterial color="#555" roughness={0.3} metalness={0.8} />
            </animated.mesh>
        </animated.group>
    );
};

const AnimatedAtom = ({ atom }) => {
    const { pos, scale } = useSpring({
        pos: atom.position,
        scale: atom.hidden ? 0 : 1,
        config: config.molasses
    });

    return (
        <animated.group position={pos} scale={scale}>
            <Atom element={atom.element} showElectrons={!atom.hidden} />
        </animated.group>
    );
};

export const ReactionRenderer = ({ stage }) => {
    return (
        <group>
            {stage.atoms.map((atom) => (
                <AnimatedAtom key={atom.id} atom={atom} />
            ))}

            {stage.bonds.map((bond) => {
                const startAtom = stage.atoms.find(a => a.id === bond.start);
                const endAtom = stage.atoms.find(a => a.id === bond.end);

                if (!startAtom || !endAtom || startAtom.hidden || endAtom.hidden) return null;

                return (
                    <AnimatedBond
                        key={`${bond.start} -${bond.end} `}
                        start={startAtom.position}
                        end={endAtom.position}
                    />
                );
            })}
        </group>
    );
};
