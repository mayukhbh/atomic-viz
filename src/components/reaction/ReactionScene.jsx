import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { Label3D } from '../viewer/Label3D';
import { ELEMENTS } from '../../data/elements';
import { cpk, BOND_COLORS } from '../../engine/cpk';
import { interpolateReaction } from '../../engine/reactionEngine';

const UP = new THREE.Vector3(0, 1, 0);

function ReactAtom({ atom }) {
  const ref = useRef();
  const el = ELEMENTS[atom.element];
  const color = el?.color || cpk(atom.element).color;
  const radius = (el?.radius || 0.5) * 0.6;

  useFrame(({ clock }) => {
    if (ref.current) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 2 + atom.position[0]) * 0.02;
      ref.current.scale.setScalar(atom.scale * pulse);
    }
  });

  if (atom.opacity <= 0.02) return null;

  return (
    <group position={atom.position}>
      <mesh ref={ref}>
        <sphereGeometry args={[radius, 40, 40]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.18}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.15}
          emissive={color}
          emissiveIntensity={0.12}
          transparent
          opacity={atom.opacity}
          envMapIntensity={0.8}
        />
      </mesh>
      {atom.opacity > 0.6 && (
        <Billboard position={[0, 0, radius + 0.08]}>
          <Label3D
            fontSize={0.24}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
            fillOpacity={atom.opacity}
          >
            {el?.symbol || atom.element}
          </Label3D>
        </Billboard>
      )}
    </group>
  );
}

function ReactBond({ start, end, type, opacity }) {
  const { mid, euler, length } = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const dir = new THREE.Vector3().subVectors(e, s);
    const len = dir.length();
    const q = new THREE.Quaternion().setFromUnitVectors(UP, dir.clone().normalize());
    return {
      mid: new THREE.Vector3().addVectors(s, e).multiplyScalar(0.5),
      euler: new THREE.Euler().setFromQuaternion(q),
      length: len,
    };
  }, [start, end]);

  const color = BOND_COLORS[type] || '#c9d2dc';
  const count = type === 'triple' ? 3 : type === 'double' ? 2 : 1;
  const spacing = 0.14;

  if (opacity <= 0.02 || length < 0.01) return null;

  return (
    <group position={mid} rotation={[euler.x, euler.y, euler.z]}>
      {Array.from({ length: count }).map((_, i) => {
        const off = count === 1 ? 0 : (i - (count - 1) / 2) * spacing;
        return (
          <mesh key={i} position={[off, 0, 0]} scale={[1, length, 1]}>
            <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
            <meshPhysicalMaterial
              color={color}
              roughness={0.3}
              metalness={0.3}
              emissive={color}
              emissiveIntensity={0.15}
              transparent
              opacity={opacity}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// A soft energy ring that intensifies at the transition state (mid progress).
function EnergyField({ exothermic, transition }) {
  const ref = useRef();
  const color = exothermic ? '#ff7a59' : '#59a6ff';
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.elapsedTime * 0.25;
      const s = 1 + transition * 0.25 + Math.sin(clock.elapsedTime * 2) * 0.03;
      ref.current.scale.setScalar(s);
      ref.current.children.forEach((c) => {
        if (c.material) c.material.opacity = 0.12 + transition * 0.4;
      });
    }
  });
  return (
    <group ref={ref} position={[0, -2.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <torusGeometry args={[3, 0.02, 8, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 5]}>
        <torusGeometry args={[2.6, 0.015, 8, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export function ReactionScene({ reaction, progress }) {
  const { atoms, bonds } = useMemo(
    () => interpolateReaction(reaction, progress),
    [reaction, progress]
  );
  const exothermic = (reaction.enthalpy ?? 0) < 0;
  // transition intensity peaks in the middle of the animation
  const transition = Math.sin(Math.max(0, Math.min(1, progress)) * Math.PI);

  const posById = useMemo(() => {
    const m = new Map();
    atoms.forEach((a) => m.set(a.id, a));
    return m;
  }, [atoms]);

  return (
    <group>
      <EnergyField exothermic={exothermic} transition={transition} />

      {atoms.map((a) => (
        <ReactAtom key={a.id} atom={a} />
      ))}

      {bonds.map((b, i) => {
        const s = posById.get(b.start);
        const e = posById.get(b.end);
        if (!s || !e) return null;
        const op = Math.min(b.opacity, s.opacity, e.opacity);
        return (
          <ReactBond
            key={`${b.start}-${b.end}-${i}`}
            start={s.position}
            end={e.position}
            type={b.type || 'single'}
            opacity={op}
          />
        );
      })}
    </group>
  );
}
