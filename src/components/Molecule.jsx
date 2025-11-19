import React, { useMemo } from 'react';
import { Atom } from './Atom';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const Bond = ({ start, end }) => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const direction = new THREE.Vector3().subVectors(endVec, startVec);
    const length = direction.length();
    const position = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);

    // Calculate rotation to align cylinder with direction
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    const rotation = new THREE.Euler().setFromQuaternion(quaternion);

    return (
        <group position={position} rotation={rotation}>
            <Cylinder args={[0.1, 0.1, length, 8]} >
                <meshStandardMaterial color="#555" roughness={0.3} metalness={0.8} />
            </Cylinder>
        </group>
    );
};

export const Molecule = ({ atoms = [], bonds = [], scale = 1, position = [0, 0, 0] }) => {
    return (
        <group scale={scale} position={position}>
            {atoms.map((atom, index) => (
                <Atom
                    key={index}
                    element={atom.element}
                    position={atom.position}
                    showElectrons={false} // Hide electrons in molecules for clarity
                    scale={0.8}
                />
            ))}
            {bonds.map((bond, index) => {
                const start = atoms[bond.start].position;
                const end = atoms[bond.end].position;
                return <Bond key={index} start={start} end={end} />;
            })}
        </group>
    );
};
