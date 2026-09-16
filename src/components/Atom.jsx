import React, { useRef } from 'react';
import { Sphere } from '@react-three/drei';
import { ELEMENTS } from '../data/elements';
import { Label3D as Text } from './viewer/Label3D';
import { BohrModel } from './atoms/BohrModel';
import { QuantumOrbitals } from './atoms/QuantumOrbitals';

export const Atom = ({
    element = 'H',
    position = [0, 0, 0],
    scale = 1,
    showElectrons = true,
    orbitalMode = 'bohr' // 'bohr' or 'quantum'
}) => {
    const data = ELEMENTS[element] || ELEMENTS['H']; // Fallback
    const group = useRef();

    return (
        <group position={position} scale={scale} ref={group}>
            {/* Nucleus */}
            <Sphere args={[data.radius, 32, 32]}>
                <meshPhysicalMaterial
                    color={data.color}
                    roughness={0.2}
                    metalness={0.8}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    emissive={data.color}
                    emissiveIntensity={0.2}
                />
            </Sphere>

            {/* Inner Glow */}
            <pointLight distance={3} intensity={2} color={data.color} />

            {/* Label */}
            <Text
                position={[0, 0, data.radius + 0.1]}
                fontSize={data.radius * 0.6}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.05}
                outlineColor="black"
            >
                {data.symbol}
            </Text>

            {/* Electron visualization - switches between Bohr and Quantum modes */}
            {showElectrons && orbitalMode === 'bohr' && (
                <BohrModel
                    elementData={data}
                    showOrbitalRings={true}
                    electronColor="#00ffff"
                    ringColor="#ffffff"
                />
            )}

            {showElectrons && orbitalMode === 'quantum' && (
                <QuantumOrbitals
                    elementData={data}
                    scale={1.2}
                />
            )}
        </group>
    );
};
