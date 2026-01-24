import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * 3D annotation point that highlights a specific location in the scene
 */
export const NarrationPoint = ({
  position = [0, 0, 0],
  label = '',
  color = '#00ffff',
  visible = true,
  pulse = true
}) => {
  const pulseRef = useRef();

  useFrame(({ clock }) => {
    if (pulseRef.current && pulse) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.2;
      pulseRef.current.scale.setScalar(scale);
    }
  });

  if (!visible || !label) return null;

  return (
    <group position={position}>
      {/* Pulsing indicator sphere */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.15, 0.2, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

/**
 * Container for multiple narration points
 */
export const NarrationPoints = ({ highlights = [], visible = true }) => {
  if (!visible || !highlights || highlights.length === 0) return null;

  return (
    <group>
      {highlights.map((highlight, index) => (
        <NarrationPoint
          key={`highlight-${index}`}
          position={highlight.position || [0, 0, 0]}
          label={highlight.label}
          color={highlight.color || '#00ffff'}
          visible={visible}
        />
      ))}
    </group>
  );
};

export default NarrationPoint;
