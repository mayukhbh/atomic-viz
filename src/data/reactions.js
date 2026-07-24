// Helper: build a flat benzene ring (atoms + bonds) for reaction stages.
// Returns stable-id atoms/bonds plus geometry helpers so substituents line up.
const benzeneRing = (cx, cy, { prefix = '', skipH = [], rC = 1.2, rH = 2.05 } = {}) => {
  const atoms = [];
  const bonds = [];
  const cIds = [];
  const angle = (i) => (i / 6) * Math.PI * 2 + Math.PI / 6;
  for (let i = 0; i < 6; i++) {
    const a = angle(i);
    cIds.push(`${prefix}c${i}`);
    atoms.push({ id: `${prefix}c${i}`, element: 'C', position: [cx + Math.cos(a) * rC, cy + Math.sin(a) * rC, 0] });
  }
  for (let i = 0; i < 6; i++) {
    bonds.push({ start: cIds[i], end: cIds[(i + 1) % 6], type: i % 2 === 0 ? 'double' : 'single' });
  }
  for (let i = 0; i < 6; i++) {
    if (skipH.includes(i)) continue;
    const a = angle(i);
    atoms.push({ id: `${prefix}h${i}`, element: 'H', position: [cx + Math.cos(a) * rH, cy + Math.sin(a) * rH, 0] });
    bonds.push({ start: `${prefix}c${i}`, end: `${prefix}h${i}`, type: 'single' });
  }
  const site = (i, dist) => {
    const a = angle(i);
    return [cx + Math.cos(a) * dist, cy + Math.sin(a) * dist, 0];
  };
  return { atoms, bonds, cIds, site };
};

export const REACTIONS = [
  // ============ INORGANIC REACTIONS ============
  {
    id: 'water-formation',
    name: 'Water Formation',
    type: 'Chemical',
    domain: 'inorganic',
    level: 'basic',
    equation: '2H₂ + O₂ → 2H₂O',
    enthalpy: -572,
    description: {
      basic: "Hydrogen gas combines with oxygen gas to form water in an explosive reaction.",
      advanced: "This highly exothermic redox reaction involves electron transfer where H₂ is oxidized (loses electrons) and O₂ is reduced (gains electrons). The reaction proceeds via a radical chain mechanism and is used in hydrogen fuel cells."
    },
    stages: [
      {
        atoms: [
          { id: 'h1', element: 'H', position: [-2, 0, 0] }, { id: 'h2', element: 'H', position: [-2.5, 0.5, 0] },
          { id: 'h3', element: 'H', position: [-2, -1, 0] }, { id: 'h4', element: 'H', position: [-2.5, -1.5, 0] },
          { id: 'o1', element: 'O', position: [2, 0, 0] }, { id: 'o2', element: 'O', position: [2.8, 0, 0] }
        ],
        bonds: [
          { start: 'h1', end: 'h2', type: 'single' },
          { start: 'h3', end: 'h4', type: 'single' },
          { start: 'o1', end: 'o2', type: 'double' }
        ]
      },
      {
        atoms: [
          { id: 'h1', element: 'H', position: [-0.5, 0, 0] }, { id: 'h2', element: 'H', position: [-1, 0.5, 0] },
          { id: 'h3', element: 'H', position: [-0.5, -1, 0] }, { id: 'h4', element: 'H', position: [-1, -1.5, 0] },
          { id: 'o1', element: 'O', position: [0.5, 0, 0] }, { id: 'o2', element: 'O', position: [1.3, 0, 0] }
        ],
        bonds: [
          { start: 'h1', end: 'h2', type: 'single' },
          { start: 'h3', end: 'h4', type: 'single' },
          { start: 'o1', end: 'o2', type: 'double' }
        ]
      },
      {
        atoms: [
          { id: 'h1', element: 'H', position: [-1.8, 0.8, 0] }, { id: 'h2', element: 'H', position: [-0.2, 0.8, 0] },
          { id: 'h3', element: 'H', position: [0.2, -0.8, 0] }, { id: 'h4', element: 'H', position: [1.8, -0.8, 0] },
          { id: 'o1', element: 'O', position: [-1, 0.5, 0] }, { id: 'o2', element: 'O', position: [1, -0.5, 0] }
        ],
        bonds: [
          { start: 'o1', end: 'h1', type: 'polar' }, { start: 'o1', end: 'h2', type: 'polar' },
          { start: 'o2', end: 'h3', type: 'polar' }, { start: 'o2', end: 'h4', type: 'polar' }
        ]
      }
    ]
  },
  {
    id: 'salt-formation',
    name: 'Salt Formation',
    type: 'Chemical',
    domain: 'inorganic',
    level: 'basic',
    equation: '2Na + Cl₂ → 2NaCl',
    enthalpy: -822,
    description: {
      basic: "Sodium metal reacts vigorously with chlorine gas to form table salt.",
      advanced: "This is a classic ionic bond formation reaction. Sodium (Na) transfers one electron to chlorine (Cl), forming Na⁺ and Cl⁻ ions. The large lattice energy of the NaCl crystal structure drives the reaction."
    },
    stages: [
      {
        atoms: [
          { id: 'na1', element: 'Na', position: [-2, 1, 0] },
          { id: 'na2', element: 'Na', position: [-2, -1, 0] },
          { id: 'cl1', element: 'Cl', position: [2, 0, 0] }, { id: 'cl2', element: 'Cl', position: [3, 0, 0] }
        ],
        bonds: [
          { start: 'cl1', end: 'cl2', type: 'single' }
        ]
      },
      {
        atoms: [
          { id: 'na1', element: 'Na', position: [-0.5, 0.5, 0] },
          { id: 'na2', element: 'Na', position: [-0.5, -0.5, 0] },
          { id: 'cl1', element: 'Cl', position: [0.5, 0.5, 0] }, { id: 'cl2', element: 'Cl', position: [0.5, -0.5, 0] }
        ],
        bonds: []
      },
      {
        atoms: [
          { id: 'na1', element: 'Na', position: [-1, 1, 0] },
          { id: 'na2', element: 'Na', position: [1, -1, 0] },
          { id: 'cl1', element: 'Cl', position: [-0.2, 1, 0] }, { id: 'cl2', element: 'Cl', position: [1.8, -1, 0] }
        ],
        bonds: [
          { start: 'na1', end: 'cl1', type: 'ionic' },
          { start: 'na2', end: 'cl2', type: 'ionic' }
        ]
      }
    ]
  },
  {
    id: 'rust-formation',
    name: 'Rust Formation',
    type: 'Chemical',
    domain: 'inorganic',
    level: 'basic',
    equation: '4Fe + 3O₂ → 2Fe₂O₃',
    enthalpy: -1648,
    description: {
      basic: "Iron slowly combines with oxygen in the air to form iron oxide, commonly known as rust.",
      advanced: "This electrochemical oxidation process requires both oxygen and water. Fe is oxidized to Fe³⁺ while O₂ is reduced to O²⁻. The hydrated iron(III) oxide (rust) is porous and allows further corrosion."
    },
    stages: [
      {
        atoms: [
          { id: 'fe1', element: 'Fe', position: [-2, 1, 0] },
          { id: 'fe2', element: 'Fe', position: [-2, -1, 0] },
          { id: 'o1', element: 'O', position: [2, 1, 0] }, { id: 'o2', element: 'O', position: [2.6, 1, 0] },
          { id: 'o3', element: 'O', position: [2, -1, 0] }, { id: 'o4', element: 'O', position: [2.6, -1, 0] }
        ],
        bonds: [
          { start: 'o1', end: 'o2', type: 'double' },
          { start: 'o3', end: 'o4', type: 'double' }
        ]
      },
      {
        atoms: [
          { id: 'fe1', element: 'Fe', position: [-0.5, 0.5, 0] },
          { id: 'fe2', element: 'Fe', position: [-0.5, -0.5, 0] },
          { id: 'o1', element: 'O', position: [0.8, 0.8, 0] }, { id: 'o2', element: 'O', position: [1.5, 0, 0] },
          { id: 'o3', element: 'O', position: [0.8, -0.8, 0] }, { id: 'o4', element: 'O', position: [0, 0, 0], hidden: true }
        ],
        bonds: []
      },
      {
        atoms: [
          { id: 'fe1', element: 'Fe', position: [-1, 0, 0] },
          { id: 'fe2', element: 'Fe', position: [1, 0, 0] },
          { id: 'o1', element: 'O', position: [-0.3, 0.8, 0] }, { id: 'o2', element: 'O', position: [0, 0, 0] },
          { id: 'o3', element: 'O', position: [0.3, -0.8, 0] }, { id: 'o4', element: 'O', position: [0, 0, 0], hidden: true }
        ],
        bonds: [
          { start: 'fe1', end: 'o1', type: 'ionic' },
          { start: 'fe1', end: 'o2', type: 'ionic' },
          { start: 'fe2', end: 'o2', type: 'ionic' },
          { start: 'fe2', end: 'o3', type: 'ionic' }
        ]
      }
    ]
  },
  {
    id: 'acid-base-neutralization',
    name: 'Acid-Base Neutralization',
    type: 'Chemical',
    domain: 'inorganic',
    level: 'basic',
    equation: 'HCl + NaOH → NaCl + H₂O',
    enthalpy: -57,
    description: {
      basic: "Hydrochloric acid reacts with sodium hydroxide to form salt and water.",
      advanced: "This is a classic Brønsted-Lowry acid-base reaction where H⁺ from HCl combines with OH⁻ from NaOH to form water. The enthalpy of neutralization is approximately -57 kJ/mol for strong acid-strong base reactions."
    },
    stages: [
      {
        atoms: [
          { id: 'h1', element: 'H', position: [-2.5, 0, 0] }, { id: 'cl1', element: 'Cl', position: [-1.8, 0, 0] },
          { id: 'na1', element: 'Na', position: [1.8, 0, 0] }, { id: 'o1', element: 'O', position: [2.5, 0, 0] },
          { id: 'h2', element: 'H', position: [3.1, 0, 0] }
        ],
        bonds: [
          { start: 'h1', end: 'cl1', type: 'polar' },
          { start: 'na1', end: 'o1', type: 'ionic' },
          { start: 'o1', end: 'h2', type: 'polar' }
        ]
      },
      {
        atoms: [
          { id: 'h1', element: 'H', position: [-1, 0.5, 0] }, { id: 'cl1', element: 'Cl', position: [-0.3, -0.5, 0] },
          { id: 'na1', element: 'Na', position: [0.3, -0.5, 0] }, { id: 'o1', element: 'O', position: [1, 0.5, 0] },
          { id: 'h2', element: 'H', position: [1.6, 0.8, 0] }
        ],
        bonds: []
      },
      {
        atoms: [
          { id: 'h1', element: 'H', position: [1.8, 0.6, 0] }, { id: 'cl1', element: 'Cl', position: [-1.8, 0, 0] },
          { id: 'na1', element: 'Na', position: [-1, 0, 0] }, { id: 'o1', element: 'O', position: [1.2, 0.3, 0] },
          { id: 'h2', element: 'H', position: [0.6, 0, 0] }
        ],
        bonds: [
          { start: 'na1', end: 'cl1', type: 'ionic' },
          { start: 'o1', end: 'h1', type: 'polar' },
          { start: 'o1', end: 'h2', type: 'polar' }
        ]
      }
    ]
  },
  {
    id: 'ammonia-synthesis',
    name: 'Ammonia Synthesis (Haber Process)',
    type: 'Chemical',
    domain: 'inorganic',
    level: 'advanced',
    equation: 'N₂ + 3H₂ → 2NH₃',
    enthalpy: -92,
    description: {
      basic: "Nitrogen and hydrogen gases combine under high pressure and temperature to form ammonia.",
      advanced: "The Haber-Bosch process uses an iron catalyst at 400-500°C and 200 atm. This reversible reaction is favored by high pressure (Le Chatelier's principle) but high temperature is needed for kinetics despite being thermodynamically unfavorable."
    },
    stages: [
      {
        atoms: [
          { id: 'n1', element: 'N', position: [-2, 0, 0] }, { id: 'n2', element: 'N', position: [-1.2, 0, 0] },
          { id: 'h1', element: 'H', position: [1.5, 1, 0] }, { id: 'h2', element: 'H', position: [2.1, 1, 0] },
          { id: 'h3', element: 'H', position: [1.5, 0, 0] }, { id: 'h4', element: 'H', position: [2.1, 0, 0] },
          { id: 'h5', element: 'H', position: [1.5, -1, 0] }, { id: 'h6', element: 'H', position: [2.1, -1, 0] }
        ],
        bonds: [
          { start: 'n1', end: 'n2', type: 'triple' },
          { start: 'h1', end: 'h2', type: 'single' },
          { start: 'h3', end: 'h4', type: 'single' },
          { start: 'h5', end: 'h6', type: 'single' }
        ]
      },
      {
        atoms: [
          { id: 'n1', element: 'N', position: [-1, 0.5, 0] }, { id: 'n2', element: 'N', position: [1, -0.5, 0] },
          { id: 'h1', element: 'H', position: [-1.6, 1, 0] }, { id: 'h2', element: 'H', position: [-0.4, 1, 0] },
          { id: 'h3', element: 'H', position: [-1, 1.3, 0] }, { id: 'h4', element: 'H', position: [0.4, -1, 0] },
          { id: 'h5', element: 'H', position: [1.6, -1, 0] }, { id: 'h6', element: 'H', position: [1, -1.3, 0] }
        ],
        bonds: [
          { start: 'n1', end: 'h1', type: 'polar' },
          { start: 'n1', end: 'h2', type: 'polar' },
          { start: 'n1', end: 'h3', type: 'polar' },
          { start: 'n2', end: 'h4', type: 'polar' },
          { start: 'n2', end: 'h5', type: 'polar' },
          { start: 'n2', end: 'h6', type: 'polar' }
        ]
      }
    ]
  },
  {
    id: 'sulfuric-acid-formation',
    name: 'Sulfuric Acid Formation',
    type: 'Chemical',
    domain: 'inorganic',
    level: 'advanced',
    equation: 'SO₃ + H₂O → H₂SO₄',
    enthalpy: -130,
    description: {
      basic: "Sulfur trioxide dissolves in water to form sulfuric acid, a strong acid used in many industries.",
      advanced: "This highly exothermic reaction releases so much heat that direct addition of SO₃ to water creates dangerous mists. Industrial production uses the Contact Process, absorbing SO₃ in concentrated H₂SO₄ to form oleum first."
    },
    stages: [
      {
        atoms: [
          { id: 's1', element: 'S', position: [-1.5, 0, 0] },
          { id: 'o1', element: 'O', position: [-2.3, 0.5, 0] },
          { id: 'o2', element: 'O', position: [-2.3, -0.5, 0] },
          { id: 'o3', element: 'O', position: [-0.7, 0, 0] },
          { id: 'o4', element: 'O', position: [1.5, 0, 0] },
          { id: 'h1', element: 'H', position: [2.1, 0.4, 0] },
          { id: 'h2', element: 'H', position: [2.1, -0.4, 0] }
        ],
        bonds: [
          { start: 's1', end: 'o1', type: 'double' },
          { start: 's1', end: 'o2', type: 'double' },
          { start: 's1', end: 'o3', type: 'double' },
          { start: 'o4', end: 'h1', type: 'polar' },
          { start: 'o4', end: 'h2', type: 'polar' }
        ]
      },
      {
        atoms: [
          { id: 's1', element: 'S', position: [0, 0, 0] },
          { id: 'o1', element: 'O', position: [-0.8, 0.6, 0] },
          { id: 'o2', element: 'O', position: [-0.8, -0.6, 0] },
          { id: 'o3', element: 'O', position: [0.8, 0.6, 0] },
          { id: 'o4', element: 'O', position: [0.8, -0.6, 0] },
          { id: 'h1', element: 'H', position: [1.5, 0.9, 0] },
          { id: 'h2', element: 'H', position: [1.5, -0.9, 0] }
        ],
        bonds: [
          { start: 's1', end: 'o1', type: 'double' },
          { start: 's1', end: 'o2', type: 'double' },
          { start: 's1', end: 'o3', type: 'single' },
          { start: 's1', end: 'o4', type: 'single' },
          { start: 'o3', end: 'h1', type: 'polar' },
          { start: 'o4', end: 'h2', type: 'polar' }
        ]
      }
    ]
  },

  // ============ ORGANIC REACTIONS ============
  {
    id: 'methane-combustion',
    name: 'Methane Combustion',
    type: 'Chemical',
    domain: 'organic',
    level: 'basic',
    equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
    enthalpy: -890,
    description: {
      basic: "Natural gas (methane) burns in oxygen to produce carbon dioxide and water, releasing energy.",
      advanced: "Complete combustion of methane proceeds via radical chain mechanisms. The C-H bond dissociation energy is 439 kJ/mol. This reaction is the basis for natural gas power generation and heating."
    },
    stages: [
      {
        atoms: [
          { id: 'c1', element: 'C', position: [-2, 0, 0] },
          { id: 'h1', element: 'H', position: [-2, 1, 0] }, { id: 'h2', element: 'H', position: [-2, -1, 0] },
          { id: 'h3', element: 'H', position: [-3, 0, 0] }, { id: 'h4', element: 'H', position: [-1, 0, 0] },
          { id: 'o1', element: 'O', position: [2, 1, 0] }, { id: 'o2', element: 'O', position: [2.8, 1, 0] },
          { id: 'o3', element: 'O', position: [2, -1, 0] }, { id: 'o4', element: 'O', position: [2.8, -1, 0] }
        ],
        bonds: [
          { start: 'c1', end: 'h1', type: 'single' }, { start: 'c1', end: 'h2', type: 'single' },
          { start: 'c1', end: 'h3', type: 'single' }, { start: 'c1', end: 'h4', type: 'single' },
          { start: 'o1', end: 'o2', type: 'double' },
          { start: 'o3', end: 'o4', type: 'double' }
        ]
      },
      {
        atoms: [
          { id: 'c1', element: 'C', position: [0, 0, 0] },
          { id: 'h1', element: 'H', position: [-2.8, 2.5, 0] }, { id: 'h2', element: 'H', position: [-1.2, 2.5, 0] },
          { id: 'h3', element: 'H', position: [1.2, -2.5, 0] }, { id: 'h4', element: 'H', position: [2.8, -2.5, 0] },
          { id: 'o1', element: 'O', position: [-1, 0, 0] }, { id: 'o2', element: 'O', position: [1, 0, 0] },
          { id: 'o3', element: 'O', position: [-2, 2, 0] }, { id: 'o4', element: 'O', position: [2, -2, 0] }
        ],
        bonds: [
          { start: 'c1', end: 'o1', type: 'double' }, { start: 'c1', end: 'o2', type: 'double' },
          { start: 'o3', end: 'h1', type: 'polar' }, { start: 'o3', end: 'h2', type: 'polar' },
          { start: 'o4', end: 'h3', type: 'polar' }, { start: 'o4', end: 'h4', type: 'polar' }
        ]
      }
    ]
  },
  {
    id: 'ethanol-combustion',
    name: 'Ethanol Combustion',
    type: 'Chemical',
    domain: 'organic',
    level: 'basic',
    equation: 'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O',
    enthalpy: -1367,
    description: {
      basic: "Ethanol (drinking alcohol) burns completely in oxygen to form carbon dioxide and water.",
      advanced: "Ethanol combustion releases 29.7 MJ/kg, making it viable as a biofuel. The reaction proceeds through radical intermediates. Ethanol's lower energy density vs gasoline is offset by higher octane rating."
    },
    stages: [
      {
        atoms: [
          { id: 'c1', element: 'C', position: [-2.5, 0, 0] },
          { id: 'c2', element: 'C', position: [-1.7, 0, 0] },
          { id: 'o1', element: 'O', position: [-0.9, 0, 0] },
          { id: 'h1', element: 'H', position: [-0.5, 0.4, 0] },
          { id: 'o2', element: 'O', position: [2, 0, 0] }, { id: 'o3', element: 'O', position: [2.6, 0, 0] }
        ],
        bonds: [
          { start: 'c1', end: 'c2', type: 'single' },
          { start: 'c2', end: 'o1', type: 'single' },
          { start: 'o1', end: 'h1', type: 'polar' },
          { start: 'o2', end: 'o3', type: 'double' }
        ]
      },
      {
        atoms: [
          { id: 'c1', element: 'C', position: [-1.5, 0.5, 0] },
          { id: 'c2', element: 'C', position: [1.5, -0.5, 0] },
          { id: 'o1', element: 'O', position: [-2.2, 0.8, 0] },
          { id: 'h1', element: 'H', position: [-2, -1.5, 0] },
          { id: 'o2', element: 'O', position: [-0.8, 0.2, 0] },
          { id: 'o3', element: 'O', position: [0.8, -0.2, 0] },
          { id: 'o4', element: 'O', position: [2.2, -0.8, 0] },
          { id: 'h2', element: 'H', position: [2, 1.5, 0] }
        ],
        bonds: [
          { start: 'c1', end: 'o1', type: 'double' },
          { start: 'c1', end: 'o2', type: 'double' },
          { start: 'c2', end: 'o3', type: 'double' },
          { start: 'c2', end: 'o4', type: 'double' }
        ]
      }
    ]
  },
  {
    id: 'photosynthesis',
    name: 'Photosynthesis',
    type: 'Chemical',
    domain: 'organic',
    level: 'basic',
    equation: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
    enthalpy: 2803,
    description: {
      basic: "Plants use sunlight to convert carbon dioxide and water into glucose and oxygen.",
      advanced: "This endergonic reaction couples light harvesting (photosystems I & II) with the Calvin cycle. Chlorophyll absorbs photons to drive electron transport, generating ATP and NADPH for CO₂ fixation via RuBisCO."
    },
    stages: [
      {
        atoms: [
          { id: 'c1', element: 'C', position: [-2, 0, 0] },
          { id: 'o1', element: 'O', position: [-2.6, 0.4, 0] },
          { id: 'o2', element: 'O', position: [-1.4, -0.4, 0] },
          { id: 'o3', element: 'O', position: [2, 0, 0] },
          { id: 'h1', element: 'H', position: [2.5, 0.4, 0] },
          { id: 'h2', element: 'H', position: [2.5, -0.4, 0] }
        ],
        bonds: [
          { start: 'c1', end: 'o1', type: 'double' },
          { start: 'c1', end: 'o2', type: 'double' },
          { start: 'o3', end: 'h1', type: 'polar' },
          { start: 'o3', end: 'h2', type: 'polar' }
        ]
      },
      {
        atoms: [
          { id: 'c1', element: 'C', position: [-0.8, 0.5, 0] },
          { id: 'c2', element: 'C', position: [0, 0, 0] },
          { id: 'c3', element: 'C', position: [0.8, -0.5, 0] },
          { id: 'o1', element: 'O', position: [-1.4, 0, 0] },
          { id: 'o2', element: 'O', position: [1.4, 0, 0] },
          { id: 'o3', element: 'O', position: [2.5, 0, 0] }, { id: 'o4', element: 'O', position: [3.1, 0, 0] }
        ],
        bonds: [
          { start: 'c1', end: 'c2', type: 'single' },
          { start: 'c2', end: 'c3', type: 'single' },
          { start: 'c1', end: 'o1', type: 'single' },
          { start: 'c3', end: 'o2', type: 'single' },
          { start: 'o3', end: 'o4', type: 'double' }
        ]
      }
    ]
  },
  {
    id: 'fermentation',
    name: 'Alcoholic Fermentation',
    type: 'Chemical',
    domain: 'organic',
    level: 'basic',
    equation: 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂',
    enthalpy: -67,
    description: {
      basic: "Yeast converts sugar into alcohol and carbon dioxide, used in brewing and baking.",
      advanced: "Anaerobic glycolysis converts glucose to pyruvate, which is decarboxylated to acetaldehyde, then reduced to ethanol by alcohol dehydrogenase. Only 2 ATP molecules are produced per glucose (vs 36-38 in aerobic respiration)."
    },
    stages: [
      {
        atoms: [
          { id: 'c1', element: 'C', position: [-1.5, 0.5, 0] },
          { id: 'c2', element: 'C', position: [-0.5, 0, 0] },
          { id: 'c3', element: 'C', position: [0.5, 0, 0] },
          { id: 'c4', element: 'C', position: [1.5, 0.5, 0] },
          { id: 'o1', element: 'O', position: [-2, 0, 0] },
          { id: 'o2', element: 'O', position: [2, 0, 0] }
        ],
        bonds: [
          { start: 'c1', end: 'c2', type: 'single' },
          { start: 'c2', end: 'c3', type: 'single' },
          { start: 'c3', end: 'c4', type: 'single' },
          { start: 'c1', end: 'o1', type: 'single' },
          { start: 'c4', end: 'o2', type: 'single' }
        ]
      },
      {
        atoms: [
          { id: 'c1', element: 'C', position: [-2, 0.5, 0] },
          { id: 'c2', element: 'C', position: [-1.2, 0.5, 0] },
          { id: 'o1', element: 'O', position: [-0.5, 0.5, 0] },
          { id: 'h1', element: 'H', position: [-0.1, 0.9, 0] },
          { id: 'c3', element: 'C', position: [1.5, -0.5, 0] },
          { id: 'o2', element: 'O', position: [0.9, -0.8, 0] },
          { id: 'o3', element: 'O', position: [2.1, -0.2, 0] }
        ],
        bonds: [
          { start: 'c1', end: 'c2', type: 'single' },
          { start: 'c2', end: 'o1', type: 'single' },
          { start: 'o1', end: 'h1', type: 'polar' },
          { start: 'c3', end: 'o2', type: 'double' },
          { start: 'c3', end: 'o3', type: 'double' }
        ]
      }
    ]
  },
  {
    id: 'esterification',
    name: 'Esterification',
    type: 'Chemical',
    domain: 'organic',
    level: 'advanced',
    equation: 'CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O',
    enthalpy: -10,
    description: {
      basic: "Acetic acid reacts with ethanol to form ethyl acetate (a solvent with fruity smell) and water.",
      advanced: "Fischer esterification is a reversible, acid-catalyzed condensation reaction. The mechanism involves protonation of the carboxylic acid, nucleophilic attack by alcohol, and water elimination. Removing water shifts equilibrium to products."
    },
    stages: [
      {
        atoms: [
          { id: 'c1', element: 'C', position: [-2.5, 0, 0] },
          { id: 'c2', element: 'C', position: [-1.7, 0, 0] },
          { id: 'o1', element: 'O', position: [-1.2, 0.5, 0] },
          { id: 'o2', element: 'O', position: [-1.2, -0.5, 0] },
          { id: 'h1', element: 'H', position: [-0.8, -0.8, 0] },
          { id: 'c3', element: 'C', position: [1.5, 0, 0] },
          { id: 'c4', element: 'C', position: [2.3, 0, 0] },
          { id: 'o3', element: 'O', position: [0.9, 0.4, 0] },
          { id: 'h2', element: 'H', position: [0.5, 0.7, 0] }
        ],
        bonds: [
          { start: 'c1', end: 'c2', type: 'single' },
          { start: 'c2', end: 'o1', type: 'double' },
          { start: 'c2', end: 'o2', type: 'single' },
          { start: 'o2', end: 'h1', type: 'polar' },
          { start: 'c3', end: 'c4', type: 'single' },
          { start: 'c3', end: 'o3', type: 'single' },
          { start: 'o3', end: 'h2', type: 'polar' }
        ]
      },
      {
        atoms: [
          { id: 'c1', element: 'C', position: [-2, 0, 0] },
          { id: 'c2', element: 'C', position: [-1.2, 0, 0] },
          { id: 'o1', element: 'O', position: [-0.7, 0.5, 0] },
          { id: 'o2', element: 'O', position: [-0.7, -0.5, 0] },
          { id: 'c3', element: 'C', position: [0.1, -0.5, 0] },
          { id: 'c4', element: 'C', position: [0.9, -0.5, 0] },
          { id: 'o3', element: 'O', position: [2, 0.3, 0] },
          { id: 'h1', element: 'H', position: [2.5, 0.6, 0] },
          { id: 'h2', element: 'H', position: [2.5, 0, 0] }
        ],
        bonds: [
          { start: 'c1', end: 'c2', type: 'single' },
          { start: 'c2', end: 'o1', type: 'double' },
          { start: 'c2', end: 'o2', type: 'single' },
          { start: 'o2', end: 'c3', type: 'single' },
          { start: 'c3', end: 'c4', type: 'single' },
          { start: 'o3', end: 'h1', type: 'polar' },
          { start: 'o3', end: 'h2', type: 'polar' }
        ]
      }
    ]
  },
  {
    id: 'hydrogenation',
    name: 'Ethylene Hydrogenation',
    type: 'Chemical',
    domain: 'organic',
    level: 'advanced',
    equation: 'C₂H₄ + H₂ → C₂H₆',
    enthalpy: -137,
    description: {
      basic: "Ethylene (a gas in fruits that causes ripening) adds hydrogen to become ethane.",
      advanced: "Catalytic hydrogenation uses Pt, Pd, or Ni catalysts. The mechanism involves chemisorption of both H₂ and the alkene on the metal surface, followed by stepwise hydrogen transfer. This syn addition is stereospecific."
    },
    stages: [
      {
        atoms: [
          { id: 'c1', element: 'C', position: [-1.5, 0, 0] },
          { id: 'c2', element: 'C', position: [-0.7, 0, 0] },
          { id: 'h1', element: 'H', position: [-2, 0.5, 0] },
          { id: 'h2', element: 'H', position: [-2, -0.5, 0] },
          { id: 'h3', element: 'H', position: [-0.2, 0.5, 0] },
          { id: 'h4', element: 'H', position: [-0.2, -0.5, 0] },
          { id: 'h5', element: 'H', position: [1.5, 0, 0] },
          { id: 'h6', element: 'H', position: [2.1, 0, 0] }
        ],
        bonds: [
          { start: 'c1', end: 'c2', type: 'double' },
          { start: 'c1', end: 'h1', type: 'single' },
          { start: 'c1', end: 'h2', type: 'single' },
          { start: 'c2', end: 'h3', type: 'single' },
          { start: 'c2', end: 'h4', type: 'single' },
          { start: 'h5', end: 'h6', type: 'single' }
        ]
      },
      {
        atoms: [
          { id: 'c1', element: 'C', position: [-0.5, 0, 0] },
          { id: 'c2', element: 'C', position: [0.5, 0, 0] },
          { id: 'h1', element: 'H', position: [-1, 0.5, 0] },
          { id: 'h2', element: 'H', position: [-1, -0.5, 0] },
          { id: 'h3', element: 'H', position: [1, 0.5, 0] },
          { id: 'h4', element: 'H', position: [1, -0.5, 0] },
          { id: 'h5', element: 'H', position: [-0.5, 0.7, 0] },
          { id: 'h6', element: 'H', position: [0.5, -0.7, 0] }
        ],
        bonds: [
          { start: 'c1', end: 'c2', type: 'single' },
          { start: 'c1', end: 'h1', type: 'single' },
          { start: 'c1', end: 'h2', type: 'single' },
          { start: 'c1', end: 'h5', type: 'single' },
          { start: 'c2', end: 'h3', type: 'single' },
          { start: 'c2', end: 'h4', type: 'single' },
          { start: 'c2', end: 'h6', type: 'single' }
        ]
      }
    ]
  },

  // ============ AROMATIC REACTIONS ============
  {
    id: 'nitration',
    name: 'Benzene Nitration',
    type: 'Chemical',
    domain: 'aromatic',
    level: 'advanced',
    equation: 'C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O',
    enthalpy: -110,
    description: {
      basic: "Benzene reacts with nitric acid so that a nitro group (–NO₂) replaces one hydrogen on the ring.",
      advanced: "A classic electrophilic aromatic substitution. Nitric acid and sulfuric acid generate the nitronium ion (NO₂⁺), which attacks the aromatic π-system; loss of H⁺ restores aromaticity and water is released."
    },
    stages: (() => {
      const r0 = benzeneRing(-2.6, 0);
      const s0 = { atoms: [...r0.atoms,
          { id: 'n', element: 'N', position: [3.0, 0, 0] }, { id: 'o1', element: 'O', position: [3.7, 0.7, 0] },
          { id: 'o2', element: 'O', position: [3.7, -0.7, 0] }, { id: 'o3', element: 'O', position: [2.3, -0.6, 0] },
          { id: 'ho', element: 'H', position: [1.9, -1.1, 0] }],
        bonds: [...r0.bonds, { start: 'n', end: 'o1', type: 'double' }, { start: 'n', end: 'o2', type: 'double' },
          { start: 'n', end: 'o3', type: 'single' }, { start: 'o3', end: 'ho', type: 'polar' }] };
      const r1 = benzeneRing(-2.6, 0, { skipH: [0] });
      const n = r1.site(0, 2.6);
      const s1 = { atoms: [...r1.atoms,
          { id: 'n', element: 'N', position: n }, { id: 'o1', element: 'O', position: [n[0] + 0.3, n[1] + 1.1, 0] },
          { id: 'o2', element: 'O', position: [n[0] + 1.1, n[1] - 0.1, 0] },
          { id: 'o3', element: 'O', position: [2.2, 2.0, 0] }, { id: 'ho', element: 'H', position: [2.9, 2.3, 0] },
          { id: 'h0', element: 'H', position: [1.6, 2.4, 0] }],
        bonds: [...r1.bonds, { start: 'c0', end: 'n', type: 'single' }, { start: 'n', end: 'o1', type: 'double' },
          { start: 'n', end: 'o2', type: 'single' }, { start: 'o3', end: 'h0', type: 'polar' }, { start: 'o3', end: 'ho', type: 'polar' }] };
      return [s0, s1];
    })()
  },
  {
    id: 'bromination',
    name: 'Benzene Bromination',
    type: 'Chemical',
    domain: 'aromatic',
    level: 'advanced',
    equation: 'C₆H₆ + Br₂ → C₆H₅Br + HBr',
    enthalpy: -45,
    description: {
      basic: "With an iron catalyst, bromine swaps one hydrogen on the benzene ring for a bromine atom.",
      advanced: "FeBr₃ polarises Br₂ to generate Br⁺, the electrophile. It adds to the ring to form an arenium (Wheland) intermediate; deprotonation regenerates the aromatic system and releases HBr."
    },
    stages: (() => {
      const r0 = benzeneRing(-2.4, 0);
      const s0 = { atoms: [...r0.atoms, { id: 'br1', element: 'Br', position: [2.6, 0, 0] }, { id: 'br2', element: 'Br', position: [3.9, 0, 0] }],
        bonds: [...r0.bonds, { start: 'br1', end: 'br2', type: 'single' }] };
      const r1 = benzeneRing(-2.4, 0, { skipH: [0] });
      const br1 = r1.site(0, 3.0);
      const s1 = { atoms: [...r1.atoms, { id: 'br1', element: 'Br', position: br1 },
          { id: 'br2', element: 'Br', position: [2.5, 2.2, 0] }, { id: 'h0', element: 'H', position: [3.3, 2.3, 0] }],
        bonds: [...r1.bonds, { start: 'c0', end: 'br1', type: 'polar' }, { start: 'br2', end: 'h0', type: 'polar' }] };
      return [s0, s1];
    })()
  },
  {
    id: 'benzene-hydrogenation',
    name: 'Benzene Hydrogenation',
    type: 'Chemical',
    domain: 'aromatic',
    level: 'advanced',
    equation: 'C₆H₆ + 3H₂ → C₆H₁₂',
    enthalpy: -208,
    description: {
      basic: "Under pressure with a metal catalyst, benzene adds three hydrogen molecules to become cyclohexane.",
      advanced: "Complete hydrogenation over Ni or Pt saturates the ring. Because the aromatic system is unusually stable, the enthalpy released (~208 kJ/mol) is less than three times that of a normal alkene — direct evidence of aromatic resonance stabilisation."
    },
    stages: (() => {
      const r0 = benzeneRing(0, 0);
      const h2 = [];
      [[3.2, 1.2], [3.2, -1.2], [-3.4, 0]].forEach(([x, y], k) => {
        h2.push({ id: `ha${k}`, element: 'H', position: [x, y, 0] });
        h2.push({ id: `hb${k}`, element: 'H', position: [x + 0.7, y, 0] });
      });
      const s0 = { atoms: [...r0.atoms, ...h2],
        bonds: [...r0.bonds, { start: 'ha0', end: 'hb0', type: 'single' }, { start: 'ha1', end: 'hb1', type: 'single' }, { start: 'ha2', end: 'hb2', type: 'single' }] };
      const r1 = benzeneRing(0, 0);
      r1.bonds.forEach((b) => { if (b.type === 'double') b.type = 'single'; });
      const map = ['ha0', 'hb0', 'ha1', 'hb1', 'ha2', 'hb2'];
      const extra = [], extraBonds = [];
      for (let i = 0; i < 6; i++) {
        const p = r1.site(i, 1.9);
        extra.push({ id: map[i], element: 'H', position: [p[0], p[1], 0.6] });
        extraBonds.push({ start: `c${i}`, end: map[i], type: 'single' });
      }
      const s1 = { atoms: [...r1.atoms, ...extra], bonds: [...r1.bonds, ...extraBonds] };
      return [s0, s1];
    })()
  },
  {
    id: 'methane-chlorination',
    name: 'Methane Chlorination',
    type: 'Chemical',
    domain: 'organic',
    level: 'advanced',
    equation: 'CH₄ + Cl₂ → CH₃Cl + HCl',
    enthalpy: -99,
    description: {
      basic: "In UV light, chlorine replaces one hydrogen of methane to make chloromethane and hydrogen chloride.",
      advanced: "A free-radical substitution: UV light homolyses Cl₂ into chlorine radicals (initiation), which abstract H and propagate a chain (propagation) until radicals combine (termination). Further substitution gives CH₂Cl₂, CHCl₃ and CCl₄."
    },
    stages: [
      { atoms: [
          { id: 'c1', element: 'C', position: [-2, 0, 0] }, { id: 'h1', element: 'H', position: [-2, 1, 0] },
          { id: 'h2', element: 'H', position: [-2, -1, 0] }, { id: 'h3', element: 'H', position: [-3, 0, 0] },
          { id: 'h4', element: 'H', position: [-1, 0, 0] },
          { id: 'cl1', element: 'Cl', position: [2, 0, 0] }, { id: 'cl2', element: 'Cl', position: [3.2, 0, 0] }],
        bonds: [ { start: 'c1', end: 'h1', type: 'single' }, { start: 'c1', end: 'h2', type: 'single' },
          { start: 'c1', end: 'h3', type: 'single' }, { start: 'c1', end: 'h4', type: 'single' }, { start: 'cl1', end: 'cl2', type: 'single' }] },
      { atoms: [
          { id: 'c1', element: 'C', position: [-0.5, 0, 0] }, { id: 'h1', element: 'H', position: [-0.5, 1, 0] },
          { id: 'h2', element: 'H', position: [-0.5, -1, 0] }, { id: 'h3', element: 'H', position: [-1.5, -0.4, 0] },
          { id: 'h4', element: 'H', position: [2.6, 1.6, 0] },
          { id: 'cl1', element: 'Cl', position: [0.8, 0.3, 0] }, { id: 'cl2', element: 'Cl', position: [3.4, 1.4, 0] }],
        bonds: [ { start: 'c1', end: 'h1', type: 'single' }, { start: 'c1', end: 'h2', type: 'single' },
          { start: 'c1', end: 'h3', type: 'single' }, { start: 'c1', end: 'cl1', type: 'polar' }, { start: 'cl2', end: 'h4', type: 'polar' }] }
    ]
  },
  {
    id: 'thermite',
    name: 'Thermite Reaction',
    type: 'Chemical',
    domain: 'advanced',
    level: 'advanced',
    equation: 'Fe₂O₃ + 2Al → 2Fe + Al₂O₃',
    enthalpy: -851,
    description: {
      basic: "Aluminium rips oxygen away from iron oxide, releasing so much heat it produces molten iron.",
      advanced: "A highly exothermic thermite (aluminothermic) redox reaction. Aluminium is a stronger reducing agent than iron, so it reduces Fe³⁺ to metallic iron while being oxidised to Al₂O₃, reaching temperatures above 2500 °C — used for welding rail track."
    },
    stages: [
      { atoms: [
          { id: 'fe1', element: 'Fe', position: [-2.2, 0.7, 0] }, { id: 'fe2', element: 'Fe', position: [-2.2, -0.7, 0] },
          { id: 'o1', element: 'O', position: [-1.1, 1.1, 0] }, { id: 'o2', element: 'O', position: [-1.1, 0, 0] }, { id: 'o3', element: 'O', position: [-1.1, -1.1, 0] },
          { id: 'al1', element: 'Al', position: [2.2, 0.7, 0] }, { id: 'al2', element: 'Al', position: [2.2, -0.7, 0] }],
        bonds: [ { start: 'fe1', end: 'o1', type: 'ionic' }, { start: 'fe1', end: 'o2', type: 'ionic' },
          { start: 'fe2', end: 'o2', type: 'ionic' }, { start: 'fe2', end: 'o3', type: 'ionic' }] },
      { atoms: [
          { id: 'fe1', element: 'Fe', position: [-2.6, 1.4, 0] }, { id: 'fe2', element: 'Fe', position: [-2.6, -1.4, 0] },
          { id: 'o1', element: 'O', position: [1.1, 1.1, 0] }, { id: 'o2', element: 'O', position: [2.2, 0, 0] }, { id: 'o3', element: 'O', position: [1.1, -1.1, 0] },
          { id: 'al1', element: 'Al', position: [1.5, 0.6, 0] }, { id: 'al2', element: 'Al', position: [1.5, -0.6, 0] }],
        bonds: [ { start: 'al1', end: 'o1', type: 'ionic' }, { start: 'al1', end: 'o2', type: 'ionic' },
          { start: 'al2', end: 'o2', type: 'ionic' }, { start: 'al2', end: 'o3', type: 'ionic' }] }
    ]
  },

  // ============ NUCLEAR REACTIONS ============
  {
    id: 'fission',
    name: 'Uranium-235 Fission',
    type: 'Nuclear',
    domain: 'nuclear',
    level: 'advanced',
    equation: 'n + ²³⁵U → ¹⁴¹Ba + ⁹²Kr + 3n',
    enthalpy: -200000000, // ~200 MeV per fission
    description: {
      basic: "A neutron splits a uranium atom into smaller atoms, releasing enormous energy and more neutrons.",
      advanced: "Thermal neutron capture excites ²³⁵U to ²³⁶U*, which undergoes fission via nuclear deformation. The mass defect (Δm ≈ 0.2 amu) converts to ~200 MeV via E=mc². The 2.5 neutrons released enable chain reactions."
    },
    stages: [
      {
        atoms: [
          { id: 'u1', element: 'U', position: [0, 0, 0] },
          { id: 'n_in', element: 'H', position: [-5, 0, 0] },
          { id: 'ba', element: 'Fe', position: [0, 0, 0], hidden: true },
          { id: 'kr', element: 'Ar', position: [0, 0, 0], hidden: true },
          { id: 'n1', element: 'H', position: [0, 0, 0], hidden: true },
          { id: 'n2', element: 'H', position: [0, 0, 0], hidden: true },
          { id: 'n3', element: 'H', position: [0, 0, 0], hidden: true }
        ],
        bonds: []
      },
      {
        atoms: [
          { id: 'u1', element: 'U', position: [0, 0, 0] },
          { id: 'n_in', element: 'H', position: [-0.8, 0, 0] },
          { id: 'ba', element: 'Fe', position: [0, 0, 0], hidden: true },
          { id: 'kr', element: 'Ar', position: [0, 0, 0], hidden: true },
          { id: 'n1', element: 'H', position: [0, 0, 0], hidden: true },
          { id: 'n2', element: 'H', position: [0, 0, 0], hidden: true },
          { id: 'n3', element: 'H', position: [0, 0, 0], hidden: true }
        ],
        bonds: []
      },
      {
        atoms: [
          { id: 'u1', element: 'U', position: [0, 0, 0], hidden: true },
          { id: 'n_in', element: 'H', position: [0, 0, 0], hidden: true },
          { id: 'ba', element: 'Fe', position: [-2, 2, 0], hidden: false },
          { id: 'kr', element: 'Ar', position: [2, -2, 0], hidden: false },
          { id: 'n1', element: 'H', position: [3, 3, 0], hidden: false },
          { id: 'n2', element: 'H', position: [3, 0, 0], hidden: false },
          { id: 'n3', element: 'H', position: [0, 3, 0], hidden: false }
        ],
        bonds: []
      }
    ]
  },
  {
    id: 'hydrogen-fusion',
    name: 'Hydrogen Fusion',
    type: 'Nuclear',
    domain: 'nuclear',
    level: 'advanced',
    equation: '²H + ³H → ⁴He + n',
    enthalpy: -17600000, // ~17.6 MeV
    description: {
      basic: "Two heavy hydrogen isotopes fuse to create helium and release tremendous energy - this powers the Sun.",
      advanced: "D-T fusion has the lowest ignition temperature (~100 million K) due to strong nuclear force range. The reaction produces 17.6 MeV, with 14.1 MeV carried by the neutron. This is the basis for tokamak fusion reactors."
    },
    stages: [
      {
        atoms: [
          { id: 'd', element: 'H', position: [-2, 0, 0] },
          { id: 't', element: 'H', position: [2, 0, 0] },
          { id: 'he', element: 'He', position: [0, 0, 0], hidden: true },
          { id: 'n', element: 'H', position: [0, 0, 0], hidden: true }
        ],
        bonds: []
      },
      {
        atoms: [
          { id: 'd', element: 'H', position: [-0.3, 0, 0] },
          { id: 't', element: 'H', position: [0.3, 0, 0] },
          { id: 'he', element: 'He', position: [0, 0, 0], hidden: true },
          { id: 'n', element: 'H', position: [0, 0, 0], hidden: true }
        ],
        bonds: []
      },
      {
        atoms: [
          { id: 'd', element: 'H', position: [0, 0, 0], hidden: true },
          { id: 't', element: 'H', position: [0, 0, 0], hidden: true },
          { id: 'he', element: 'He', position: [-1.5, 0, 0], hidden: false },
          { id: 'n', element: 'H', position: [3, 0, 0], hidden: false }
        ],
        bonds: []
      }
    ]
  },
  {
    id: 'alpha-decay',
    name: 'Alpha Decay',
    type: 'Nuclear',
    domain: 'nuclear',
    level: 'advanced',
    equation: '²³⁸U → ²³⁴Th + ⁴He',
    enthalpy: -4200000, // ~4.2 MeV
    description: {
      basic: "Uranium spontaneously emits an alpha particle (helium nucleus) and transforms into thorium.",
      advanced: "Alpha decay occurs via quantum tunneling through the Coulomb barrier. The Geiger-Nuttall law relates half-life to alpha energy. ²³⁸U's t½ of 4.5 billion years makes it useful for geological dating."
    },
    stages: [
      {
        atoms: [
          { id: 'u', element: 'U', position: [0, 0, 0] },
          { id: 'th', element: 'Fe', position: [0, 0, 0], hidden: true },
          { id: 'he', element: 'He', position: [0, 0, 0], hidden: true }
        ],
        bonds: []
      },
      {
        atoms: [
          { id: 'u', element: 'U', position: [0, 0, 0] },
          { id: 'th', element: 'Fe', position: [-0.5, 0, 0], hidden: true },
          { id: 'he', element: 'He', position: [1, 0, 0], hidden: true }
        ],
        bonds: []
      },
      {
        atoms: [
          { id: 'u', element: 'U', position: [0, 0, 0], hidden: true },
          { id: 'th', element: 'Fe', position: [-1.5, 0, 0], hidden: false },
          { id: 'he', element: 'He', position: [3, 0, 0], hidden: false }
        ],
        bonds: []
      }
    ]
  },
  {
    id: 'beta-decay',
    name: 'Beta Decay (Carbon-14)',
    type: 'Nuclear',
    domain: 'nuclear',
    level: 'advanced',
    equation: '¹⁴C → ¹⁴N + e⁻ + ν̄',
    enthalpy: -156000, // ~156 keV
    description: {
      basic: "Radioactive carbon transforms into nitrogen by emitting an electron, used for dating ancient materials.",
      advanced: "In β⁻ decay, a neutron converts to a proton via weak interaction: n → p + e⁻ + ν̄e. ¹⁴C's t½ of 5,730 years and production in the upper atmosphere enables radiocarbon dating of organic materials up to ~50,000 years old."
    },
    stages: [
      {
        atoms: [
          { id: 'c', element: 'C', position: [0, 0, 0] },
          { id: 'n', element: 'N', position: [0, 0, 0], hidden: true },
          { id: 'e', element: 'H', position: [0, 0, 0], hidden: true }
        ],
        bonds: []
      },
      {
        atoms: [
          { id: 'c', element: 'C', position: [-0.3, 0, 0] },
          { id: 'n', element: 'N', position: [0, 0, 0], hidden: true },
          { id: 'e', element: 'H', position: [0.5, 0.5, 0], hidden: true }
        ],
        bonds: []
      },
      {
        atoms: [
          { id: 'c', element: 'C', position: [0, 0, 0], hidden: true },
          { id: 'n', element: 'N', position: [-1, 0, 0], hidden: false },
          { id: 'e', element: 'H', position: [3, 1, 0], hidden: false }
        ],
        bonds: []
      }
    ]
  },

  // ============ ADVANCED REACTIONS ============
  {
    id: 'electrochemical',
    name: 'Zinc-Copper Electrochemistry',
    type: 'Chemical',
    domain: 'advanced',
    level: 'advanced',
    equation: 'Zn + Cu²⁺ → Zn²⁺ + Cu',
    enthalpy: -212,
    description: {
      basic: "Zinc metal displaces copper from solution - the basis for batteries and metal plating.",
      advanced: "This galvanic cell has E°=1.10V. Zn is oxidized at the anode (Zn → Zn²⁺ + 2e⁻) while Cu²⁺ is reduced at the cathode (Cu²⁺ + 2e⁻ → Cu). The Daniell cell was one of the first practical batteries."
    },
    stages: [
      {
        atoms: [
          { id: 'zn', element: 'Zn', position: [-2, 0, 0] },
          { id: 'cu', element: 'Cu', position: [2, 0, 0] },
          { id: 'zn2', element: 'Zn', position: [0, 0, 0], hidden: true },
          { id: 'cu2', element: 'Cu', position: [0, 0, 0], hidden: true }
        ],
        bonds: []
      },
      {
        atoms: [
          { id: 'zn', element: 'Zn', position: [-1, 0.5, 0] },
          { id: 'cu', element: 'Cu', position: [1, -0.5, 0] },
          { id: 'zn2', element: 'Zn', position: [0, 0, 0], hidden: true },
          { id: 'cu2', element: 'Cu', position: [0, 0, 0], hidden: true }
        ],
        bonds: []
      },
      {
        atoms: [
          { id: 'zn', element: 'Zn', position: [-2, 0, 0], hidden: true },
          { id: 'cu', element: 'Cu', position: [2, 0, 0], hidden: true },
          { id: 'zn2', element: 'Zn', position: [-1.5, 1, 0], hidden: false },
          { id: 'cu2', element: 'Cu', position: [1.5, -1, 0], hidden: false }
        ],
        bonds: []
      }
    ]
  },
  {
    id: 'polymerization',
    name: 'Ethylene Polymerization',
    type: 'Chemical',
    domain: 'advanced',
    level: 'advanced',
    equation: 'nC₂H₄ → (C₂H₄)ₙ',
    enthalpy: -95,
    description: {
      basic: "Many ethylene molecules link together to form polyethylene - the world's most common plastic.",
      advanced: "Radical, Ziegler-Natta, or metallocene catalysis can be used. HDPE (linear chains) is made with coordination catalysis; LDPE (branched) via radical polymerization at high pressure. Global production exceeds 100 million tonnes/year."
    },
    stages: [
      {
        atoms: [
          { id: 'c1', element: 'C', position: [-2, 0, 0] },
          { id: 'c2', element: 'C', position: [-1.2, 0, 0] },
          { id: 'c3', element: 'C', position: [0.5, 0, 0] },
          { id: 'c4', element: 'C', position: [1.3, 0, 0] },
          { id: 'c5', element: 'C', position: [3, 0, 0] },
          { id: 'c6', element: 'C', position: [3.8, 0, 0] }
        ],
        bonds: [
          { start: 'c1', end: 'c2', type: 'double' },
          { start: 'c3', end: 'c4', type: 'double' },
          { start: 'c5', end: 'c6', type: 'double' }
        ]
      },
      {
        atoms: [
          { id: 'c1', element: 'C', position: [-2.5, 0, 0] },
          { id: 'c2', element: 'C', position: [-1.7, 0, 0] },
          { id: 'c3', element: 'C', position: [-0.9, 0, 0] },
          { id: 'c4', element: 'C', position: [-0.1, 0, 0] },
          { id: 'c5', element: 'C', position: [0.7, 0, 0] },
          { id: 'c6', element: 'C', position: [1.5, 0, 0] }
        ],
        bonds: [
          { start: 'c1', end: 'c2', type: 'single' },
          { start: 'c2', end: 'c3', type: 'single' },
          { start: 'c3', end: 'c4', type: 'single' },
          { start: 'c4', end: 'c5', type: 'single' },
          { start: 'c5', end: 'c6', type: 'single' }
        ]
      }
    ]
  },
  {
    id: 'atp-synthesis',
    name: 'ATP Synthesis',
    type: 'Chemical',
    domain: 'advanced',
    level: 'advanced',
    equation: 'ADP + Pᵢ → ATP',
    enthalpy: 30.5,
    description: {
      basic: "ADP and phosphate combine to form ATP - the energy currency of all living cells.",
      advanced: "ATP synthase couples proton gradient dissipation to phosphorylation via rotary catalysis. The F₀ subunit acts as a proton channel; F₁ synthesizes ATP using conformational changes. ~3 H⁺ are needed per ATP."
    },
    stages: [
      {
        atoms: [
          { id: 'p1', element: 'P', position: [-2, 0, 0] },
          { id: 'p2', element: 'P', position: [-1, 0, 0] },
          { id: 'o1', element: 'O', position: [-0.3, 0, 0] },
          { id: 'p3', element: 'P', position: [2, 0, 0] },
          { id: 'o2', element: 'O', position: [1.4, 0, 0] }
        ],
        bonds: [
          { start: 'p1', end: 'p2', type: 'single' },
          { start: 'p2', end: 'o1', type: 'single' }
        ]
      },
      {
        atoms: [
          { id: 'p1', element: 'P', position: [-1.5, 0, 0] },
          { id: 'p2', element: 'P', position: [-0.5, 0, 0] },
          { id: 'o1', element: 'O', position: [0.2, 0, 0] },
          { id: 'p3', element: 'P', position: [0.9, 0, 0] },
          { id: 'o2', element: 'O', position: [1.6, 0, 0] }
        ],
        bonds: [
          { start: 'p1', end: 'p2', type: 'single' },
          { start: 'p2', end: 'o1', type: 'single' },
          { start: 'o1', end: 'p3', type: 'single' }
        ]
      }
    ]
  }
];

export const MOLECULES = {
  'H2O': { name: 'Water', formula: 'H₂O', atoms: { H: 2, O: 1 } },
  'CH4': { name: 'Methane', formula: 'CH₄', atoms: { C: 1, H: 4 } },
  'CO2': { name: 'Carbon Dioxide', formula: 'CO₂', atoms: { C: 1, O: 2 } },
  'NH3': { name: 'Ammonia', formula: 'NH₃', atoms: { N: 1, H: 3 } },
  'O2': { name: 'Oxygen Gas', formula: 'O₂', atoms: { O: 2 } },
  'H2': { name: 'Hydrogen Gas', formula: 'H₂', atoms: { H: 2 } },
  'NaCl': { name: 'Table Salt', formula: 'NaCl', atoms: { Na: 1, Cl: 1 } },
  'H2SO4': { name: 'Sulfuric Acid', formula: 'H₂SO₄', atoms: { H: 2, S: 1, O: 4 } },
  'C2H5OH': { name: 'Ethanol', formula: 'C₂H₅OH', atoms: { C: 2, H: 6, O: 1 } },
  'C6H12O6': { name: 'Glucose', formula: 'C₆H₁₂O₆', atoms: { C: 6, H: 12, O: 6 } },
  'Fe2O3': { name: 'Iron(III) Oxide', formula: 'Fe₂O₃', atoms: { Fe: 2, O: 3 } },
  'ATP': { name: 'Adenosine Triphosphate', formula: 'ATP', atoms: { C: 10, H: 16, N: 5, O: 13, P: 3 } }
};

// Reaction categories for filtering
export const REACTION_CATEGORIES = {
  inorganic: 'Inorganic',
  organic: 'Organic',
  aromatic: 'Aromatic',
  nuclear: 'Nuclear',
  advanced: 'Advanced'
};

// Get reactions by domain
export const getReactionsByDomain = (domain) => {
  return REACTIONS.filter(r => r.domain === domain);
};

// Get reactions by level
export const getReactionsByLevel = (level) => {
  return REACTIONS.filter(r => r.level === level);
};
