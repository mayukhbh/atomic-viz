import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  parseElectronConfiguration,
  generatePOrbital,
  generateDOrbital,
  generateFOrbital,
  getOrbitalRadius,
  getOrbitalColor,
  getMaxElectrons
} from '../../utils/orbitalGeometry';

/**
 * Single orbital lobe component
 */
const OrbitalLobe = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  color = '#ffffff',
  opacity = 0.4,
  type = 'lobe'
}) => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Subtle pulsing effect
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.05;
      meshRef.current.scale.setScalar(scale * pulse);
    }
  });

  if (type === 'torus') {
    return (
      <mesh position={position} rotation={rotation} ref={meshRef}>
        <torusGeometry args={[0.8, 0.2, 16, 32]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity * 0.6}
          roughness={0.5}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  }

  return (
    <mesh position={position} rotation={rotation} ref={meshRef}>
      <sphereGeometry args={[0.4, 24, 24]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={opacity}
        roughness={0.3}
        metalness={0.1}
        clearcoat={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/**
 * S Orbital - Spherical shell
 */
const SOrbital = ({ radius = 1, color = '#3B82F6', opacity = 0.3, electrons = 2 }) => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.03;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  // Electron density based on electron count
  const actualOpacity = opacity * (electrons / 2);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={actualOpacity}
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/**
 * P Orbital - Dumbbell shape (3 orientations: px, py, pz)
 */
const POrbital = ({ radius = 1, color = '#22C55E', opacity = 0.35, electrons = 6 }) => {
  const axes = ['x', 'y', 'z'];
  const electronsPerOrbital = Math.ceil(electrons / 3);

  return (
    <group>
      {axes.map((axis, index) => {
        const orbital = generatePOrbital(axis, 0.4, radius * 1.2);
        const activeElectrons = Math.min(2, Math.max(0, electrons - index * 2));
        const actualOpacity = opacity * (activeElectrons / 2);

        if (activeElectrons <= 0) return null;

        return (
          <group key={axis}>
            <OrbitalLobe
              position={orbital.positiveLobe.position}
              scale={0.8}
              color={color}
              opacity={actualOpacity}
            />
            <OrbitalLobe
              position={orbital.negativeLobe.position}
              scale={0.8}
              color={color}
              opacity={actualOpacity}
            />
          </group>
        );
      })}
    </group>
  );
};

/**
 * D Orbital - Cloverleaf patterns (5 orientations)
 */
const DOrbital = ({ radius = 1.2, color = '#F97316', opacity = 0.3, electrons = 10 }) => {
  const types = ['xy', 'xz', 'yz', 'x2-y2', 'z2'];

  return (
    <group>
      {types.map((type, index) => {
        const lobes = generateDOrbital(type, 0.35);
        const activeElectrons = Math.min(2, Math.max(0, electrons - index * 2));
        const actualOpacity = opacity * (activeElectrons / 2);

        if (activeElectrons <= 0) return null;

        return (
          <group key={type} scale={radius}>
            {lobes.map((lobe, lobeIndex) => (
              <OrbitalLobe
                key={lobeIndex}
                position={lobe.position}
                rotation={lobe.rotation || [0, 0, 0]}
                scale={lobe.scale || 0.7}
                color={color}
                opacity={actualOpacity}
                type={lobe.type || 'lobe'}
              />
            ))}
          </group>
        );
      })}
    </group>
  );
};

/**
 * F Orbital - Complex multi-lobed shapes (7 orientations)
 */
const FOrbital = ({ radius = 1.4, color = '#A855F7', opacity = 0.25, electrons = 14 }) => {
  const types = ['xyz', 'z3', 'default1', 'default2', 'default3', 'default4', 'default5'];

  return (
    <group>
      {types.slice(0, Math.ceil(electrons / 2)).map((type, index) => {
        const lobes = generateFOrbital(type, 0.3);
        const activeElectrons = Math.min(2, Math.max(0, electrons - index * 2));
        const actualOpacity = opacity * (activeElectrons / 2);

        if (activeElectrons <= 0) return null;

        return (
          <group key={type} scale={radius} rotation={[0, index * 0.5, 0]}>
            {lobes.map((lobe, lobeIndex) => (
              <OrbitalLobe
                key={lobeIndex}
                position={lobe.position}
                rotation={lobe.rotation || [0, 0, 0]}
                scale={lobe.scale || 0.5}
                color={color}
                opacity={actualOpacity}
                type={lobe.type || 'lobe'}
              />
            ))}
          </group>
        );
      })}
    </group>
  );
};

/**
 * Main Quantum Orbitals component
 * Renders s/p/d/f orbitals based on electron configuration
 */
export const QuantumOrbitals = ({ elementData, scale = 1 }) => {
  const orbitals = useMemo(() => {
    if (!elementData?.electronConfiguration) return [];
    return parseElectronConfiguration(elementData.electronConfiguration);
  }, [elementData]);

  // Group orbitals by type for rendering
  const orbitalGroups = useMemo(() => {
    const groups = { s: [], p: [], d: [], f: [] };
    orbitals.forEach(orbital => {
      if (groups[orbital.type]) {
        groups[orbital.type].push(orbital);
      }
    });
    return groups;
  }, [orbitals]);

  return (
    <group scale={scale}>
      {/* Render s orbitals */}
      {orbitalGroups.s.map((orbital, index) => (
        <SOrbital
          key={`s-${index}`}
          radius={getOrbitalRadius(orbital.n, 0.6)}
          color={getOrbitalColor('s')}
          electrons={orbital.count}
          opacity={0.25}
        />
      ))}

      {/* Render p orbitals */}
      {orbitalGroups.p.map((orbital, index) => (
        <POrbital
          key={`p-${index}`}
          radius={getOrbitalRadius(orbital.n, 0.8)}
          color={getOrbitalColor('p')}
          electrons={orbital.count}
          opacity={0.3}
        />
      ))}

      {/* Render d orbitals */}
      {orbitalGroups.d.map((orbital, index) => (
        <DOrbital
          key={`d-${index}`}
          radius={getOrbitalRadius(orbital.n, 0.9)}
          color={getOrbitalColor('d')}
          electrons={orbital.count}
          opacity={0.25}
        />
      ))}

      {/* Render f orbitals */}
      {orbitalGroups.f.map((orbital, index) => (
        <FOrbital
          key={`f-${index}`}
          radius={getOrbitalRadius(orbital.n, 1.0)}
          color={getOrbitalColor('f')}
          electrons={orbital.count}
          opacity={0.2}
        />
      ))}
    </group>
  );
};

export default QuantumOrbitals;
