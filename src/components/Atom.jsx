import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { ELEMENTS } from '../data/elements';

const Electron = ({ radius, speed, offset, color }) => {
    const ref = useRef();

    useFrame(({ clock }) => {
        if (ref.current) {
            const t = clock.getElapsedTime() * speed + offset;
            ref.current.position.x = Math.cos(t) * radius;
            ref.current.position.z = Math.sin(t) * radius;
            ref.current.position.y = Math.sin(t * 2) * (radius * 0.3); // Slight wobble
        }
    });

    return (
        <group rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
            <Trail width={2} length={8} color={color} attenuation={(t) => t * t}>
                <mesh ref={ref}>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshBasicMaterial color={color} toneMapped={false} />
                </mesh>
            </Trail>
        </group>
    );
};

export const Atom = ({ element = 'H', position = [0, 0, 0], scale = 1, showElectrons = true }) => {
    const data = ELEMENTS[element] || ELEMENTS['H']; // Fallback
    const group = useRef();

    // Generate electron orbits
    const electrons = useMemo(() => {
        if (!showElectrons) return [];
        const eList = [];
        let shellRadius = data.radius * 1.5;

        data.electrons.forEach((count, shellIndex) => {
            for (let i = 0; i < count; i++) {
                eList.push({
                    id: `${shellIndex}-${i}`,
                    radius: shellRadius + (Math.random() * 0.2),
                    speed: 2 - (shellIndex * 0.2), // Outer shells slower
                    offset: (i / count) * Math.PI * 2,
                    color: '#00ffff'
                });
            }
            shellRadius += 0.5;
        });
        return eList;
    }, [data, showElectrons]);

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

            {/* Electrons */}
            {showElectrons && electrons.map((e) => (
                <Electron key={e.id} {...e} />
            ))}
        </group>
    );
};
