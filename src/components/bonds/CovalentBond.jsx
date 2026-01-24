import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * CovalentBond component renders single, double, or triple covalent bonds
 * @param {Array} start - [x, y, z] position of the first atom
 * @param {Array} end - [x, y, z] position of the second atom
 * @param {number} bondOrder - 1 for single, 2 for double, 3 for triple bond
 * @param {string} color - Bond color (default: white)
 * @param {number} radius - Bond cylinder radius
 */
export const CovalentBond = ({
  start = [0, 0, 0],
  end = [1, 0, 0],
  bondOrder = 1,
  color = '#ffffff',
  radius = 0.05,
  opacity = 1
}) => {
  const { position, quaternion, length, offsets } = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const direction = new THREE.Vector3().subVectors(endVec, startVec);
    const length = direction.length();

    // Calculate midpoint for position
    const midpoint = new THREE.Vector3()
      .addVectors(startVec, endVec)
      .multiplyScalar(0.5);

    // Calculate rotation quaternion
    const quaternion = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    quaternion.setFromUnitVectors(up, direction.normalize());

    // Calculate offsets for multiple bonds
    const offsets = [];
    if (bondOrder === 1) {
      offsets.push([0, 0]);
    } else if (bondOrder === 2) {
      const spacing = radius * 2.5;
      offsets.push([-spacing / 2, 0], [spacing / 2, 0]);
    } else if (bondOrder === 3) {
      const spacing = radius * 2.5;
      offsets.push([0, 0], [-spacing, 0], [spacing, 0]);
    }

    return { position: midpoint, quaternion, length, offsets };
  }, [start, end, bondOrder, radius]);

  // Calculate perpendicular vectors for offsetting bonds
  const perpVectors = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const direction = new THREE.Vector3().subVectors(endVec, startVec).normalize();

    // Find a perpendicular vector
    const up = new THREE.Vector3(0, 1, 0);
    let perp1 = new THREE.Vector3().crossVectors(direction, up);
    if (perp1.length() < 0.001) {
      perp1 = new THREE.Vector3().crossVectors(direction, new THREE.Vector3(1, 0, 0));
    }
    perp1.normalize();

    const perp2 = new THREE.Vector3().crossVectors(direction, perp1).normalize();

    return { perp1, perp2 };
  }, [start, end]);

  return (
    <group>
      {offsets.map((offset, index) => {
        const offsetVec = new THREE.Vector3()
          .addScaledVector(perpVectors.perp1, offset[0])
          .addScaledVector(perpVectors.perp2, offset[1]);

        const bondPosition = position.clone().add(offsetVec);

        return (
          <mesh
            key={index}
            position={[bondPosition.x, bondPosition.y, bondPosition.z]}
            quaternion={quaternion}
          >
            <cylinderGeometry args={[radius, radius, length, 8]} />
            <meshStandardMaterial
              color={color}
              transparent={opacity < 1}
              opacity={opacity}
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default CovalentBond;
