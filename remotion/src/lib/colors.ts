// AtomicViz Color Palette - Premium Dark Theme with Vibrant Accents
export const colors = {
  // Core backgrounds
  background: '#000000',
  backgroundDeep: '#020408',
  backgroundLight: '#0a0a14',
  backgroundPanel: 'rgba(10, 10, 30, 0.85)',

  // Primary - Electric Cyan
  cyan: '#00ffff',
  cyanLight: '#66ffff',
  cyanBright: '#99ffff',
  cyanDark: '#00cccc',
  cyanGlow: 'rgba(0, 255, 255, 0.7)',

  // Secondary - Vivid Purple/Magenta
  purple: '#a855f7',
  purpleLight: '#c084fc',
  purpleBright: '#d8b4fe',
  purpleDark: '#7c3aed',
  magenta: '#ff00ff',
  magentaLight: '#ff66ff',

  // Accent - Electric colors
  electric: '#00d4ff',
  electricPink: '#ff0080',
  electricGreen: '#00ff88',
  electricOrange: '#ff6b00',
  electricYellow: '#ffff00',

  // Warm accents
  orange: '#ff8c00',
  orangeBright: '#ffa500',
  gold: '#ffd700',
  goldBright: '#ffed4a',
  amber: '#ffbf00',

  // Cool accents
  green: '#00ff88',
  greenBright: '#66ffaa',
  greenNeon: '#39ff14',
  blue: '#0088ff',
  blueBright: '#00aaff',

  // Element colors - more vibrant
  hydrogen: '#ffffff',
  helium: '#ffccff',
  carbon: '#909090',
  nitrogen: '#4488ff',
  oxygen: '#ff4444',
  neon: '#ff6b9d',
  iron: '#e87c40',
  sulfur: '#ffff44',
  chlorine: '#44ff44',

  // Particle colors
  proton: '#ff4466',
  neutron: '#8888aa',
  electron: '#00ffff',

  // UI colors
  white: '#ffffff',
  gray: '#888899',
  grayLight: '#aaaacc',
  grayDark: '#444466',

  // Gradients
  gradients: {
    cyan: 'linear-gradient(135deg, #00ffff 0%, #0088ff 100%)',
    cyanPurple: 'linear-gradient(135deg, #00ffff 0%, #a855f7 100%)',
    purpleCyan: 'linear-gradient(135deg, #a855f7 0%, #00ffff 100%)',
    purplePink: 'linear-gradient(135deg, #a855f7 0%, #ff0080 100%)',
    rainbow: 'linear-gradient(135deg, #ff0080 0%, #ff8c00 25%, #ffff00 50%, #00ff88 75%, #00ffff 100%)',
    fire: 'linear-gradient(135deg, #ff4466 0%, #ff8c00 50%, #ffff00 100%)',
    nuclear: 'linear-gradient(135deg, #ffd700 0%, #ff4466 100%)',
    cosmic: 'linear-gradient(135deg, #0088ff 0%, #a855f7 50%, #ff0080 100%)',
    aurora: 'linear-gradient(135deg, #00ff88 0%, #00ffff 50%, #a855f7 100%)',
  },
} as const;

// Element category colors - vibrant
export const categoryColors = {
  alkaliMetal: '#ff6b9d',
  alkalineEarth: '#ff8866',
  transitionMetal: '#ffaa44',
  postTransition: '#44ddaa',
  metalloid: '#ff44aa',
  nonmetal: '#44ff88',
  halogen: '#66ff66',
  nobleGas: '#44ddff',
  lanthanide: '#aa66ff',
  actinide: '#ff6644',
} as const;
