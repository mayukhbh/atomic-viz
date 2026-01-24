import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';

/**
 * Single electron particle with trail effect
 */
const Electron = ({ radius, speed, offset, color = '#00ffff' }) => {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed + offset;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 2) * (radius * 0.3);
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

/**
 * Orbital ring visualization
 */
const OrbitalRing = ({ radius, color = '#ffffff', opacity = 0.1 }) => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.01, 8, 64]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
};

/**
 * Bohr Model visualization
 * Classical representation with electrons orbiting in shells
 */
export const BohrModel = ({
  elementData,
  showOrbitalRings = true,
  electronColor = '#00ffff',
  ringColor = '#ffffff'
}) => {
  // Generate electrons based on shell configuration
  const electrons = useMemo(() => {
    if (!elementData?.electrons) return [];

    const eList = [];
    let shellRadius = elementData.radius * 1.5;

    elementData.electrons.forEach((count, shellIndex) => {
      for (let i = 0; i < count; i++) {
        eList.push({
          id: `${shellIndex}-${i}`,
          radius: shellRadius + (Math.random() * 0.2),
          speed: 2 - (shellIndex * 0.2),
          offset: (i / count) * Math.PI * 2,
          color: electronColor,
          shell: shellIndex
        });
      }
      shellRadius += 0.5;
    });

    return eList;
  }, [elementData, electronColor]);

  // Calculate shell radii for orbital rings
  const shellRadii = useMemo(() => {
    if (!elementData?.electrons) return [];

    const radii = [];
    let shellRadius = elementData.radius * 1.5;

    elementData.electrons.forEach(() => {
      radii.push(shellRadius);
      shellRadius += 0.5;
    });

    return radii;
  }, [elementData]);

  return (
    <group>
      {/* Orbital rings */}
      {showOrbitalRings && shellRadii.map((radius, index) => (
        <OrbitalRing
          key={`ring-${index}`}
          radius={radius}
          color={ringColor}
          opacity={0.15}
        />
      ))}

      {/* Electrons */}
      {electrons.map((e) => (
        <Electron key={e.id} {...e} />
      ))}
    </group>
  );
};

export default BohrModel;
