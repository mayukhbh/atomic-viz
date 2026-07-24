import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { Label3D } from './Label3D';
import { cpk, BOND_COLORS } from '../../engine/cpk';

// Reusable, chemistry-accurate molecule renderer.
// modes: 'ballstick' | 'spacefill' | 'wireframe'
// Renders atoms sized by covalent/vdW radius and bonds with correct multiplicity.

const UP = new THREE.Vector3(0, 1, 0);

function AtomMesh({ element, position, radius, mode, dim, highlight }) {
  const ref = useRef();
  const data = cpk(element);
  const emissive = highlight ? new THREE.Color(data.color).offsetHSL(0, 0.1, 0.1) : data.color;

  useFrame(({ clock }) => {
    if (ref.current && highlight) {
      const p = 1 + Math.sin(clock.elapsedTime * 3) * 0.04;
      ref.current.scale.setScalar(p);
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshPhysicalMaterial
          color={data.color}
          roughness={mode === 'spacefill' ? 0.35 : 0.18}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.15}
          reflectivity={0.6}
          emissive={emissive}
          emissiveIntensity={highlight ? 0.35 : mode === 'wireframe' ? 0.4 : 0.08}
          transparent={dim}
          opacity={dim ? 0.25 : 1}
          envMapIntensity={0.8}
        />
      </mesh>
      {highlight && (
        <mesh scale={1.18}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshBasicMaterial color={data.color} transparent opacity={0.12} side={THREE.BackSide} />
        </mesh>
      )}
    </group>
  );
}

function HalfCylinder({ color, radius, length, sign, offset }) {
  // sign -1 → half toward `start`; +1 → half toward `end` (local +Y points to end)
  return (
    <mesh position={[offset, (sign * length) / 4, 0]} scale={[1, length / 2, 1]}>
      <cylinderGeometry args={[radius, radius, 1, 20]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.28}
        metalness={0.15}
        clearcoat={0.7}
        clearcoatRoughness={0.2}
        emissive={color}
        emissiveIntensity={0.14}
        envMapIntensity={0.9}
      />
    </mesh>
  );
}

function BondMesh({ start, end, order = 1, btype, mode, dim, planeNormal, startColor, endColor }) {
  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);
  const { mid, quat, length, offsetDir } = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(endVec, startVec);
    const len = dir.length();
    const q = new THREE.Quaternion().setFromUnitVectors(UP, dir.clone().normalize());
    let perp = new THREE.Vector3().crossVectors(dir, planeNormal || new THREE.Vector3(0, 0, 1));
    if (perp.lengthSq() < 1e-6) perp = new THREE.Vector3(1, 0, 0);
    perp.normalize();
    return {
      mid: new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5),
      quat: q,
      length: len,
      offsetDir: perp,
    };
  }, [startVec, endVec, planeNormal]);

  // Polar/ionic bonds keep their meaningful typed color; covalent bonds are split-coloured
  // by the two atoms they join (the classic vivid ball-and-stick look).
  const typed = btype === 'polar' || btype === 'ionic';
  const cA = typed ? BOND_COLORS[btype] : (startColor || '#c9d2dc');
  const cB = typed ? BOND_COLORS[btype] : (endColor || '#c9d2dc');
  const radius = mode === 'wireframe' ? 0.045 : 0.085;
  const count = order === 3 ? 3 : order === 2 ? 2 : 1;
  const spacing = 0.17;
  const euler = new THREE.Euler().setFromQuaternion(quat);

  return (
    <group position={mid} rotation={[euler.x, euler.y, euler.z]}>
      <group visible={!dim}>
        {Array.from({ length: count }).map((_, i) => {
          const off = count === 1 ? 0 : (i - (count - 1) / 2) * spacing;
          const local = offsetDir.clone().applyQuaternion(quat.clone().invert()).multiplyScalar(off);
          return (
            <group key={i} position={[local.x, local.y, local.z]}>
              <HalfCylinder color={cA} radius={radius} length={length} sign={-1} offset={0} />
              <HalfCylinder color={cB} radius={radius} length={length} sign={1} offset={0} />
            </group>
          );
        })}
        {btype === 'aromatic' && (
          <mesh scale={[1, length, 1]}>
            <cylinderGeometry args={[radius * 0.5, radius * 0.5, 1, 12]} />
            <meshBasicMaterial color="#ffd27f" transparent opacity={0.4} />
          </mesh>
        )}
      </group>
      {dim && (
        <mesh scale={[1, length, 1]}>
          <cylinderGeometry args={[radius, radius, 1, 12]} />
          <meshBasicMaterial color="#5b6472" transparent opacity={0.15} />
        </mesh>
      )}
    </group>
  );
}

export function MoleculeView({
  molecule,
  mode = 'ballstick',
  showLabels = false,
  highlightFG = false,
  autoRotate = false,
  rotateSpeed = 0.25,
  scale = 1,
}) {
  const group = useRef();

  useFrame((_, delta) => {
    if (group.current && autoRotate) {
      group.current.rotation.y += delta * rotateSpeed;
    }
  });

  const planeNormal = useMemo(() => {
    if (!molecule) return new THREE.Vector3(0, 0, 1);
    // estimate molecular plane normal via covariance of atom positions
    const pts = molecule.atoms.map((a) => new THREE.Vector3(...a.pos));
    if (pts.length < 3) return new THREE.Vector3(0, 0, 1);
    const v1 = new THREE.Vector3().subVectors(pts[1], pts[0]);
    let normal = new THREE.Vector3(0, 0, 1);
    for (let i = 2; i < pts.length; i++) {
      const v2 = new THREE.Vector3().subVectors(pts[i], pts[0]);
      const n = new THREE.Vector3().crossVectors(v1, v2);
      if (n.lengthSq() > 0.05) { normal = n.normalize(); break; }
    }
    return normal;
  }, [molecule]);

  const radiusFor = (el) => {
    const d = cpk(el);
    if (mode === 'spacefill') return d.vdw * 0.62;
    if (mode === 'wireframe') return d.covalent * 0.18;
    return d.covalent * 0.42; // ball-and-stick
  };

  // Auto-fit: normalise every molecule to a consistent on-screen size regardless of how
  // many atoms it has, so switching from methane to benzene doesn't blow past the frame.
  const fitScale = useMemo(() => {
    if (!molecule) return 1;
    let maxR = 0.001;
    molecule.atoms.forEach((a) => {
      const d = Math.hypot(a.pos[0], a.pos[1], a.pos[2]) + radiusFor(a.el);
      if (d > maxR) maxR = d;
    });
    const target = 1.9;
    return Math.min(1.7, target / maxR);
  }, [molecule, mode]);

  if (!molecule) return null;

  const hasFG = molecule.atoms.some((a) => a.fg);

  return (
    <group ref={group} scale={scale * fitScale}>
      {molecule.atoms.map((atom, i) => {
        const isFG = !!atom.fg;
        const highlight = highlightFG && isFG;
        const dim = highlightFG && hasFG && !isFG;
        return (
          <AtomMesh
            key={`a${i}`}
            element={atom.el}
            position={atom.pos}
            radius={radiusFor(atom.el)}
            mode={mode}
            dim={dim}
            highlight={highlight}
          />
        );
      })}

      {mode !== 'spacefill' &&
        molecule.bonds.map((b, i) => {
          const a1 = molecule.atoms[b.a];
          const a2 = molecule.atoms[b.b];
          if (!a1 || !a2) return null;
          const fgBond = highlightFG && hasFG && !(a1.fg && a2.fg);
          return (
            <BondMesh
              key={`b${i}`}
              start={a1.pos}
              end={a2.pos}
              order={b.order}
              btype={b.btype}
              mode={mode}
              dim={fgBond}
              planeNormal={planeNormal}
              startColor={cpk(a1.el).color}
              endColor={cpk(a2.el).color}
            />
          );
        })}

      {showLabels &&
        molecule.atoms.map((atom, i) => (
          <Billboard key={`l${i}`} position={[atom.pos[0], atom.pos[1], atom.pos[2] + radiusFor(atom.el) + 0.14]}>
            <Label3D
              fontSize={0.28}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#000000"
            >
              {atom.el}
            </Label3D>
          </Billboard>
        ))}
    </group>
  );
}
