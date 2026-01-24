import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { ELEMENTS } from '../data/elements';

// Compact atom representation for molecules (no orbiting electrons)
const MoleculeAtom = ({ element, position, scale = 1, label = true }) => {
  const data = ELEMENTS[element] || ELEMENTS['H'];
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      // Subtle pulsing
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.02;
      ref.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[data.radius * 0.6, 32, 32]} />
        <meshPhysicalMaterial
          color={data.color}
          roughness={0.2}
          metalness={0.3}
          clearcoat={0.8}
          emissive={data.color}
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Inner glow */}
      <pointLight distance={2} intensity={0.5} color={data.color} />
      {/* Label */}
      {label && (
        <Text
          position={[0, 0, data.radius * 0.6 + 0.05]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="black"
        >
          {data.symbol}
        </Text>
      )}
    </group>
  );
};

// Animated bond between two atoms
const Bond = ({ start, end, type = 'single', color = '#ffffff', forming = false, breaking = false }) => {
  const meshRef = useRef();
  const glowRef = useRef();

  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const midPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
  const direction = new THREE.Vector3().subVectors(endVec, startVec);
  const length = direction.length();

  // Calculate rotation to align cylinder with bond direction
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
  const euler = new THREE.Euler().setFromQuaternion(quaternion);

  // Bond appearance based on type
  const bondColor = type === 'ionic' ? '#ff6b6b' :
                    type === 'polar' ? '#4ecdc4' :
                    type === 'double' ? '#ffd93d' :
                    type === 'triple' ? '#ff6b6b' : color;

  const bondCount = type === 'double' ? 2 : type === 'triple' ? 3 : 1;
  const bondSpacing = 0.12;

  // Pulsing effect for forming/breaking bonds
  useFrame(({ clock }) => {
    if (meshRef.current) {
      if (forming || breaking) {
        const pulse = 1 + Math.sin(clock.getElapsedTime() * 8) * 0.3;
        meshRef.current.material.emissiveIntensity = pulse * 0.5;
      }
    }
    if (glowRef.current) {
      const glow = 0.3 + Math.sin(clock.getElapsedTime() * 4) * 0.15;
      glowRef.current.material.opacity = forming ? glow : 0.1;
    }
  });

  return (
    <group position={[midPoint.x, midPoint.y, midPoint.z]} rotation={[euler.x, euler.y, euler.z]}>
      {/* Glow cylinder */}
      <mesh ref={glowRef} scale={[1, length, 1]}>
        <cylinderGeometry args={[0.12, 0.12, 1, 16]} />
        <meshBasicMaterial color={bondColor} transparent opacity={0.15} />
      </mesh>

      {/* Actual bonds */}
      {Array.from({ length: bondCount }).map((_, i) => {
        const offset = bondCount === 1 ? 0 : (i - (bondCount - 1) / 2) * bondSpacing;
        return (
          <mesh
            key={i}
            ref={i === 0 ? meshRef : null}
            position={[offset, 0, 0]}
            scale={[1, length, 1]}
          >
            <cylinderGeometry args={[0.04, 0.04, 1, 8]} />
            <meshStandardMaterial
              color={bondColor}
              roughness={0.3}
              metalness={0.5}
              emissive={bondColor}
              emissiveIntensity={forming ? 0.5 : 0.1}
            />
          </mesh>
        );
      })}

      {/* Ionic bond visualization - dashed effect */}
      {type === 'ionic' && (
        <>
          <mesh position={[0, length * 0.25, 0]} scale={[1, length * 0.15, 1]}>
            <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
            <meshBasicMaterial color={bondColor} />
          </mesh>
          <mesh position={[0, -length * 0.25, 0]} scale={[1, length * 0.15, 1]}>
            <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
            <meshBasicMaterial color={bondColor} />
          </mesh>
        </>
      )}
    </group>
  );
};

// Electron particle that moves during reactions
const ElectronParticle = ({ from, to, progress, color = '#00ffff' }) => {
  const ref = useRef();

  const fromVec = new THREE.Vector3(...from);
  const toVec = new THREE.Vector3(...to);

  useFrame(() => {
    if (ref.current) {
      // Lerp position along path
      const pos = fromVec.clone().lerp(toVec, progress);
      // Add some waviness
      pos.y += Math.sin(progress * Math.PI * 2) * 0.2;
      ref.current.position.copy(pos);

      // Pulsing scale
      const scale = 0.8 + Math.sin(progress * Math.PI) * 0.4;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
};

// Animated atom wrapper with spring physics
const AnimatedMoleculeAtom = ({ atom, showLabel = true }) => {
  const { pos, scale } = useSpring({
    pos: atom.position,
    scale: atom.hidden ? 0 : 1,
    config: { tension: 170, friction: 26 }
  });

  if (atom.hidden) return null;

  return (
    <animated.group position={pos} scale={scale}>
      <MoleculeAtom
        element={atom.element}
        position={[0, 0, 0]}
        label={showLabel}
      />
    </animated.group>
  );
};

// Stage label showing current state
const StageLabel = ({ text, position = [0, 3, 0] }) => {
  return (
    <Text
      position={position}
      fontSize={0.4}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.02}
      outlineColor="#000000"
      fillOpacity={0.8}
    >
      {text}
    </Text>
  );
};

// Reaction arrow indicator
const ReactionArrow = ({ position = [0, 0, 0], direction = 1 }) => {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      // Pulsing animation
      ref.current.position.x = position[0] + Math.sin(clock.getElapsedTime() * 2) * 0.1 * direction;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Arrow body */}
      <mesh rotation={[0, 0, direction > 0 ? -Math.PI / 2 : Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.7} />
      </mesh>
      {/* Arrow head */}
      <mesh
        position={[direction * 0.5, 0, 0]}
        rotation={[0, 0, direction > 0 ? -Math.PI / 2 : Math.PI / 2]}
      >
        <coneGeometry args={[0.12, 0.25, 8]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

// Energy indicator
const EnergyIndicator = ({ isExothermic = true, intensity = 1 }) => {
  const ref = useRef();
  const color = isExothermic ? '#ff6b6b' : '#4ecdc4';

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.3;
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.1 * intensity;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={ref} position={[0, -2.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <torusGeometry args={[2.5, 0.015, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[2.2, 0.01, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

export const ReactionRenderer = ({ stage, reactionData }) => {
  if (!stage) return null;

  const isExothermic = reactionData?.enthalpy < 0;

  return (
    <group>
      {/* Energy indicator ring */}
      <EnergyIndicator isExothermic={isExothermic} intensity={1} />

      {/* Render all atoms */}
      {stage.atoms.map((atom) => (
        <AnimatedMoleculeAtom
          key={atom.id}
          atom={atom}
          showLabel={true}
        />
      ))}

      {/* Render all bonds */}
      {stage.bonds.map((bond, index) => {
        const startAtom = stage.atoms.find(a => a.id === bond.start);
        const endAtom = stage.atoms.find(a => a.id === bond.end);

        if (!startAtom || !endAtom || startAtom.hidden || endAtom.hidden) return null;

        return (
          <Bond
            key={`${bond.start}-${bond.end}-${index}`}
            start={startAtom.position}
            end={endAtom.position}
            type={bond.type || 'single'}
          />
        );
      })}

      {/* Ambient lighting */}
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color={isExothermic ? '#ff8866' : '#6688ff'} />
    </group>
  );
};
