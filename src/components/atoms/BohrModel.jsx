import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';

const GOLDEN = 2.399963; // golden angle (rad) — spreads shell planes evenly

// Single electron riding a clean circular orbit on its shell's tilted plane.
const Electron = ({ radius, speed, offset, color, tilt, azimuth, size, trailLength, trailWidth }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed + offset;
      ref.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius);
    }
  });
  return (
    <group rotation={[tilt, azimuth, 0]}>
      <Trail width={trailWidth} length={trailLength} color={color} attenuation={(t) => t * t}>
        <mesh ref={ref}>
          <sphereGeometry args={[size, 12, 12]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
};

const OrbitalRing = ({ radius, tilt, azimuth, color, opacity }) => (
  <mesh rotation={[tilt + Math.PI / 2, azimuth, 0]}>
    <torusGeometry args={[radius, 0.008, 8, 96]} />
    <meshBasicMaterial color={color} transparent opacity={opacity} />
  </mesh>
);

/**
 * Bohr model — organised, tilted electron shells with subtle trails.
 * Tilts are deterministic (golden-angle per shell) so the animation is stable and reads
 * as clean concentric shells rather than a random web, even for heavy elements.
 */
export const BohrModel = ({
  elementData,
  showOrbitalRings = true,
  electronColor = '#5ff2ff',
  ringColor = '#9fd8ff',
}) => {
  const { electrons, shells } = useMemo(() => {
    if (!elementData?.electrons) return { electrons: [], shells: [] };
    const eList = [];
    const shellList = [];
    let shellRadius = elementData.radius * 1.6;

    elementData.electrons.forEach((count, shellIndex) => {
      const tilt = 0.35 + shellIndex * GOLDEN;
      const azimuth = shellIndex * (GOLDEN * 0.5);
      shellList.push({ radius: shellRadius, tilt, azimuth });
      // subtler, shorter trails as shells get more crowded
      const trailLength = count > 12 ? 2.2 : count > 6 ? 3 : 4;
      const trailWidth = count > 12 ? 0.5 : 0.9;
      for (let i = 0; i < count; i++) {
        eList.push({
          id: `${shellIndex}-${i}`,
          radius: shellRadius,
          speed: 1.4 - shellIndex * 0.12,
          offset: (i / count) * Math.PI * 2,
          color: electronColor,
          tilt,
          azimuth,
          size: 0.045,
          trailLength,
          trailWidth,
        });
      }
      shellRadius += 0.55;
    });
    return { electrons: eList, shells: shellList };
  }, [elementData, electronColor]);

  return (
    <group>
      {showOrbitalRings &&
        shells.map((s, i) => (
          <OrbitalRing key={`ring-${i}`} radius={s.radius} tilt={s.tilt} azimuth={s.azimuth} color={ringColor} opacity={0.12} />
        ))}
      {electrons.map((e) => (
        <Electron key={e.id} {...e} />
      ))}
    </group>
  );
};

export default BohrModel;
