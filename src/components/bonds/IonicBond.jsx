import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

/**
 * IonicBond component renders a dashed line with charge labels
 * @param {Array} start - [x, y, z] position of the cation
 * @param {Array} end - [x, y, z] position of the anion
 * @param {string} cationCharge - Charge label for cation (e.g., '+', '2+')
 * @param {string} anionCharge - Charge label for anion (e.g., '-', '2-')
 * @param {string} color - Bond color
 * @param {boolean} showCharges - Whether to display charge labels
 */
export const IonicBond = ({
  start = [0, 0, 0],
  end = [1, 0, 0],
  cationCharge = '+',
  anionCharge = '-',
  color = '#88ccff',
  showCharges = true,
  dashSize = 0.1,
  gapSize = 0.08
}) => {
  const { segments, startPos, endPos, direction } = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const direction = new THREE.Vector3().subVectors(endVec, startVec);
    const length = direction.length();
    const normalizedDir = direction.clone().normalize();

    // Calculate number of dash segments
    const segmentLength = dashSize + gapSize;
    const numSegments = Math.floor(length / segmentLength);

    const segments = [];
    for (let i = 0; i < numSegments; i++) {
      const segmentStart = startVec.clone().addScaledVector(normalizedDir, i * segmentLength);
      const segmentEnd = segmentStart.clone().addScaledVector(normalizedDir, dashSize);

      // Don't extend past the end point
      if (segmentEnd.distanceTo(startVec) > length) break;

      const midpoint = segmentStart.clone().add(segmentEnd).multiplyScalar(0.5);

      // Calculate quaternion for this segment
      const quaternion = new THREE.Quaternion();
      const up = new THREE.Vector3(0, 1, 0);
      quaternion.setFromUnitVectors(up, normalizedDir);

      segments.push({
        position: midpoint,
        quaternion,
        length: dashSize
      });
    }

    return { segments, startPos: startVec, endPos: endVec, direction: normalizedDir };
  }, [start, end, dashSize, gapSize]);

  // Calculate charge label positions (offset slightly from atoms)
  const chargeOffset = 0.4;
  const cationLabelPos = useMemo(() => {
    return [
      start[0] - direction.x * chargeOffset,
      start[1] + 0.5,
      start[2] - direction.z * chargeOffset
    ];
  }, [start, direction]);

  const anionLabelPos = useMemo(() => {
    return [
      end[0] + direction.x * chargeOffset,
      end[1] + 0.5,
      end[2] + direction.z * chargeOffset
    ];
  }, [end, direction]);

  return (
    <group>
      {/* Dashed line segments */}
      {segments.map((segment, index) => (
        <mesh
          key={index}
          position={[segment.position.x, segment.position.y, segment.position.z]}
          quaternion={segment.quaternion}
        >
          <cylinderGeometry args={[0.03, 0.03, segment.length, 6]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.8}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
      ))}

      {/* Charge labels */}
      {showCharges && (
        <>
          <Text
            position={cationLabelPos}
            fontSize={0.25}
            color="#ff6666"
            anchorX="center"
            anchorY="middle"
          >
            {cationCharge}
          </Text>
          <Text
            position={anionLabelPos}
            fontSize={0.25}
            color="#6666ff"
            anchorX="center"
            anchorY="middle"
          >
            {anionCharge}
          </Text>
        </>
      )}

      {/* Electrostatic attraction indicator (subtle glow) */}
      <mesh position={[
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2,
        (start[2] + end[2]) / 2
      ]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export default IonicBond;
