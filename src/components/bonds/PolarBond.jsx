import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

/**
 * PolarBond component renders a covalent bond with dipole indicators
 * Shows δ+ and δ- labels to indicate partial charges
 * @param {Array} start - [x, y, z] position of the less electronegative atom (δ+)
 * @param {Array} end - [x, y, z] position of the more electronegative atom (δ-)
 * @param {string} color - Bond color
 * @param {boolean} showDipole - Whether to show dipole arrow
 * @param {boolean} showPartialCharges - Whether to show δ+/δ- labels
 * @param {number} polarity - Polarity strength (0-1) affects visual intensity
 */
export const PolarBond = ({
  start = [0, 0, 0],
  end = [1, 0, 0],
  color = '#ffffff',
  showDipole = true,
  showPartialCharges = true,
  polarity = 0.5,
  radius = 0.06
}) => {
  const { position, quaternion, length, direction, midpoint } = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const direction = new THREE.Vector3().subVectors(endVec, startVec);
    const length = direction.length();

    const midpoint = new THREE.Vector3()
      .addVectors(startVec, endVec)
      .multiplyScalar(0.5);

    const quaternion = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    quaternion.setFromUnitVectors(up, direction.clone().normalize());

    return { position: midpoint, quaternion, length, direction: direction.normalize(), midpoint };
  }, [start, end]);

  // Gradient effect - create two half-cylinders with different opacities
  const halfLength = length / 2;

  // Label positions (slightly above the bond)
  const labelOffset = 0.3;
  const startLabelPos = [
    start[0],
    start[1] + labelOffset,
    start[2]
  ];
  const endLabelPos = [
    end[0],
    end[1] + labelOffset,
    end[2]
  ];

  // Dipole arrow position and direction
  const arrowLength = length * 0.6;
  const arrowStart = midpoint.clone().addScaledVector(direction, -arrowLength / 2);

  return (
    <group>
      {/* Main bond cylinder with gradient effect */}
      <mesh position={[position.x, position.y, position.z]} quaternion={quaternion}>
        <cylinderGeometry args={[radius, radius, length, 12]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>

      {/* Electron density cloud effect near electronegative atom */}
      <mesh position={end}>
        <sphereGeometry args={[0.15 * polarity, 16, 16]} />
        <meshBasicMaterial
          color="#4488ff"
          transparent
          opacity={0.2 * polarity}
        />
      </mesh>

      {/* Partial charge labels */}
      {showPartialCharges && (
        <>
          <Text
            position={startLabelPos}
            fontSize={0.2}
            color="#ff8888"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter.woff"
          >
            δ+
          </Text>
          <Text
            position={endLabelPos}
            fontSize={0.2}
            color="#8888ff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter.woff"
          >
            δ-
          </Text>
        </>
      )}

      {/* Dipole arrow (points from + to -) */}
      {showDipole && (
        <group position={[midpoint.x, midpoint.y - 0.3, midpoint.z]}>
          {/* Arrow shaft */}
          <mesh quaternion={quaternion}>
            <cylinderGeometry args={[0.015, 0.015, arrowLength * 0.8, 8]} />
            <meshBasicMaterial color="#ffff00" />
          </mesh>

          {/* Arrow head (cone) */}
          <mesh
            position={[
              direction.x * arrowLength * 0.4,
              direction.y * arrowLength * 0.4,
              direction.z * arrowLength * 0.4
            ]}
            quaternion={quaternion}
          >
            <coneGeometry args={[0.05, 0.1, 8]} />
            <meshBasicMaterial color="#ffff00" />
          </mesh>

          {/* Cross at the positive end */}
          <mesh
            position={[
              -direction.x * arrowLength * 0.4,
              -direction.y * arrowLength * 0.4,
              -direction.z * arrowLength * 0.4
            ]}
          >
            <boxGeometry args={[0.08, 0.02, 0.02]} />
            <meshBasicMaterial color="#ffff00" />
          </mesh>
          <mesh
            position={[
              -direction.x * arrowLength * 0.4,
              -direction.y * arrowLength * 0.4,
              -direction.z * arrowLength * 0.4
            ]}
          >
            <boxGeometry args={[0.02, 0.08, 0.02]} />
            <meshBasicMaterial color="#ffff00" />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default PolarBond;
