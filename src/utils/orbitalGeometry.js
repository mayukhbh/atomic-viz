import * as THREE from 'three';

/**
 * Generate points for an s orbital (spherical)
 * @param {number} radius - Base radius
 * @param {number} segments - Number of segments for detail
 * @returns {Array} Array of Vector3 points
 */
export const generateSOrbital = (radius = 1, segments = 32) => {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    for (let j = 0; j <= segments; j++) {
      const phi = (i / segments) * Math.PI * 2;
      const theta = (j / segments) * Math.PI;
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);
      points.push(new THREE.Vector3(x, y, z));
    }
  }
  return points;
};

/**
 * Generate vertices for a p orbital (dumbbell shape)
 * @param {string} axis - 'x', 'y', or 'z' for orientation
 * @param {number} radius - Base radius
 * @param {number} lobeLength - Length of each lobe
 * @returns {Object} Geometry parameters for positive and negative lobes
 */
export const generatePOrbital = (axis = 'z', radius = 0.5, lobeLength = 1.5) => {
  const lobeCenterDistance = lobeLength * 0.6;

  let positiveCenter, negativeCenter;
  switch (axis) {
    case 'x':
      positiveCenter = [lobeCenterDistance, 0, 0];
      negativeCenter = [-lobeCenterDistance, 0, 0];
      break;
    case 'y':
      positiveCenter = [0, lobeCenterDistance, 0];
      negativeCenter = [0, -lobeCenterDistance, 0];
      break;
    case 'z':
    default:
      positiveCenter = [0, 0, lobeCenterDistance];
      negativeCenter = [0, 0, -lobeCenterDistance];
      break;
  }

  return {
    positiveLobe: {
      position: positiveCenter,
      radius: radius,
      scaleZ: lobeLength / radius
    },
    negativeLobe: {
      position: negativeCenter,
      radius: radius,
      scaleZ: lobeLength / radius
    }
  };
};

/**
 * Generate d orbital lobes (cloverleaf pattern)
 * @param {string} type - 'xy', 'xz', 'yz', 'x2-y2', or 'z2'
 * @param {number} radius - Base radius for lobes
 * @returns {Array} Array of lobe configurations
 */
export const generateDOrbital = (type = 'xy', radius = 0.4) => {
  const lobes = [];
  const distance = 1.0;

  switch (type) {
    case 'xy':
      // Four lobes in xy plane at 45 degrees
      lobes.push(
        { position: [distance, distance, 0], rotation: [0, 0, Math.PI / 4], scale: 0.8 },
        { position: [-distance, -distance, 0], rotation: [0, 0, Math.PI / 4], scale: 0.8 },
        { position: [distance, -distance, 0], rotation: [0, 0, -Math.PI / 4], scale: 0.8 },
        { position: [-distance, distance, 0], rotation: [0, 0, -Math.PI / 4], scale: 0.8 }
      );
      break;
    case 'xz':
      lobes.push(
        { position: [distance, 0, distance], rotation: [Math.PI / 4, 0, 0], scale: 0.8 },
        { position: [-distance, 0, -distance], rotation: [Math.PI / 4, 0, 0], scale: 0.8 },
        { position: [distance, 0, -distance], rotation: [-Math.PI / 4, 0, 0], scale: 0.8 },
        { position: [-distance, 0, distance], rotation: [-Math.PI / 4, 0, 0], scale: 0.8 }
      );
      break;
    case 'yz':
      lobes.push(
        { position: [0, distance, distance], rotation: [Math.PI / 4, 0, 0], scale: 0.8 },
        { position: [0, -distance, -distance], rotation: [Math.PI / 4, 0, 0], scale: 0.8 },
        { position: [0, distance, -distance], rotation: [-Math.PI / 4, 0, 0], scale: 0.8 },
        { position: [0, -distance, distance], rotation: [-Math.PI / 4, 0, 0], scale: 0.8 }
      );
      break;
    case 'x2-y2':
      // Four lobes along x and y axes
      lobes.push(
        { position: [distance * 1.2, 0, 0], rotation: [0, 0, 0], scale: 0.9 },
        { position: [-distance * 1.2, 0, 0], rotation: [0, 0, 0], scale: 0.9 },
        { position: [0, distance * 1.2, 0], rotation: [0, 0, 0], scale: 0.9 },
        { position: [0, -distance * 1.2, 0], rotation: [0, 0, 0], scale: 0.9 }
      );
      break;
    case 'z2':
      // Dumbbell along z with torus in xy plane
      lobes.push(
        { position: [0, 0, distance * 1.5], rotation: [0, 0, 0], scale: 1.0, type: 'lobe' },
        { position: [0, 0, -distance * 1.5], rotation: [0, 0, 0], scale: 1.0, type: 'lobe' },
        { position: [0, 0, 0], rotation: [Math.PI / 2, 0, 0], scale: 0.6, type: 'torus' }
      );
      break;
    default:
      break;
  }

  return lobes.map(lobe => ({ ...lobe, radius }));
};

/**
 * Generate f orbital lobes (complex multi-lobed shapes)
 * @param {string} type - f orbital type
 * @param {number} radius - Base radius
 * @returns {Array} Array of lobe configurations
 */
export const generateFOrbital = (type = 'xyz', radius = 0.35) => {
  const lobes = [];
  const distance = 0.9;

  // f orbitals have 8 lobes in various configurations
  switch (type) {
    case 'xyz':
      // 8 lobes at corners of a cube
      const corners = [
        [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
        [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]
      ];
      corners.forEach(([x, y, z]) => {
        lobes.push({
          position: [x * distance, y * distance, z * distance],
          rotation: [0, 0, 0],
          scale: 0.7
        });
      });
      break;
    case 'z3':
      // More complex z-dominant shape
      lobes.push(
        { position: [0, 0, distance * 2], rotation: [0, 0, 0], scale: 1.0 },
        { position: [0, 0, -distance * 2], rotation: [0, 0, 0], scale: 1.0 },
        { position: [0, 0, distance * 0.8], rotation: [0, 0, 0], scale: 0.5, type: 'ring' },
        { position: [0, 0, -distance * 0.8], rotation: [0, 0, 0], scale: 0.5, type: 'ring' }
      );
      break;
    default:
      // Default 8-lobe configuration
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const zSign = i < 4 ? 1 : -1;
        lobes.push({
          position: [
            Math.cos(angle) * distance,
            Math.sin(angle) * distance,
            zSign * distance * 0.5
          ],
          rotation: [0, 0, angle],
          scale: 0.6
        });
      }
  }

  return lobes.map(lobe => ({ ...lobe, radius }));
};

/**
 * Parse electron configuration to determine orbital structure
 * @param {string} config - Electron configuration string (e.g., "1s² 2s² 2p⁶")
 * @returns {Array} Array of orbital objects with type, n, and electron count
 */
export const parseElectronConfiguration = (config) => {
  if (!config) return [];

  const orbitals = [];
  // Handle both formats: "1s² 2s² 2p⁶" and "[Xe] 6s¹"
  const cleanConfig = config.replace(/\[.*?\]\s*/g, '');

  // Match patterns like "1s²", "2p⁶", "3d¹⁰"
  const regex = /(\d+)([spdf])([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g;
  let match;

  const superscriptMap = {
    '⁰': 0, '¹': 1, '²': 2, '³': 3, '⁴': 4,
    '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9
  };

  while ((match = regex.exec(cleanConfig)) !== null) {
    const n = parseInt(match[1]);
    const type = match[2];
    const countStr = match[3];

    // Parse superscript numbers
    let count = 0;
    for (const char of countStr) {
      count = count * 10 + (superscriptMap[char] || 0);
    }

    orbitals.push({ n, type, count });
  }

  return orbitals;
};

/**
 * Calculate the radial distance for an orbital based on principal quantum number
 * @param {number} n - Principal quantum number
 * @param {number} baseRadius - Base radius for scaling
 * @returns {number} Radial distance
 */
export const getOrbitalRadius = (n, baseRadius = 1) => {
  // Approximate Bohr radius scaling: r ∝ n²
  return baseRadius * (0.5 + n * 0.4);
};

/**
 * Get the color for an orbital type
 * @param {string} type - Orbital type (s, p, d, f)
 * @returns {string} Hex color
 */
export const getOrbitalColor = (type) => {
  const colors = {
    s: '#3B82F6', // Blue
    p: '#22C55E', // Green
    d: '#F97316', // Orange
    f: '#A855F7'  // Purple
  };
  return colors[type] || '#ffffff';
};

/**
 * Get maximum electrons for an orbital type
 * @param {string} type - Orbital type
 * @returns {number} Maximum electron count
 */
export const getMaxElectrons = (type) => {
  const max = { s: 2, p: 6, d: 10, f: 14 };
  return max[type] || 2;
};
