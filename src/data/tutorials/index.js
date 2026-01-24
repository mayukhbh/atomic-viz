/**
 * Tutorial content for AtomicViz
 * Organized by difficulty level (basic/advanced)
 */

// Basic tutorials for high school level
export const atomicStructure = {
  id: 'atomic-structure',
  title: 'Understanding Atoms',
  level: 'basic',
  duration: 5,
  description: 'Learn the basic structure of atoms: protons, neutrons, and electrons.',
  steps: [
    {
      title: 'Welcome to Atoms',
      view: 'atom',
      element: 'Li',
      narration: 'Every atom is made up of three types of particles: protons, neutrons, and electrons. Let\'s explore lithium, one of the simplest elements.',
      highlights: [],
      camera: { position: [0, 0, 5] }
    },
    {
      title: 'The Nucleus',
      view: 'atom',
      element: 'Li',
      narration: 'At the center of every atom is the nucleus. It contains positively charged protons and neutral neutrons. The nucleus contains almost all of the atom\'s mass.',
      highlights: [
        { target: 'nucleus', label: 'Nucleus', position: [0, 0, 0] }
      ],
      camera: { position: [0, 0, 3] }
    },
    {
      title: 'Electrons',
      view: 'atom',
      element: 'Li',
      narration: 'Electrons are tiny, negatively charged particles that orbit around the nucleus. Lithium has 3 electrons arranged in shells around the nucleus.',
      highlights: [
        { target: 'electrons', label: 'Electron Shells', position: [1.5, 0, 0] }
      ],
      camera: { position: [2, 1, 4] }
    },
    {
      title: 'Electron Shells',
      view: 'atom',
      element: 'Na',
      narration: 'Larger atoms have more electrons in multiple shells. Sodium has 11 electrons in three shells: 2 in the first, 8 in the second, and 1 in the third.',
      highlights: [
        { target: 'shell-1', label: 'First Shell (2e⁻)', position: [0.8, 0, 0] },
        { target: 'shell-2', label: 'Second Shell (8e⁻)', position: [1.3, 0, 0] },
        { target: 'shell-3', label: 'Third Shell (1e⁻)', position: [1.8, 0, 0] }
      ],
      camera: { position: [0, 2, 5] }
    },
    {
      title: 'Atomic Number',
      view: 'atom',
      element: 'C',
      narration: 'The atomic number tells us how many protons an atom has. Carbon has 6 protons, so its atomic number is 6. A neutral atom has equal protons and electrons.',
      highlights: [],
      camera: { position: [0, 0, 4] }
    }
  ]
};

export const periodicNavigation = {
  id: 'periodic-navigation',
  title: 'Navigating the Periodic Table',
  level: 'basic',
  duration: 6,
  description: 'Learn to read and navigate the periodic table of elements.',
  steps: [
    {
      title: 'The Periodic Table',
      view: 'atom',
      element: 'H',
      narration: 'The periodic table organizes all known elements by their atomic number. Elements are arranged in rows (periods) and columns (groups).',
      highlights: [],
      camera: { position: [0, 0, 5] },
      showPeriodicTable: true
    },
    {
      title: 'Groups (Columns)',
      view: 'atom',
      element: 'Na',
      narration: 'Elements in the same column (group) have similar properties. Group 1 elements like sodium are highly reactive metals called alkali metals.',
      highlights: [],
      camera: { position: [0, 0, 4] }
    },
    {
      title: 'Periods (Rows)',
      view: 'atom',
      element: 'Mg',
      narration: 'Elements in the same row (period) have the same number of electron shells. As you move across a period, the number of protons increases.',
      highlights: [],
      camera: { position: [0, 0, 4] }
    },
    {
      title: 'Element Categories',
      view: 'atom',
      element: 'Fe',
      narration: 'Elements are grouped into categories based on their properties: metals, nonmetals, metalloids, noble gases, and more. Iron is a transition metal.',
      highlights: [],
      camera: { position: [0, 0, 4] }
    },
    {
      title: 'Reading Element Information',
      view: 'atom',
      element: 'O',
      narration: 'Each element shows its symbol, atomic number, and atomic mass. Oxygen has symbol O, atomic number 8, and is essential for life.',
      highlights: [],
      camera: { position: [0, 0, 4] }
    }
  ]
};

export const chemicalBondingBasics = {
  id: 'chemical-bonding-basics',
  title: 'Chemical Bonding Basics',
  level: 'basic',
  duration: 7,
  description: 'Understand how atoms bond together to form molecules.',
  steps: [
    {
      title: 'Why Atoms Bond',
      view: 'atom',
      element: 'Na',
      narration: 'Atoms bond together to become more stable. They do this by sharing or transferring electrons to fill their outer electron shell.',
      highlights: [],
      camera: { position: [0, 0, 4] }
    },
    {
      title: 'Ionic Bonds',
      view: 'reaction',
      reactionId: 'salt-formation',
      narration: 'Ionic bonds form when one atom transfers electrons to another. Sodium gives an electron to chlorine, creating Na⁺ and Cl⁻ ions that attract each other.',
      highlights: [],
      camera: { position: [0, 0, 6] }
    },
    {
      title: 'Covalent Bonds',
      view: 'reaction',
      reactionId: 'water-formation',
      narration: 'Covalent bonds form when atoms share electrons. In water, hydrogen atoms share electrons with oxygen to form H₂O.',
      highlights: [],
      camera: { position: [0, 0, 6] }
    },
    {
      title: 'Single, Double, Triple Bonds',
      view: 'atom',
      element: 'N',
      narration: 'Atoms can share 1, 2, or 3 pairs of electrons. Nitrogen gas (N₂) has a triple bond - three pairs of shared electrons - making it very stable.',
      highlights: [],
      camera: { position: [0, 0, 4] }
    },
    {
      title: 'Molecules',
      view: 'reaction',
      reactionId: 'water-formation',
      stage: 3,
      narration: 'When atoms bond together, they form molecules. Water (H₂O) is a molecule made of 2 hydrogen atoms bonded to 1 oxygen atom.',
      highlights: [],
      camera: { position: [0, 0, 5] }
    }
  ]
};

export const simpleReactions = {
  id: 'simple-reactions',
  title: 'Simple Chemical Reactions',
  level: 'basic',
  duration: 8,
  description: 'Watch step-by-step how chemical reactions work.',
  steps: [
    {
      title: 'What is a Reaction?',
      view: 'reaction',
      reactionId: 'water-formation',
      stage: 0,
      narration: 'A chemical reaction is when substances combine or break apart to form new substances. The starting materials are called reactants.',
      highlights: [],
      camera: { position: [0, 0, 6] }
    },
    {
      title: 'Reactants',
      view: 'reaction',
      reactionId: 'water-formation',
      stage: 0,
      narration: 'In water formation, hydrogen gas (H₂) and oxygen gas (O₂) are the reactants. They will combine to form water.',
      highlights: [],
      camera: { position: [0, 0, 6] }
    },
    {
      title: 'Breaking Bonds',
      view: 'reaction',
      reactionId: 'water-formation',
      stage: 1,
      narration: 'Energy is needed to break the bonds in the reactant molecules. The atoms separate and rearrange.',
      highlights: [],
      camera: { position: [0, 0, 6] }
    },
    {
      title: 'Forming New Bonds',
      view: 'reaction',
      reactionId: 'water-formation',
      stage: 2,
      narration: 'New bonds form between the atoms. Hydrogen atoms bond with oxygen to create water molecules.',
      highlights: [],
      camera: { position: [0, 0, 6] }
    },
    {
      title: 'Products',
      view: 'reaction',
      reactionId: 'water-formation',
      stage: 3,
      narration: 'The new substances formed are called products. Water (H₂O) is the product of this reaction: 2H₂ + O₂ → 2H₂O',
      highlights: [],
      camera: { position: [0, 0, 5] }
    },
    {
      title: 'Conservation of Mass',
      view: 'reaction',
      reactionId: 'water-formation',
      stage: 3,
      narration: 'In a chemical reaction, atoms are neither created nor destroyed. The same atoms that started as reactants end up in the products - just rearranged!',
      highlights: [],
      camera: { position: [0, 0, 5] }
    }
  ]
};

// Advanced tutorials for university level
export const quantumOrbitals = {
  id: 'quantum-orbitals',
  title: 'Quantum Orbitals',
  level: 'advanced',
  duration: 10,
  description: 'Explore the quantum mechanical model of electron orbitals.',
  steps: [
    {
      title: 'Beyond the Bohr Model',
      view: 'atom',
      element: 'H',
      orbitalMode: 'bohr',
      narration: 'The Bohr model shows electrons in circular orbits, but quantum mechanics reveals a more complex picture. Electrons exist in probability clouds called orbitals.',
      highlights: [],
      camera: { position: [0, 0, 4] }
    },
    {
      title: 'Quantum Orbitals',
      view: 'atom',
      element: 'H',
      orbitalMode: 'quantum',
      narration: 'In quantum mechanics, we can only predict the probability of finding an electron in a region. These probability regions are called orbitals.',
      highlights: [],
      camera: { position: [0, 0, 4] }
    },
    {
      title: 's Orbitals',
      view: 'atom',
      element: 'He',
      orbitalMode: 'quantum',
      narration: 's orbitals are spherical in shape. Each energy level has one s orbital that can hold up to 2 electrons. Helium has a filled 1s orbital.',
      highlights: [
        { target: 's-orbital', label: '1s Orbital', position: [0, 1, 0] }
      ],
      camera: { position: [0, 0, 4] }
    },
    {
      title: 'p Orbitals',
      view: 'atom',
      element: 'N',
      orbitalMode: 'quantum',
      narration: 'p orbitals have a dumbbell shape with two lobes. There are three p orbitals (px, py, pz) oriented along different axes, holding up to 6 electrons total.',
      highlights: [
        { target: 'p-orbital', label: '2p Orbitals', position: [1, 0, 0] }
      ],
      camera: { position: [2, 1, 4] }
    },
    {
      title: 'd Orbitals',
      view: 'atom',
      element: 'Fe',
      orbitalMode: 'quantum',
      narration: 'd orbitals have more complex cloverleaf shapes. There are five d orbitals per energy level, holding up to 10 electrons. They\'re key to transition metal chemistry.',
      highlights: [
        { target: 'd-orbital', label: '3d Orbitals', position: [1.5, 0.5, 0] }
      ],
      camera: { position: [2, 2, 5] }
    },
    {
      title: 'f Orbitals',
      view: 'atom',
      element: 'U',
      orbitalMode: 'quantum',
      narration: 'f orbitals are the most complex, with seven orbitals holding up to 14 electrons. They\'re found in lanthanides and actinides like uranium.',
      highlights: [],
      camera: { position: [2, 2, 6] }
    },
    {
      title: 'Electron Configuration',
      view: 'atom',
      element: 'Ar',
      orbitalMode: 'quantum',
      narration: 'Electron configuration notation (like 1s² 2s² 2p⁶ 3s² 3p⁶ for Argon) describes which orbitals contain electrons and how many.',
      highlights: [],
      camera: { position: [0, 0, 5] }
    }
  ]
};

export const electronConfiguration = {
  id: 'electron-configuration',
  title: 'Electron Configuration Rules',
  level: 'advanced',
  duration: 12,
  description: 'Master the Aufbau principle, Hund\'s rule, and Pauli exclusion.',
  steps: [
    {
      title: 'The Aufbau Principle',
      view: 'atom',
      element: 'C',
      orbitalMode: 'quantum',
      narration: 'The Aufbau (building-up) principle states that electrons fill orbitals starting from lowest energy to highest. 1s fills before 2s, 2s before 2p, and so on.',
      highlights: [],
      camera: { position: [0, 0, 4] }
    },
    {
      title: 'Energy Level Order',
      view: 'atom',
      element: 'Ca',
      orbitalMode: 'quantum',
      narration: 'The filling order is: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s... Notice that 4s fills before 3d due to energy level overlap.',
      highlights: [],
      camera: { position: [0, 0, 5] }
    },
    {
      title: 'Pauli Exclusion Principle',
      view: 'atom',
      element: 'He',
      orbitalMode: 'quantum',
      narration: 'The Pauli exclusion principle states that no two electrons can have the same set of quantum numbers. Each orbital can hold at most 2 electrons with opposite spins.',
      highlights: [],
      camera: { position: [0, 0, 4] }
    },
    {
      title: 'Hund\'s Rule',
      view: 'atom',
      element: 'N',
      orbitalMode: 'quantum',
      narration: 'Hund\'s rule states that electrons fill orbitals of equal energy singly before pairing. Nitrogen\'s three 2p electrons each occupy a different 2p orbital.',
      highlights: [],
      camera: { position: [0, 0, 4] }
    },
    {
      title: 'Exceptions',
      view: 'atom',
      element: 'Cr',
      orbitalMode: 'quantum',
      narration: 'Some elements have unexpected configurations for extra stability. Chromium is [Ar] 3d⁵ 4s¹ instead of 3d⁴ 4s² because half-filled d orbitals are especially stable.',
      highlights: [],
      camera: { position: [0, 0, 5] }
    },
    {
      title: 'Noble Gas Notation',
      view: 'atom',
      element: 'Fe',
      orbitalMode: 'quantum',
      narration: 'Noble gas notation abbreviates configurations. Iron is [Ar] 3d⁶ 4s², where [Ar] represents argon\'s configuration (1s² 2s² 2p⁶ 3s² 3p⁶).',
      highlights: [],
      camera: { position: [0, 0, 5] }
    }
  ]
};

export const nuclearChemistry = {
  id: 'nuclear-chemistry',
  title: 'Nuclear Chemistry',
  level: 'advanced',
  duration: 10,
  description: 'Understand fission, fusion, and radioactive decay.',
  steps: [
    {
      title: 'The Nucleus',
      view: 'atom',
      element: 'U',
      narration: 'Nuclear chemistry deals with the nucleus - protons and neutrons. Unlike chemical reactions involving electrons, nuclear reactions involve changes to the nucleus itself.',
      highlights: [],
      camera: { position: [0, 0, 5] }
    },
    {
      title: 'Nuclear Fission',
      view: 'reaction',
      reactionId: 'uranium-fission',
      stage: 0,
      narration: 'Nuclear fission splits heavy nuclei into smaller fragments. Uranium-235 can absorb a neutron and split, releasing enormous energy plus more neutrons.',
      highlights: [],
      camera: { position: [0, 0, 6] }
    },
    {
      title: 'Chain Reaction',
      view: 'reaction',
      reactionId: 'uranium-fission',
      stage: 2,
      narration: 'The neutrons released can trigger more fission events, creating a chain reaction. This is the basis for nuclear power plants and atomic weapons.',
      highlights: [],
      camera: { position: [0, 0, 6] }
    },
    {
      title: 'Nuclear Fusion',
      view: 'reaction',
      reactionId: 'hydrogen-fusion',
      stage: 0,
      narration: 'Nuclear fusion combines light nuclei to form heavier ones. Hydrogen isotopes can fuse to form helium, releasing energy. This powers the sun and stars.',
      highlights: [],
      camera: { position: [0, 0, 6] }
    },
    {
      title: 'Fusion Energy',
      view: 'reaction',
      reactionId: 'hydrogen-fusion',
      stage: 2,
      narration: 'Fusion releases even more energy per unit mass than fission. Scientists are working to harness fusion as a clean energy source on Earth.',
      highlights: [],
      camera: { position: [0, 0, 6] }
    },
    {
      title: 'Alpha Decay',
      view: 'reaction',
      reactionId: 'alpha-decay',
      narration: 'Alpha decay emits an alpha particle (2 protons + 2 neutrons). The parent nucleus loses 2 protons and 2 neutrons, transmuting into a different element.',
      highlights: [],
      camera: { position: [0, 0, 6] }
    },
    {
      title: 'Beta Decay',
      view: 'reaction',
      reactionId: 'beta-decay',
      narration: 'Beta decay converts a neutron to a proton (or vice versa), emitting an electron or positron. Carbon-14 undergoes beta decay to become nitrogen-14.',
      highlights: [],
      camera: { position: [0, 0, 6] }
    }
  ]
};

// All tutorials array
export const TUTORIALS = [
  // Basic level
  atomicStructure,
  periodicNavigation,
  chemicalBondingBasics,
  simpleReactions,
  // Advanced level
  quantumOrbitals,
  electronConfiguration,
  nuclearChemistry
];

// Helper functions
export const getTutorialById = (id) => TUTORIALS.find(t => t.id === id);

export const getTutorialsByLevel = (level) => TUTORIALS.filter(t => t.level === level);

export const getBasicTutorials = () => getTutorialsByLevel('basic');

export const getAdvancedTutorials = () => getTutorialsByLevel('advanced');
