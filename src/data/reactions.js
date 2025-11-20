export const REACTIONS = [
    {
        id: 'water-formation',
        name: 'Water Formation',
        type: 'Chemical',
        description: '2H₂ + O₂ → 2H₂O',
        stages: [
            {
                atoms: [
                    { id: 'h1', element: 'H', position: [-2, 0, 0] }, { id: 'h2', element: 'H', position: [-2.5, 0.5, 0] },
                    { id: 'h3', element: 'H', position: [-2, -1, 0] }, { id: 'h4', element: 'H', position: [-2.5, -1.5, 0] },
                    { id: 'o1', element: 'O', position: [2, 0, 0] }, { id: 'o2', element: 'O', position: [2.8, 0, 0] }
                ],
                bonds: [
                    { start: 'h1', end: 'h2' },
                    { start: 'h3', end: 'h4' },
                    { start: 'o1', end: 'o2' }
                ]
            },
            {
                atoms: [
                    { id: 'h1', element: 'H', position: [-0.5, 0, 0] }, { id: 'h2', element: 'H', position: [-1, 0.5, 0] },
                    { id: 'h3', element: 'H', position: [-0.5, -1, 0] }, { id: 'h4', element: 'H', position: [-1, -1.5, 0] },
                    { id: 'o1', element: 'O', position: [0.5, 0, 0] }, { id: 'o2', element: 'O', position: [1.3, 0, 0] }
                ],
                bonds: [
                    { start: 'h1', end: 'h2' },
                    { start: 'h3', end: 'h4' },
                    { start: 'o1', end: 'o2' }
                ]
            },
            {
                atoms: [
                    { id: 'h1', element: 'H', position: [-1.8, 0.8, 0] }, { id: 'h2', element: 'H', position: [-0.2, 0.8, 0] },
                    { id: 'h3', element: 'H', position: [0.2, -0.8, 0] }, { id: 'h4', element: 'H', position: [1.8, -0.8, 0] },
                    { id: 'o1', element: 'O', position: [-1, 0.5, 0] }, { id: 'o2', element: 'O', position: [1, -0.5, 0] }
                ],
                bonds: [
                    { start: 'o1', end: 'h1' }, { start: 'o1', end: 'h2' },
                    { start: 'o2', end: 'h3' }, { start: 'o2', end: 'h4' }
                ]
            }
        ]
    },
    {
        id: 'salt-formation',
        name: 'Salt Formation',
        type: 'Chemical',
        description: '2Na + Cl₂ → 2NaCl',
        stages: [
            {
                atoms: [
                    { id: 'na1', element: 'Na', position: [-2, 1, 0] },
                    { id: 'na2', element: 'Na', position: [-2, -1, 0] },
                    { id: 'cl1', element: 'Cl', position: [2, 0, 0] }, { id: 'cl2', element: 'Cl', position: [3, 0, 0] }
                ],
                bonds: [
                    { start: 'cl1', end: 'cl2' }
                ]
            },
            {
                atoms: [
                    { id: 'na1', element: 'Na', position: [-0.5, 0.5, 0] },
                    { id: 'na2', element: 'Na', position: [-0.5, -0.5, 0] },
                    { id: 'cl1', element: 'Cl', position: [0.5, 0.5, 0] }, { id: 'cl2', element: 'Cl', position: [0.5, -0.5, 0] }
                ],
                bonds: [
                    { start: 'cl1', end: 'cl2' }
                ]
            },
            {
                atoms: [
                    { id: 'na1', element: 'Na', position: [-1, 1, 0] },
                    { id: 'na2', element: 'Na', position: [1, -1, 0] },
                    { id: 'cl1', element: 'Cl', position: [-0.2, 1, 0] }, { id: 'cl2', element: 'Cl', position: [1.8, -1, 0] }
                ],
                bonds: [
                    { start: 'na1', end: 'cl1' },
                    { start: 'na2', end: 'cl2' }
                ]
            }
        ]
    },
    {
        id: 'methane-combustion',
        name: 'Methane Combustion',
        type: 'Chemical',
        description: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
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
                    { start: 'c1', end: 'h1' }, { start: 'c1', end: 'h2' }, { start: 'c1', end: 'h3' }, { start: 'c1', end: 'h4' },
                    { start: 'o1', end: 'o2' },
                    { start: 'o3', end: 'o4' }
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
                    { start: 'c1', end: 'o1' }, { start: 'c1', end: 'o2' },
                    { start: 'o3', end: 'h1' }, { start: 'o3', end: 'h2' },
                    { start: 'o4', end: 'h3' }, { start: 'o4', end: 'h4' }
                ]
            }
        ]
    },
    {
        id: 'fission',
        name: 'Nuclear Fission (U-235)',
        type: 'Nuclear',
        description: 'n + U-235 → Ba-141 + Kr-92 + 3n',
        stages: [
            {
                atoms: [
                    { id: 'u1', element: 'U', position: [0, 0, 0] },
                    { id: 'n_in', element: 'H', position: [-5, 0, 0] }, // Neutron represented as H for now
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
    }
];

export const MOLECULES = {
    'H2O': { name: 'Water', formula: 'H2O', atoms: { H: 2, O: 1 } },
    'CH4': { name: 'Methane', formula: 'CH4', atoms: { C: 1, H: 4 } },
    'CO2': { name: 'Carbon Dioxide', formula: 'CO2', atoms: { C: 1, O: 2 } },
    'NH3': { name: 'Ammonia', formula: 'NH3', atoms: { N: 1, H: 3 } },
    'O2': { name: 'Oxygen Gas', formula: 'O2', atoms: { O: 2 } },
    'H2': { name: 'Hydrogen Gas', formula: 'H2', atoms: { H: 2 } }
};
