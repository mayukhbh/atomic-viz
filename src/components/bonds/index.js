export { CovalentBond } from './CovalentBond';
export { IonicBond } from './IonicBond';
export { PolarBond } from './PolarBond';

// Bond type constants
export const BOND_TYPES = {
  SINGLE: 'single',
  DOUBLE: 'double',
  TRIPLE: 'triple',
  IONIC: 'ionic',
  POLAR: 'polar',
  HYDROGEN: 'hydrogen',
  METALLIC: 'metallic'
};

// Helper to get bond component based on type
export const getBondComponent = (type) => {
  switch (type) {
    case BOND_TYPES.IONIC:
      return 'IonicBond';
    case BOND_TYPES.POLAR:
      return 'PolarBond';
    case BOND_TYPES.SINGLE:
    case BOND_TYPES.DOUBLE:
    case BOND_TYPES.TRIPLE:
    default:
      return 'CovalentBond';
  }
};

// Get bond order from type
export const getBondOrder = (type) => {
  switch (type) {
    case BOND_TYPES.DOUBLE:
      return 2;
    case BOND_TYPES.TRIPLE:
      return 3;
    default:
      return 1;
  }
};
