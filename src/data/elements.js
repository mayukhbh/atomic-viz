export const ELEMENTS = {
  // Period 1
  H: {
    symbol: 'H', name: 'Hydrogen', atomicNumber: 1, category: 'Nonmetal', color: '#FFFFFF',
    radius: 0.5, mass: 1.008, electrons: [1], electronConfiguration: '1s¹', block: 's',
    electronegativity: 2.20, xpos: 1, ypos: 1,
    description: {
      basic: "The lightest and most abundant element in the universe, fueling stars.",
      advanced: "Hydrogen exhibits unique bonding properties due to its single electron. It can form covalent bonds, act as H⁺ in acids, or H⁻ in metal hydrides. Critical in fuel cells and ammonia synthesis."
    }
  },
  He: {
    symbol: 'He', name: 'Helium', atomicNumber: 2, category: 'Noble Gas', color: '#D9FFFF',
    radius: 0.5, mass: 4.0026, electrons: [2], electronConfiguration: '1s²', block: 's',
    electronegativity: null, xpos: 18, ypos: 1,
    description: {
      basic: "A colorless, odorless, inert gas. Used in balloons and cryogenics.",
      advanced: "Helium's closed 1s² shell gives it the highest ionization energy of any element. Its superfluid state below 2.17K exhibits zero viscosity and quantum mechanical effects on a macroscopic scale."
    }
  },

  // Period 2
  Li: {
    symbol: 'Li', name: 'Lithium', atomicNumber: 3, category: 'Alkali Metal', color: '#CC80FF',
    radius: 0.6, mass: 6.94, electrons: [2, 1], electronConfiguration: '1s² 2s¹', block: 's',
    electronegativity: 0.98, xpos: 1, ypos: 2,
    description: {
      basic: "The lightest metal, highly reactive and used in rechargeable batteries.",
      advanced: "Lithium's small ionic radius leads to high charge density, enabling efficient intercalation in battery electrodes. It exhibits diagonal relationship with Mg due to similar charge/radius ratios."
    }
  },
  Be: {
    symbol: 'Be', name: 'Beryllium', atomicNumber: 4, category: 'Alkaline Earth', color: '#C2FF00',
    radius: 0.6, mass: 9.0122, electrons: [2, 2], electronConfiguration: '1s² 2s²', block: 's',
    electronegativity: 1.57, xpos: 2, ypos: 2,
    description: {
      basic: "A strong, lightweight metal used in aerospace and X-ray windows.",
      advanced: "Beryllium's high charge/radius ratio leads to covalent character in its compounds. Its low X-ray absorption makes it ideal for X-ray windows. Toxic due to immune sensitization."
    }
  },
  B: {
    symbol: 'B', name: 'Boron', atomicNumber: 5, category: 'Metalloid', color: '#FFB5B5',
    radius: 0.7, mass: 10.81, electrons: [2, 3], electronConfiguration: '1s² 2s² 2p¹', block: 'p',
    electronegativity: 2.04, xpos: 13, ypos: 2,
    description: {
      basic: "A metalloid found in borax and used to make heat-resistant glass.",
      advanced: "Boron's electron deficiency leads to unique three-center two-electron bonds in boranes. Its icosahedral clusters form the basis of superhard materials like B₄C."
    }
  },
  C: {
    symbol: 'C', name: 'Carbon', atomicNumber: 6, category: 'Nonmetal', color: '#909090',
    radius: 0.7, mass: 12.011, electrons: [2, 4], electronConfiguration: '1s² 2s² 2p²', block: 'p',
    electronegativity: 2.55, xpos: 14, ypos: 2,
    description: {
      basic: "The basis of all known life, existing as diamond, graphite, and coal.",
      advanced: "Carbon's ability to form four covalent bonds enables vast molecular diversity. sp³ hybridization yields tetrahedral geometry (diamond), sp² gives planar structures (graphene), sp creates linear molecules (alkynes)."
    }
  },
  N: {
    symbol: 'N', name: 'Nitrogen', atomicNumber: 7, category: 'Nonmetal', color: '#3050F8',
    radius: 0.7, mass: 14.007, electrons: [2, 5], electronConfiguration: '1s² 2s² 2p³', block: 'p',
    electronegativity: 3.04, xpos: 15, ypos: 2,
    description: {
      basic: "Makes up 78% of Earth's atmosphere and is essential for DNA.",
      advanced: "Nitrogen's triple bond (N≡N) has a bond dissociation energy of 945 kJ/mol, explaining its inertness. Biological nitrogen fixation requires nitrogenase enzymes with Fe-Mo cofactors."
    }
  },
  O: {
    symbol: 'O', name: 'Oxygen', atomicNumber: 8, category: 'Nonmetal', color: '#FF0D0D',
    radius: 0.7, mass: 15.999, electrons: [2, 6], electronConfiguration: '1s² 2s² 2p⁴', block: 'p',
    electronegativity: 3.44, xpos: 16, ypos: 2,
    description: {
      basic: "Essential for respiration and combustion, the third most abundant element.",
      advanced: "Oxygen's high electronegativity makes it a powerful oxidizer. Molecular O₂ is paramagnetic with two unpaired electrons, explained by molecular orbital theory. Forms reactive oxygen species critical in biology."
    }
  },
  F: {
    symbol: 'F', name: 'Fluorine', atomicNumber: 9, category: 'Halogen', color: '#90E050',
    radius: 0.7, mass: 18.998, electrons: [2, 7], electronConfiguration: '1s² 2s² 2p⁵', block: 'p',
    electronegativity: 3.98, xpos: 17, ypos: 2,
    description: {
      basic: "The most reactive and electronegative element, used in toothpaste.",
      advanced: "Fluorine's extreme electronegativity (3.98) stems from its small radius and high effective nuclear charge. Forms the strongest single bonds to carbon. HF is a weak acid due to strong H-F bond."
    }
  },
  Ne: {
    symbol: 'Ne', name: 'Neon', atomicNumber: 10, category: 'Noble Gas', color: '#B3E3F5',
    radius: 0.6, mass: 20.180, electrons: [2, 8], electronConfiguration: '1s² 2s² 2p⁶', block: 'p',
    electronegativity: null, xpos: 18, ypos: 2,
    description: {
      basic: "Glows reddish-orange in vacuum discharge tubes, used in signs.",
      advanced: "Neon's complete octet provides exceptional stability. Its emission spectrum features strong lines at 585nm and 640nm. Liquid neon has 40x the refrigerating capacity per volume compared to liquid helium."
    }
  },

  // Period 3
  Na: {
    symbol: 'Na', name: 'Sodium', atomicNumber: 11, category: 'Alkali Metal', color: '#AB5CF2',
    radius: 0.8, mass: 22.990, electrons: [2, 8, 1], electronConfiguration: '1s² 2s² 2p⁶ 3s¹', block: 's',
    electronegativity: 0.93, xpos: 1, ypos: 3,
    description: {
      basic: "A soft, reactive metal, essential for nerve function (as ions).",
      advanced: "Sodium's low ionization energy (495.8 kJ/mol) makes it highly reactive. The Na⁺/K⁺-ATPase pump maintains electrochemical gradients essential for nerve impulse transmission and cellular function."
    }
  },
  Mg: {
    symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, category: 'Alkaline Earth', color: '#8AFF00',
    radius: 0.8, mass: 24.305, electrons: [2, 8, 2], electronConfiguration: '1s² 2s² 2p⁶ 3s²', block: 's',
    electronegativity: 1.31, xpos: 2, ypos: 3,
    description: {
      basic: "Light and strong, burns with a brilliant white light.",
      advanced: "Magnesium is the central atom in chlorophyll's porphyrin ring. Its Mg²⁺ ion is essential for ATP function and enzyme catalysis. The Grignard reagent (RMgX) is fundamental in organic synthesis."
    }
  },
  Al: {
    symbol: 'Al', name: 'Aluminium', atomicNumber: 13, category: 'Post-transition Metal', color: '#BFA6A6',
    radius: 0.8, mass: 26.982, electrons: [2, 8, 3], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p¹', block: 'p',
    electronegativity: 1.61, xpos: 13, ypos: 3,
    description: {
      basic: "The most abundant metal in Earth's crust, lightweight and corrosion-resistant.",
      advanced: "Aluminium's protective Al₂O₃ layer prevents further oxidation. The Hall-Héroult process extracts Al via electrolysis of Al₂O₃ in molten cryolite. Al³⁺ adopts octahedral coordination in aqueous solution."
    }
  },
  Si: {
    symbol: 'Si', name: 'Silicon', atomicNumber: 14, category: 'Metalloid', color: '#F0C8A0',
    radius: 0.8, mass: 28.085, electrons: [2, 8, 4], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p²', block: 'p',
    electronegativity: 1.90, xpos: 14, ypos: 3,
    description: {
      basic: "The basis of modern electronics and computer chips.",
      advanced: "Silicon's band gap (1.12 eV) enables semiconductor behavior. Doping with Group 13 (p-type) or Group 15 (n-type) elements creates charge carriers. Silicones feature Si-O-Si backbone with organic groups."
    }
  },
  P: {
    symbol: 'P', name: 'Phosphorus', atomicNumber: 15, category: 'Nonmetal', color: '#FF8000',
    radius: 0.8, mass: 30.974, electrons: [2, 8, 5], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p³', block: 'p',
    electronegativity: 2.19, xpos: 15, ypos: 3,
    description: {
      basic: "Highly reactive, essential for life (ATP, DNA) and used in matches.",
      advanced: "Phosphorus exists as white P₄ (reactive), red (polymeric), and black (layered) allotropes. The phosphate ester linkages in DNA/RNA and the high-energy P-O bonds in ATP are central to biochemistry."
    }
  },
  S: {
    symbol: 'S', name: 'Sulfur', atomicNumber: 16, category: 'Nonmetal', color: '#FFFF30',
    radius: 0.8, mass: 32.06, electrons: [2, 8, 6], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁴', block: 'p',
    electronegativity: 2.58, xpos: 16, ypos: 3,
    description: {
      basic: "A yellow solid, known for its rotten egg smell (in compounds).",
      advanced: "Sulfur forms cyclic S₈ rings in its stable form. Disulfide bonds (S-S) stabilize protein tertiary structure. Sulfur can expand its octet using 3d orbitals, forming compounds like SF₆."
    }
  },
  Cl: {
    symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, category: 'Halogen', color: '#1FF01F',
    radius: 0.8, mass: 35.45, electrons: [2, 8, 7], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁵', block: 'p',
    electronegativity: 3.16, xpos: 17, ypos: 3,
    description: {
      basic: "A toxic yellow-green gas, used as a disinfectant and in PVC.",
      advanced: "Chlorine's oxidation states range from -1 to +7. Hypochlorous acid (HOCl) is the active disinfectant species. Industrial chlor-alkali process produces Cl₂, NaOH, and H₂ via electrolysis."
    }
  },
  Ar: {
    symbol: 'Ar', name: 'Argon', atomicNumber: 18, category: 'Noble Gas', color: '#80D1E3',
    radius: 0.7, mass: 39.948, electrons: [2, 8, 8], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶', block: 'p',
    electronegativity: null, xpos: 18, ypos: 3,
    description: {
      basic: "The third most abundant gas in the atmosphere, used in welding.",
      advanced: "Argon's complete 3p subshell provides chemical inertness. Used to create inert atmospheres in welding and semiconductor manufacturing. ⁴⁰Ar/³⁹Ar dating is used for geological age determination."
    }
  },

  // Period 4
  K: {
    symbol: 'K', name: 'Potassium', atomicNumber: 19, category: 'Alkali Metal', color: '#8F40D4',
    radius: 0.9, mass: 39.098, electrons: [2, 8, 8, 1], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹', block: 's',
    electronegativity: 0.82, xpos: 1, ypos: 4,
    description: {
      basic: "A soft metal that reacts violently with water, vital for plant growth.",
      advanced: "Potassium's ionic radius (138 pm) is key to its biological selectivity in ion channels. K⁺ maintains resting membrane potential in neurons. Potassium-40 undergoes beta decay used in K-Ar dating."
    }
  },
  Ca: {
    symbol: 'Ca', name: 'Calcium', atomicNumber: 20, category: 'Alkaline Earth', color: '#3DFF00',
    radius: 0.9, mass: 40.078, electrons: [2, 8, 8, 2], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s²', block: 's',
    electronegativity: 1.00, xpos: 2, ypos: 4,
    description: {
      basic: "Essential for strong bones and teeth, found in limestone.",
      advanced: "Calcium's Ca²⁺ ion acts as a ubiquitous second messenger in cell signaling. Hydroxyapatite [Ca₁₀(PO₄)₆(OH)₂] forms bone mineral. Calcium carbonate biomineralization produces shells and coral."
    }
  },
  Sc: {
    symbol: 'Sc', name: 'Scandium', atomicNumber: 21, category: 'Transition Metal', color: '#E6E6E6',
    radius: 0.9, mass: 44.956, electrons: [2, 8, 9, 2], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹ 4s²', block: 'd',
    electronegativity: 1.36, xpos: 3, ypos: 4,
    description: {
      basic: "A rare earth element used in high-strength aluminium alloys.",
      advanced: "Scandium's only stable oxidation state is +3, with a [Ar] core. Sc₂O₃ has applications in solid oxide fuel cells. Al-Sc alloys show precipitation hardening with Al₃Sc precipitates."
    }
  },
  Ti: {
    symbol: 'Ti', name: 'Titanium', atomicNumber: 22, category: 'Transition Metal', color: '#BFC2C7',
    radius: 0.9, mass: 47.867, electrons: [2, 8, 10, 2], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d² 4s²', block: 'd',
    electronegativity: 1.54, xpos: 4, ypos: 4,
    description: {
      basic: "Strong as steel but much lighter, used in aerospace and implants.",
      advanced: "Titanium's biocompatibility stems from stable TiO₂ surface layer. Ti alloys like Ti-6Al-4V are used in aerospace. TiCl₄ is a key precursor in Ziegler-Natta polymerization catalysis."
    }
  },
  V: {
    symbol: 'V', name: 'Vanadium', atomicNumber: 23, category: 'Transition Metal', color: '#A6A6AB',
    radius: 0.9, mass: 50.942, electrons: [2, 8, 11, 2], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d³ 4s²', block: 'd',
    electronegativity: 1.63, xpos: 5, ypos: 4,
    description: {
      basic: "Used to strengthen steel and in flow batteries.",
      advanced: "Vanadium exhibits oxidation states from +2 to +5 with distinctive colors. Vanadium redox batteries use V²⁺/V³⁺ and VO²⁺/VO₂⁺ couples. V₂O₅ catalyzes SO₂ to SO₃ in the contact process."
    }
  },
  Cr: {
    symbol: 'Cr', name: 'Chromium', atomicNumber: 24, category: 'Transition Metal', color: '#8A99C7',
    radius: 0.9, mass: 51.996, electrons: [2, 8, 13, 1], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s¹', block: 'd',
    electronegativity: 1.66, xpos: 6, ypos: 4,
    description: {
      basic: "Hard and shiny, used in stainless steel and chrome plating.",
      advanced: "Chromium's half-filled 3d⁵ configuration provides stability. Cr₂O₃ provides corrosion resistance in stainless steel. CrO₄²⁻ (yellow) and Cr₂O₇²⁻ (orange) are strong oxidizers used in organic synthesis."
    }
  },
  Mn: {
    symbol: 'Mn', name: 'Manganese', atomicNumber: 25, category: 'Transition Metal', color: '#9C7AC7',
    radius: 0.9, mass: 54.938, electrons: [2, 8, 13, 2], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s²', block: 'd',
    electronegativity: 1.55, xpos: 7, ypos: 4,
    description: {
      basic: "Essential for steel production and biological functions.",
      advanced: "Manganese spans oxidation states from +2 to +7. MnO₄⁻ (permanganate) is a powerful oxidizer. The Mn₄CaO₅ cluster in photosystem II catalyzes water oxidation in photosynthesis."
    }
  },
  Fe: {
    symbol: 'Fe', name: 'Iron', atomicNumber: 26, category: 'Transition Metal', color: '#E06633',
    radius: 0.9, mass: 55.845, electrons: [2, 8, 14, 2], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²', block: 'd',
    electronegativity: 1.83, xpos: 8, ypos: 4,
    description: {
      basic: "The most used metal, forms Earth's core and carries oxygen in blood.",
      advanced: "Iron exhibits variable oxidation states (+2, +3) crucial for biological redox chemistry. Hemoglobin's Fe²⁺ binds O₂ cooperatively. Fe-S clusters are essential in electron transport chains."
    }
  },
  Co: {
    symbol: 'Co', name: 'Cobalt', atomicNumber: 27, category: 'Transition Metal', color: '#F090A0',
    radius: 0.9, mass: 58.933, electrons: [2, 8, 15, 2], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁷ 4s²', block: 'd',
    electronegativity: 1.88, xpos: 9, ypos: 4,
    description: {
      basic: "Used in superalloys, magnets, and rechargeable batteries.",
      advanced: "Cobalt's strong crystal field stabilization enables stable low-spin complexes. Vitamin B₁₂ contains a Co-C bond - a rare biological organometallic. LiCoO₂ is a common Li-ion battery cathode."
    }
  },
  Ni: {
    symbol: 'Ni', name: 'Nickel', atomicNumber: 28, category: 'Transition Metal', color: '#50D050',
    radius: 0.9, mass: 58.693, electrons: [2, 8, 16, 2], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁸ 4s²', block: 'd',
    electronegativity: 1.91, xpos: 10, ypos: 4,
    description: {
      basic: "Resistant to corrosion, used in coins and stainless steel.",
      advanced: "Nickel forms square planar d⁸ complexes. Raney nickel catalyzes hydrogenation reactions. Nickel-metal hydride (NiMH) batteries use LaNi₅ alloy for hydrogen storage."
    }
  },
  Cu: {
    symbol: 'Cu', name: 'Copper', atomicNumber: 29, category: 'Transition Metal', color: '#C88033',
    radius: 0.9, mass: 63.546, electrons: [2, 8, 18, 1], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s¹', block: 'd',
    electronegativity: 1.90, xpos: 11, ypos: 4,
    description: {
      basic: "Excellent conductor of electricity and heat, one of the first metals used by humans.",
      advanced: "Copper's filled d¹⁰ shell leads to its characteristic color from d→s transitions. Cu⁺/Cu²⁺ redox cycling is essential in cytochrome c oxidase. Copper's 3d¹⁰4s¹ configuration minimizes electron-electron repulsion."
    }
  },
  Zn: {
    symbol: 'Zn', name: 'Zinc', atomicNumber: 30, category: 'Transition Metal', color: '#7D80B0',
    radius: 0.9, mass: 65.38, electrons: [2, 8, 18, 2], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s²', block: 'd',
    electronegativity: 1.65, xpos: 12, ypos: 4,
    description: {
      basic: "Used to galvanize steel and in brass alloys.",
      advanced: "Zinc's filled d¹⁰ shell makes it redox-inactive, ideal for structural roles in enzymes. Zn²⁺ in carbonic anhydrase activates water for CO₂ hydration. Zinc finger proteins bind DNA."
    }
  },
  Ga: {
    symbol: 'Ga', name: 'Gallium', atomicNumber: 31, category: 'Post-transition Metal', color: '#C28F8F',
    radius: 0.9, mass: 69.723, electrons: [2, 8, 18, 3], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p¹', block: 'p',
    electronegativity: 1.81, xpos: 13, ypos: 4,
    description: {
      basic: "Melts in your hand, used in semiconductors and LEDs.",
      advanced: "Gallium's low melting point (29.76°C) results from unusual crystal structure. GaAs has higher electron mobility than Si. GaN enables blue LEDs and high-power electronics."
    }
  },
  Ge: {
    symbol: 'Ge', name: 'Germanium', atomicNumber: 32, category: 'Metalloid', color: '#668F8F',
    radius: 0.9, mass: 72.63, electrons: [2, 8, 18, 4], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p²', block: 'p',
    electronegativity: 2.01, xpos: 14, ypos: 4,
    description: {
      basic: "A semiconductor used in fiber optics and solar cells.",
      advanced: "Germanium's smaller band gap (0.67 eV) vs silicon enables infrared detection. GeO₂ glass has high refractive index for fiber optics. Ge was the first transistor material before silicon."
    }
  },
  As: {
    symbol: 'As', name: 'Arsenic', atomicNumber: 33, category: 'Metalloid', color: '#BD80E3',
    radius: 0.9, mass: 74.922, electrons: [2, 8, 18, 5], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p³', block: 'p',
    electronegativity: 2.18, xpos: 15, ypos: 4,
    description: {
      basic: "Historically a poison, but also used in semiconductors.",
      advanced: "Arsenic mimics phosphorus biochemically, disrupting ATP synthesis by forming unstable arsenate esters. GaAs semiconductors enable microwave devices. Arsenic trioxide treats acute promyelocytic leukemia."
    }
  },
  Se: {
    symbol: 'Se', name: 'Selenium', atomicNumber: 34, category: 'Nonmetal', color: '#FFA100',
    radius: 0.9, mass: 78.96, electrons: [2, 8, 18, 6], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁴', block: 'p',
    electronegativity: 2.55, xpos: 16, ypos: 4,
    description: {
      basic: "Used in photocopiers and as a dietary supplement.",
      advanced: "Selenium's photoconductivity enabled early xerography. Selenocysteine is the 21st amino acid, essential in glutathione peroxidase. Se toxicity is narrow - essential but toxic at high levels."
    }
  },
  Br: {
    symbol: 'Br', name: 'Bromine', atomicNumber: 35, category: 'Halogen', color: '#A62929',
    radius: 0.9, mass: 79.904, electrons: [2, 8, 18, 7], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁵', block: 'p',
    electronegativity: 2.96, xpos: 17, ypos: 4,
    description: {
      basic: "A reddish-brown liquid, used in flame retardants.",
      advanced: "Bromine is the only liquid nonmetal at room temperature. Brominated flame retardants work by releasing HBr to quench radicals. Bromine is extracted from seawater via Cl₂ oxidation."
    }
  },
  Kr: {
    symbol: 'Kr', name: 'Krypton', atomicNumber: 36, category: 'Noble Gas', color: '#5CB8D1',
    radius: 0.8, mass: 83.798, electrons: [2, 8, 18, 8], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶', block: 'p',
    electronegativity: 3.00, xpos: 18, ypos: 4,
    description: {
      basic: "Used in high-speed photography flashes and fluorescent lights.",
      advanced: "Krypton forms KrF₂ under extreme conditions. ⁸⁶Kr spectral line formerly defined the meter (1960-1983). Kr-based excimer lasers (KrF at 248nm) are used in lithography."
    }
  },

  // Period 5
  Rb: {
    symbol: 'Rb', name: 'Rubidium', atomicNumber: 37, category: 'Alkali Metal', color: '#702EB0',
    radius: 1.0, mass: 85.468, electrons: [2, 8, 18, 8, 1], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 5s¹', block: 's',
    electronegativity: 0.82, xpos: 1, ypos: 5,
    description: {
      basic: "A soft, silvery metal that ignites spontaneously in air.",
      advanced: "Rubidium atoms cooled to nanokelvin temperatures form Bose-Einstein condensates. ⁸⁷Rb is used in atomic clocks. Rb-Sr dating determines geological ages via ⁸⁷Rb→⁸⁷Sr decay."
    }
  },
  Sr: {
    symbol: 'Sr', name: 'Strontium', atomicNumber: 38, category: 'Alkaline Earth', color: '#00FF00',
    radius: 1.0, mass: 87.62, electrons: [2, 8, 18, 8, 2], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 5s²', block: 's',
    electronegativity: 0.95, xpos: 2, ypos: 5,
    description: {
      basic: "Produces brilliant red fireworks and flares.",
      advanced: "Strontium-90 (β⁻ emitter, t½=28.8y) is a dangerous fission product that concentrates in bones. SrTiO₃ is a model perovskite. Strontium ranelate treats osteoporosis."
    }
  },
  Y: {
    symbol: 'Y', name: 'Yttrium', atomicNumber: 39, category: 'Transition Metal', color: '#94FFFF',
    radius: 1.0, mass: 88.906, electrons: [2, 8, 18, 9, 2], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹ 5s²', block: 'd',
    electronegativity: 1.22, xpos: 3, ypos: 5,
    description: {
      basic: "Used in LED phosphors and superconductors.",
      advanced: "YBa₂Cu₃O₇ (YBCO) was the first superconductor above liquid nitrogen temperature (93K). Y₂O₃:Eu³⁺ is the red phosphor in displays. Yttrium is named after Ytterby, Sweden."
    }
  },
  Zr: {
    symbol: 'Zr', name: 'Zirconium', atomicNumber: 40, category: 'Transition Metal', color: '#94E0E0',
    radius: 1.0, mass: 91.224, electrons: [2, 8, 18, 10, 2], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d² 5s²', block: 'd',
    electronegativity: 1.33, xpos: 4, ypos: 5,
    description: {
      basic: "Used in nuclear reactors and artificial gemstones.",
      advanced: "Zirconium's low neutron absorption cross-section makes it ideal for nuclear fuel cladding. ZrO₂ (zirconia) is used in dental crowns and oxygen sensors. Zircon (ZrSiO₄) is used for U-Pb dating."
    }
  },
  Nb: {
    symbol: 'Nb', name: 'Niobium', atomicNumber: 41, category: 'Transition Metal', color: '#73C2C9',
    radius: 1.0, mass: 92.906, electrons: [2, 8, 18, 12, 1], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁴ 5s¹', block: 'd',
    electronegativity: 1.60, xpos: 5, ypos: 5,
    description: {
      basic: "A superconductor metal used in MRI machines.",
      advanced: "NbTi and Nb₃Sn are the primary superconductors in MRI magnets. Niobium's 4d⁴5s¹ configuration (not 4d³5s²) results from exchange stabilization. Ferroniobium strengthens steel."
    }
  },
  Mo: {
    symbol: 'Mo', name: 'Molybdenum', atomicNumber: 42, category: 'Transition Metal', color: '#54B5B5',
    radius: 1.0, mass: 95.95, electrons: [2, 8, 18, 13, 1], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁵ 5s¹', block: 'd',
    electronegativity: 2.16, xpos: 6, ypos: 5,
    description: {
      basic: "Strengthens steel and is essential for plant nitrogen fixation.",
      advanced: "Molybdenum's half-filled 4d⁵ provides stability. The FeMo-cofactor in nitrogenase contains Mo. MoS₂ is a lubricant due to weak van der Waals forces between layers. Mo is essential for several enzymes."
    }
  },
  Tc: {
    symbol: 'Tc', name: 'Technetium', atomicNumber: 43, category: 'Transition Metal', color: '#3B9E9E',
    radius: 1.0, mass: 98, electrons: [2, 8, 18, 13, 2], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁵ 5s²', block: 'd',
    electronegativity: 1.90, xpos: 7, ypos: 5,
    description: {
      basic: "The first artificially produced element, used in medical imaging.",
      advanced: "Technetium has no stable isotopes due to nuclear instability. ⁹⁹ᵐTc (t½=6h) is the most used medical radioisotope for SPECT imaging. Tc is produced from ⁹⁹Mo decay in 'moly cows'."
    }
  },
  Ru: {
    symbol: 'Ru', name: 'Ruthenium', atomicNumber: 44, category: 'Transition Metal', color: '#248F8F',
    radius: 1.0, mass: 101.07, electrons: [2, 8, 18, 15, 1], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁷ 5s¹', block: 'd',
    electronegativity: 2.20, xpos: 8, ypos: 5,
    description: {
      basic: "A hard platinum group metal used in electronics.",
      advanced: "Grubbs ruthenium catalysts enable olefin metathesis (Nobel 2005). RuO₂ is used in electrochemical capacitors. Ru complexes show photochemical activity for artificial photosynthesis."
    }
  },
  Rh: {
    symbol: 'Rh', name: 'Rhodium', atomicNumber: 45, category: 'Transition Metal', color: '#0A7D8C',
    radius: 1.0, mass: 102.91, electrons: [2, 8, 18, 16, 1], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁸ 5s¹', block: 'd',
    electronegativity: 2.28, xpos: 9, ypos: 5,
    description: {
      basic: "The most expensive precious metal, used in catalytic converters.",
      advanced: "Rhodium catalyzes CO and NOx reduction in automotive catalytic converters. Wilkinson's catalyst [RhCl(PPh₃)₃] revolutionized homogeneous hydrogenation. Rh-Pt alloys are used in glass manufacturing."
    }
  },
  Pd: {
    symbol: 'Pd', name: 'Palladium', atomicNumber: 46, category: 'Transition Metal', color: '#006985',
    radius: 1.0, mass: 106.42, electrons: [2, 8, 18, 18], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰', block: 'd',
    electronegativity: 2.20, xpos: 10, ypos: 5,
    description: {
      basic: "Absorbs large amounts of hydrogen, used in catalytic converters.",
      advanced: "Palladium's unique 4d¹⁰ ground state (no 5s electrons) enables hydrogen absorption up to 900× its volume. Pd-catalyzed cross-coupling (Suzuki, Heck) won the 2010 Nobel Prize in Chemistry."
    }
  },
  Ag: {
    symbol: 'Ag', name: 'Silver', atomicNumber: 47, category: 'Transition Metal', color: '#C0C0C0',
    radius: 1.0, mass: 107.87, electrons: [2, 8, 18, 18, 1], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s¹', block: 'd',
    electronegativity: 1.93, xpos: 11, ypos: 5,
    description: {
      basic: "The most conductive metal, used in jewelry and electronics.",
      advanced: "Silver has the highest electrical (6.3×10⁷ S/m) and thermal conductivity of any element. AgBr crystals enable photographic film. Ag nanoparticles have antimicrobial properties."
    }
  },
  Cd: {
    symbol: 'Cd', name: 'Cadmium', atomicNumber: 48, category: 'Transition Metal', color: '#FFD98F',
    radius: 1.0, mass: 112.41, electrons: [2, 8, 18, 18, 2], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s²', block: 'd',
    electronegativity: 1.69, xpos: 12, ypos: 5,
    description: {
      basic: "A toxic heavy metal, formerly used in batteries.",
      advanced: "Cadmium's toxicity arises from displacement of Zn²⁺ in enzymes and DNA-binding proteins. CdTe quantum dots have size-tunable emission. Cd is being phased out due to environmental concerns."
    }
  },
  In: {
    symbol: 'In', name: 'Indium', atomicNumber: 49, category: 'Post-transition Metal', color: '#A67573',
    radius: 1.0, mass: 114.82, electrons: [2, 8, 18, 18, 3], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p¹', block: 'p',
    electronegativity: 1.78, xpos: 13, ypos: 5,
    description: {
      basic: "A soft metal that makes a 'crying' sound when bent.",
      advanced: "Indium tin oxide (ITO) is the primary transparent conductor for touchscreens and LCDs. InGaN enables efficient blue/white LEDs. Indium's 'tin cry' results from crystal twinning."
    }
  },
  Sn: {
    symbol: 'Sn', name: 'Tin', atomicNumber: 50, category: 'Post-transition Metal', color: '#668080',
    radius: 1.0, mass: 118.71, electrons: [2, 8, 18, 18, 4], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p²', block: 'p',
    electronegativity: 1.96, xpos: 14, ypos: 5,
    description: {
      basic: "Used in solder and tin cans, known since ancient times.",
      advanced: "Tin exists as α (gray, diamond structure) and β (white, metallic) allotropes. 'Tin pest' is the slow transformation to brittle α-Sn below 13°C. Lead-free solders use Sn-Ag-Cu alloys."
    }
  },
  Sb: {
    symbol: 'Sb', name: 'Antimony', atomicNumber: 51, category: 'Metalloid', color: '#9E63B5',
    radius: 1.0, mass: 121.76, electrons: [2, 8, 18, 18, 5], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p³', block: 'p',
    electronegativity: 2.05, xpos: 15, ypos: 5,
    description: {
      basic: "A metalloid used in flame retardants and lead-acid batteries.",
      advanced: "Antimony trioxide (Sb₂O₃) is a flame retardant synergist with halogens. The Sb₂Te₃/Bi₂Te₃ system is used for thermoelectric cooling. Historical uses include cosmetics (kohl) and medicine."
    }
  },
  Te: {
    symbol: 'Te', name: 'Tellurium', atomicNumber: 52, category: 'Metalloid', color: '#D47A00',
    radius: 1.0, mass: 127.60, electrons: [2, 8, 18, 18, 6], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁴', block: 'p',
    electronegativity: 2.10, xpos: 16, ypos: 5,
    description: {
      basic: "A rare metalloid used in solar panels and alloys.",
      advanced: "CdTe thin-film solar cells achieve >20% efficiency. Bi₂Te₃ is the most efficient thermoelectric material near room temperature. Te forms polymeric chains similar to sulfur and selenium."
    }
  },
  I: {
    symbol: 'I', name: 'Iodine', atomicNumber: 53, category: 'Halogen', color: '#940094',
    radius: 1.0, mass: 126.90, electrons: [2, 8, 18, 18, 7], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁵', block: 'p',
    electronegativity: 2.66, xpos: 17, ypos: 5,
    description: {
      basic: "Essential for thyroid function, sublimates to purple vapor.",
      advanced: "Iodine deficiency causes goiter and developmental issues. ¹³¹I is used for thyroid cancer treatment and imaging. The I₂-starch complex creates the characteristic blue-black color used in titrations."
    }
  },
  Xe: {
    symbol: 'Xe', name: 'Xenon', atomicNumber: 54, category: 'Noble Gas', color: '#429EB0',
    radius: 0.9, mass: 131.29, electrons: [2, 8, 18, 18, 8], electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶', block: 'p',
    electronegativity: 2.60, xpos: 18, ypos: 5,
    description: {
      basic: "Used in bright arc lamps and as an anesthetic.",
      advanced: "XeF₂ and XeF₄ were the first noble gas compounds, disproving complete inertness. Xenon is used as propellant in ion thrusters. Liquid xenon detectors search for dark matter via WIMP interactions."
    }
  },

  // Period 6
  Cs: {
    symbol: 'Cs', name: 'Caesium', atomicNumber: 55, category: 'Alkali Metal', color: '#57178F',
    radius: 1.1, mass: 132.91, electrons: [2, 8, 18, 18, 8, 1], electronConfiguration: '[Xe] 6s¹', block: 's',
    electronegativity: 0.79, xpos: 1, ypos: 6,
    description: {
      basic: "The most reactive metal, used in atomic clocks.",
      advanced: "The second (SI unit) is defined by ¹³³Cs hyperfine transition (9,192,631,770 Hz). Cesium has the lowest electronegativity of stable elements. CsI scintillators detect gamma rays."
    }
  },
  Ba: {
    symbol: 'Ba', name: 'Barium', atomicNumber: 56, category: 'Alkaline Earth', color: '#00C900',
    radius: 1.1, mass: 137.33, electrons: [2, 8, 18, 18, 8, 2], electronConfiguration: '[Xe] 6s²', block: 's',
    electronegativity: 0.89, xpos: 2, ypos: 6,
    description: {
      basic: "Makes green fireworks and is used in medical X-ray imaging.",
      advanced: "BaSO₄ is insoluble and used as radiocontrast agent for GI imaging. BaTiO₃ is a ferroelectric material. Ba²⁺ blocks K⁺ channels, making it toxic, but BaSO₄ is safe due to insolubility."
    }
  },
  La: {
    symbol: 'La', name: 'Lanthanum', atomicNumber: 57, category: 'Lanthanide', color: '#70D4FF',
    radius: 1.1, mass: 138.91, electrons: [2, 8, 18, 18, 9, 2], electronConfiguration: '[Xe] 5d¹ 6s²', block: 'd',
    electronegativity: 1.10, xpos: 3, ypos: 6,
    description: {
      basic: "Used in camera lenses and hybrid car batteries.",
      advanced: "La³⁺ has no 4f electrons, simplifying its chemistry compared to other lanthanides. LaNi₅ alloys store hydrogen in NiMH batteries. La₂O₃ produces high-refractive-index optical glass."
    }
  },
  Ce: {
    symbol: 'Ce', name: 'Cerium', atomicNumber: 58, category: 'Lanthanide', color: '#FFFFC7',
    radius: 1.1, mass: 140.12, electrons: [2, 8, 18, 19, 9, 2], electronConfiguration: '[Xe] 4f¹ 5d¹ 6s²', block: 'f',
    electronegativity: 1.12, xpos: 4, ypos: 9,
    description: {
      basic: "The most abundant rare earth, used in catalytic converters.",
      advanced: "Cerium uniquely has accessible +3/+4 oxidation states among lanthanides. CeO₂ stores/releases oxygen in catalytic converters. Ce(IV) is a strong oxidizer used in quantitative analysis."
    }
  },
  Pr: {
    symbol: 'Pr', name: 'Praseodymium', atomicNumber: 59, category: 'Lanthanide', color: '#D9FFC7',
    radius: 1.1, mass: 140.91, electrons: [2, 8, 18, 21, 8, 2], electronConfiguration: '[Xe] 4f³ 6s²', block: 'f',
    electronegativity: 1.13, xpos: 5, ypos: 9,
    description: {
      basic: "Used to color glass and in high-strength magnets.",
      advanced: "Pr³⁺ has characteristic green color from f-f transitions. Praseodymium-doped fluoride fiber amplifiers enable 1.3 µm telecom. Pr₆O₁₁ is used as yellow ceramic pigment."
    }
  },
  Nd: {
    symbol: 'Nd', name: 'Neodymium', atomicNumber: 60, category: 'Lanthanide', color: '#C7FFC7',
    radius: 1.1, mass: 144.24, electrons: [2, 8, 18, 22, 8, 2], electronConfiguration: '[Xe] 4f⁴ 6s²', block: 'f',
    electronegativity: 1.14, xpos: 6, ypos: 9,
    description: {
      basic: "Makes the strongest permanent magnets, used in headphones.",
      advanced: "Nd₂Fe₁₄B magnets have the highest energy product (up to 512 kJ/m³). Nd:YAG lasers emit at 1064 nm. The 'didymium' glass for glassblowing goggles filters sodium emission."
    }
  },
  Pm: {
    symbol: 'Pm', name: 'Promethium', atomicNumber: 61, category: 'Lanthanide', color: '#A3FFC7',
    radius: 1.1, mass: 145, electrons: [2, 8, 18, 23, 8, 2], electronConfiguration: '[Xe] 4f⁵ 6s²', block: 'f',
    electronegativity: 1.13, xpos: 7, ypos: 9,
    description: {
      basic: "A radioactive element with no stable isotopes, used in atomic batteries.",
      advanced: "Promethium is the only lanthanide with no stable isotopes. ¹⁴⁷Pm (t½=2.62y) β⁻ decay powers nuclear batteries. Pm was predicted by Moseley and later isolated from fission products."
    }
  },
  Sm: {
    symbol: 'Sm', name: 'Samarium', atomicNumber: 62, category: 'Lanthanide', color: '#8FFFC7',
    radius: 1.1, mass: 150.36, electrons: [2, 8, 18, 24, 8, 2], electronConfiguration: '[Xe] 4f⁶ 6s²', block: 'f',
    electronegativity: 1.17, xpos: 8, ypos: 9,
    description: {
      basic: "Used in magnets and cancer treatment.",
      advanced: "SmCo₅ and Sm₂Co₁₇ magnets have high coercivity and temperature stability. ¹⁵³Sm-EDTMP treats bone metastases. Sm²⁺ is a useful reductant (SmI₂) in organic synthesis."
    }
  },
  Eu: {
    symbol: 'Eu', name: 'Europium', atomicNumber: 63, category: 'Lanthanide', color: '#61FFC7',
    radius: 1.1, mass: 151.96, electrons: [2, 8, 18, 25, 8, 2], electronConfiguration: '[Xe] 4f⁷ 6s²', block: 'f',
    electronegativity: 1.20, xpos: 9, ypos: 9,
    description: {
      basic: "Makes red phosphors in TVs and is used in Euro banknote security.",
      advanced: "Eu³⁺ red emission (⁵D₀→⁷F₂) is used in display phosphors. Eu²⁺ blue emission enables white LEDs. The half-filled 4f⁷ shell of Eu²⁺ provides unusual stability for +2 lanthanide."
    }
  },
  Gd: {
    symbol: 'Gd', name: 'Gadolinium', atomicNumber: 64, category: 'Lanthanide', color: '#45FFC7',
    radius: 1.1, mass: 157.25, electrons: [2, 8, 18, 25, 9, 2], electronConfiguration: '[Xe] 4f⁷ 5d¹ 6s²', block: 'f',
    electronegativity: 1.20, xpos: 10, ypos: 9,
    description: {
      basic: "Used as MRI contrast agent and in nuclear reactor control rods.",
      advanced: "Gd³⁺ has seven unpaired electrons, giving the highest paramagnetic moment. Gd-DTPA enhances MRI contrast. Gd has the highest thermal neutron capture cross-section of stable elements."
    }
  },
  Tb: {
    symbol: 'Tb', name: 'Terbium', atomicNumber: 65, category: 'Lanthanide', color: '#30FFC7',
    radius: 1.1, mass: 158.93, electrons: [2, 8, 18, 27, 8, 2], electronConfiguration: '[Xe] 4f⁹ 6s²', block: 'f',
    electronegativity: 1.20, xpos: 11, ypos: 9,
    description: {
      basic: "Produces green phosphors and is used in solid-state devices.",
      advanced: "Tb³⁺ green emission (⁵D₄→⁷F₅ at 545nm) is crucial for trichromatic lighting. Terfenol-D (Tb-Dy-Fe) has giant magnetostriction for sonar applications."
    }
  },
  Dy: {
    symbol: 'Dy', name: 'Dysprosium', atomicNumber: 66, category: 'Lanthanide', color: '#1FFFC7',
    radius: 1.1, mass: 162.50, electrons: [2, 8, 18, 28, 8, 2], electronConfiguration: '[Xe] 4f¹⁰ 6s²', block: 'f',
    electronegativity: 1.22, xpos: 12, ypos: 9,
    description: {
      basic: "Improves permanent magnet performance at high temperatures.",
      advanced: "Dy addition to Nd₂Fe₁₄B magnets increases coercivity for high-temperature applications. Dy has the highest magnetic susceptibility of any element. Critical for electric vehicle motors."
    }
  },
  Ho: {
    symbol: 'Ho', name: 'Holmium', atomicNumber: 67, category: 'Lanthanide', color: '#00FF9C',
    radius: 1.1, mass: 164.93, electrons: [2, 8, 18, 29, 8, 2], electronConfiguration: '[Xe] 4f¹¹ 6s²', block: 'f',
    electronegativity: 1.23, xpos: 13, ypos: 9,
    description: {
      basic: "Has the highest magnetic moment of any element.",
      advanced: "Holmium has 10.6 µB magnetic moment, the highest of any element. Ho:YAG lasers (2.1 µm) are used in medical surgery. HoFeO₃ is used in magnetic bubble memory."
    }
  },
  Er: {
    symbol: 'Er', name: 'Erbium', atomicNumber: 68, category: 'Lanthanide', color: '#00E675',
    radius: 1.1, mass: 167.26, electrons: [2, 8, 18, 30, 8, 2], electronConfiguration: '[Xe] 4f¹² 6s²', block: 'f',
    electronegativity: 1.24, xpos: 14, ypos: 9,
    description: {
      basic: "Gives pink color to glass and amplifies fiber optic signals.",
      advanced: "Er-doped fiber amplifiers (EDFA) at 1.55 µm enable long-distance fiber optic communication. Er:YAG lasers (2.94 µm) are absorbed by water, enabling precise tissue ablation."
    }
  },
  Tm: {
    symbol: 'Tm', name: 'Thulium', atomicNumber: 69, category: 'Lanthanide', color: '#00D452',
    radius: 1.1, mass: 168.93, electrons: [2, 8, 18, 31, 8, 2], electronConfiguration: '[Xe] 4f¹³ 6s²', block: 'f',
    electronegativity: 1.25, xpos: 15, ypos: 9,
    description: {
      basic: "The rarest naturally occurring lanthanide, used in portable X-ray devices.",
      advanced: "¹⁷⁰Tm irradiated to ¹⁷⁰Tm→¹⁷⁰Yb provides portable X-ray sources for medical imaging. Tm:fiber lasers near 2 µm enable eye-safe LIDAR. Tm³⁺ blue upconversion enables anti-Stokes cooling."
    }
  },
  Yb: {
    symbol: 'Yb', name: 'Ytterbium', atomicNumber: 70, category: 'Lanthanide', color: '#00BF38',
    radius: 1.1, mass: 173.05, electrons: [2, 8, 18, 32, 8, 2], electronConfiguration: '[Xe] 4f¹⁴ 6s²', block: 'f',
    electronegativity: 1.10, xpos: 16, ypos: 9,
    description: {
      basic: "Used in high-power fiber lasers and atomic clocks.",
      advanced: "Yb-doped fiber lasers achieve >10 kW power for industrial cutting. Yb optical lattice clocks achieve 10⁻¹⁸ precision. The filled 4f¹⁴ shell allows accessible +2 state like Eu."
    }
  },
  Lu: {
    symbol: 'Lu', name: 'Lutetium', atomicNumber: 71, category: 'Lanthanide', color: '#00AB24',
    radius: 1.1, mass: 174.97, electrons: [2, 8, 18, 32, 9, 2], electronConfiguration: '[Xe] 4f¹⁴ 5d¹ 6s²', block: 'd',
    electronegativity: 1.27, xpos: 17, ypos: 9,
    description: {
      basic: "The densest and hardest lanthanide, used in PET scanners.",
      advanced: "Lu₂SiO₅:Ce (LSO) scintillators enable high-resolution PET imaging. ¹⁷⁷Lu-DOTATATE treats neuroendocrine tumors. Lu's filled 4f shell makes it the smallest lanthanide (lanthanide contraction)."
    }
  },
  Hf: {
    symbol: 'Hf', name: 'Hafnium', atomicNumber: 72, category: 'Transition Metal', color: '#4DC2FF',
    radius: 1.0, mass: 178.49, electrons: [2, 8, 18, 32, 10, 2], electronConfiguration: '[Xe] 4f¹⁴ 5d² 6s²', block: 'd',
    electronegativity: 1.30, xpos: 4, ypos: 6,
    description: {
      basic: "Extremely heat-resistant, used in nuclear control rods.",
      advanced: "Hafnium's high neutron absorption (opposite to Zr) requires careful separation for nuclear applications. HfO₂ high-k dielectrics replaced SiO₂ in modern transistors. Hf-Zr share nearly identical radii due to lanthanide contraction."
    }
  },
  Ta: {
    symbol: 'Ta', name: 'Tantalum', atomicNumber: 73, category: 'Transition Metal', color: '#4DA6FF',
    radius: 1.0, mass: 180.95, electrons: [2, 8, 18, 32, 11, 2], electronConfiguration: '[Xe] 4f¹⁴ 5d³ 6s²', block: 'd',
    electronegativity: 1.50, xpos: 5, ypos: 6,
    description: {
      basic: "Highly corrosion-resistant, used in electronics and surgical implants.",
      advanced: "Tantalum capacitors provide high capacitance per volume for electronics. Ta's biocompatibility enables bone implants. Ta₂O₅ has high refractive index for optical coatings."
    }
  },
  W: {
    symbol: 'W', name: 'Tungsten', atomicNumber: 74, category: 'Transition Metal', color: '#2194D6',
    radius: 1.0, mass: 183.84, electrons: [2, 8, 18, 32, 12, 2], electronConfiguration: '[Xe] 4f¹⁴ 5d⁴ 6s²', block: 'd',
    electronegativity: 2.36, xpos: 6, ypos: 6,
    description: {
      basic: "Has the highest melting point of all elements, used in light bulb filaments.",
      advanced: "Tungsten's melting point (3422°C) is highest of all elements. WC is extremely hard for cutting tools. Tungsten's high density (19.3 g/cm³) provides radiation shielding and kinetic penetrators."
    }
  },
  Re: {
    symbol: 'Re', name: 'Rhenium', atomicNumber: 75, category: 'Transition Metal', color: '#267DAB',
    radius: 1.0, mass: 186.21, electrons: [2, 8, 18, 32, 13, 2], electronConfiguration: '[Xe] 4f¹⁴ 5d⁵ 6s²', block: 'd',
    electronegativity: 1.90, xpos: 7, ypos: 6,
    description: {
      basic: "One of the rarest elements, used in jet engine superalloys.",
      advanced: "Rhenium improves creep resistance in Ni-based superalloys for turbine blades. Re-Os dating uses ¹⁸⁷Re→¹⁸⁷Os decay. Rhenium has the highest boiling point of any element (5596°C)."
    }
  },
  Os: {
    symbol: 'Os', name: 'Osmium', atomicNumber: 76, category: 'Transition Metal', color: '#266696',
    radius: 1.0, mass: 190.23, electrons: [2, 8, 18, 32, 14, 2], electronConfiguration: '[Xe] 4f¹⁴ 5d⁶ 6s²', block: 'd',
    electronegativity: 2.20, xpos: 8, ypos: 6,
    description: {
      basic: "The densest naturally occurring element, used in fountain pen tips.",
      advanced: "Osmium (22.59 g/cm³) edges out iridium as densest element. OsO₄ is toxic but useful for tissue staining in electron microscopy. Os-Ir alloys are extremely hard and corrosion-resistant."
    }
  },
  Ir: {
    symbol: 'Ir', name: 'Iridium', atomicNumber: 77, category: 'Transition Metal', color: '#175487',
    radius: 1.0, mass: 192.22, electrons: [2, 8, 18, 32, 15, 2], electronConfiguration: '[Xe] 4f¹⁴ 5d⁷ 6s²', block: 'd',
    electronegativity: 2.20, xpos: 9, ypos: 6,
    description: {
      basic: "The most corrosion-resistant metal, found in the K-T boundary.",
      advanced: "Iridium anomaly in K-T boundary sediments supports asteroid impact theory. Ir(III) complexes are used in OLEDs. The kilogram was defined by Pt-Ir alloy cylinder until 2019."
    }
  },
  Pt: {
    symbol: 'Pt', name: 'Platinum', atomicNumber: 78, category: 'Transition Metal', color: '#D0D0E0',
    radius: 1.0, mass: 195.08, electrons: [2, 8, 18, 32, 17, 1], electronConfiguration: '[Xe] 4f¹⁴ 5d⁹ 6s¹', block: 'd',
    electronegativity: 2.28, xpos: 10, ypos: 6,
    description: {
      basic: "A precious metal used in jewelry and catalytic converters.",
      advanced: "Cisplatin [Pt(NH₃)₂Cl₂] revolutionized cancer chemotherapy. Pt catalyzes hydrogenation and in fuel cells. Pt's 5d⁹6s¹ configuration results from relativistic effects contracting the 6s orbital."
    }
  },
  Au: {
    symbol: 'Au', name: 'Gold', atomicNumber: 79, category: 'Transition Metal', color: '#FFD123',
    radius: 1.0, mass: 196.97, electrons: [2, 8, 18, 32, 18, 1], electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', block: 'd',
    electronegativity: 2.54, xpos: 11, ypos: 6,
    description: {
      basic: "A precious metal, highly malleable and resistant to corrosion.",
      advanced: "Gold's color results from relativistic contraction of 6s orbital, enabling 5d→6s transitions in visible range. Au nanoparticles exhibit surface plasmon resonance for sensors. Au(I) and Au(III) form stable complexes."
    }
  },
  Hg: {
    symbol: 'Hg', name: 'Mercury', atomicNumber: 80, category: 'Transition Metal', color: '#B8B8D0',
    radius: 1.0, mass: 200.59, electrons: [2, 8, 18, 32, 18, 2], electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', block: 'd',
    electronegativity: 2.00, xpos: 12, ypos: 6,
    description: {
      basic: "The only liquid metal at room temperature, used in thermometers.",
      advanced: "Mercury's low melting point (-39°C) results from relativistic 6s orbital contraction weakening metallic bonding. Methylmercury biomagnifies in food chains. Mercury amalgamates with many metals."
    }
  },
  Tl: {
    symbol: 'Tl', name: 'Thallium', atomicNumber: 81, category: 'Post-transition Metal', color: '#A6544D',
    radius: 1.0, mass: 204.38, electrons: [2, 8, 18, 32, 18, 3], electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', block: 'p',
    electronegativity: 1.62, xpos: 13, ypos: 6,
    description: {
      basic: "A highly toxic metal, formerly used as rat poison.",
      advanced: "Thallium's toxicity stems from K⁺ mimicry in ion channels. The 'inert pair effect' makes Tl(I) more stable than Tl(III). Tl₂SO₄ was used in pest control before being banned."
    }
  },
  Pb: {
    symbol: 'Pb', name: 'Lead', atomicNumber: 82, category: 'Post-transition Metal', color: '#575961',
    radius: 1.0, mass: 207.2, electrons: [2, 8, 18, 32, 18, 4], electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', block: 'p',
    electronegativity: 1.87, xpos: 14, ypos: 6,
    description: {
      basic: "A dense, soft metal used in batteries and radiation shielding.",
      advanced: "Lead's inert pair effect stabilizes Pb(II) over Pb(IV). PbO₂/Pb lead-acid batteries dominate automotive applications. Pb-206/207/208 are stable end-products of radioactive decay chains."
    }
  },
  Bi: {
    symbol: 'Bi', name: 'Bismuth', atomicNumber: 83, category: 'Post-transition Metal', color: '#9E4FB5',
    radius: 1.0, mass: 208.98, electrons: [2, 8, 18, 32, 18, 5], electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', block: 'p',
    electronegativity: 2.02, xpos: 15, ypos: 6,
    description: {
      basic: "The most diamagnetic element, forms rainbow-colored crystals.",
      advanced: "Bismuth subsalicylate (Pepto-Bismol) treats GI issues. Bi₂Te₃ is an excellent thermoelectric material. ²⁰⁹Bi was thought stable but decays via α with t½=1.9×10¹⁹ years."
    }
  },
  Po: {
    symbol: 'Po', name: 'Polonium', atomicNumber: 84, category: 'Metalloid', color: '#AB5C00',
    radius: 1.0, mass: 209, electrons: [2, 8, 18, 32, 18, 6], electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', block: 'p',
    electronegativity: 2.00, xpos: 16, ypos: 6,
    description: {
      basic: "A highly radioactive element discovered by Marie Curie.",
      advanced: "²¹⁰Po (t½=138d) α-decay generates significant heat, used in RTGs. Po was used to assassinate Alexander Litvinenko in 2006. It's the only element named after a country (Poland)."
    }
  },
  At: {
    symbol: 'At', name: 'Astatine', atomicNumber: 85, category: 'Halogen', color: '#754F45',
    radius: 1.0, mass: 210, electrons: [2, 8, 18, 32, 18, 7], electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', block: 'p',
    electronegativity: 2.20, xpos: 17, ypos: 6,
    description: {
      basic: "The rarest naturally occurring element on Earth.",
      advanced: "Only ~25g of astatine exists in Earth's crust at any time. ²¹¹At is being studied for targeted alpha therapy in cancer. Relativistic effects give astatine more metallic character than other halogens."
    }
  },
  Rn: {
    symbol: 'Rn', name: 'Radon', atomicNumber: 86, category: 'Noble Gas', color: '#428296',
    radius: 1.0, mass: 222, electrons: [2, 8, 18, 32, 18, 8], electronConfiguration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', block: 'p',
    electronegativity: 2.20, xpos: 18, ypos: 6,
    description: {
      basic: "A radioactive noble gas that seeps from soil into buildings.",
      advanced: "²²²Rn (t½=3.8d) is the leading cause of lung cancer among non-smokers. It accumulates in basements from uranium-containing rocks. RnF₂ demonstrates noble gas reactivity."
    }
  },

  // Period 7
  Fr: {
    symbol: 'Fr', name: 'Francium', atomicNumber: 87, category: 'Alkali Metal', color: '#420066',
    radius: 1.2, mass: 223, electrons: [2, 8, 18, 32, 18, 8, 1], electronConfiguration: '[Rn] 7s¹', block: 's',
    electronegativity: 0.70, xpos: 1, ypos: 7,
    description: {
      basic: "The most unstable naturally occurring element.",
      advanced: "Only ~20-30g of francium exists on Earth at any time. ²²³Fr (t½=22min) is the longest-lived isotope. Francium is produced in particle accelerators for atomic physics studies."
    }
  },
  Ra: {
    symbol: 'Ra', name: 'Radium', atomicNumber: 88, category: 'Alkaline Earth', color: '#007D00',
    radius: 1.2, mass: 226, electrons: [2, 8, 18, 32, 18, 8, 2], electronConfiguration: '[Rn] 7s²', block: 's',
    electronegativity: 0.90, xpos: 2, ypos: 7,
    description: {
      basic: "A radioactive element that glows in the dark, discovered by the Curies.",
      advanced: "²²⁶Ra (t½=1600y) decays through multiple daughters to stable ²⁰⁶Pb. Historical use in luminous watch dials caused radium jaw in workers. ²²³Ra treats bone metastases."
    }
  },
  Ac: {
    symbol: 'Ac', name: 'Actinium', atomicNumber: 89, category: 'Actinide', color: '#70ABFA',
    radius: 1.2, mass: 227, electrons: [2, 8, 18, 32, 18, 9, 2], electronConfiguration: '[Rn] 6d¹ 7s²', block: 'd',
    electronegativity: 1.10, xpos: 3, ypos: 7,
    description: {
      basic: "A radioactive element that glows blue in the dark.",
      advanced: "²²⁷Ac (t½=21.8y) generates ²²⁵Ac for targeted alpha therapy. Actinium's intense radioactivity makes it glow blue from ionized air. It gives its name to the actinide series."
    }
  },
  Th: {
    symbol: 'Th', name: 'Thorium', atomicNumber: 90, category: 'Actinide', color: '#00BAFF',
    radius: 1.2, mass: 232.04, electrons: [2, 8, 18, 32, 18, 10, 2], electronConfiguration: '[Rn] 6d² 7s²', block: 'f',
    electronegativity: 1.30, xpos: 4, ypos: 10,
    description: {
      basic: "A radioactive metal being studied as nuclear fuel.",
      advanced: "Thorium fuel cycles produce less long-lived waste than uranium. ²³²Th breeds ²³³U via neutron capture. Thorium oxide has the highest melting point of any oxide (3300°C)."
    }
  },
  Pa: {
    symbol: 'Pa', name: 'Protactinium', atomicNumber: 91, category: 'Actinide', color: '#00A1FF',
    radius: 1.2, mass: 231.04, electrons: [2, 8, 18, 32, 20, 9, 2], electronConfiguration: '[Rn] 5f² 6d¹ 7s²', block: 'f',
    electronegativity: 1.50, xpos: 5, ypos: 10,
    description: {
      basic: "A rare and highly radioactive actinide metal.",
      advanced: "²³¹Pa (t½=32,760y) is used in ²³¹Pa/²³⁵U dating of ocean sediments. Protactinium is one of the rarest naturally occurring elements. It shows +5 oxidation state predominantly."
    }
  },
  U: {
    symbol: 'U', name: 'Uranium', atomicNumber: 92, category: 'Actinide', color: '#008FFF',
    radius: 1.2, mass: 238.03, electrons: [2, 8, 18, 32, 21, 9, 2], electronConfiguration: '[Rn] 5f³ 6d¹ 7s²', block: 'f',
    electronegativity: 1.38, xpos: 6, ypos: 10,
    description: {
      basic: "A heavy radioactive metal used as nuclear fuel.",
      advanced: "²³⁵U (0.7% natural) undergoes fission with thermal neutrons. UF₆ gas diffusion or centrifugation enriches ²³⁵U. The uranyl ion UO₂²⁺ is characteristic of U(VI) chemistry."
    }
  },
  Np: {
    symbol: 'Np', name: 'Neptunium', atomicNumber: 93, category: 'Actinide', color: '#0080FF',
    radius: 1.2, mass: 237, electrons: [2, 8, 18, 32, 22, 9, 2], electronConfiguration: '[Rn] 5f⁴ 6d¹ 7s²', block: 'f',
    electronegativity: 1.36, xpos: 7, ypos: 10,
    description: {
      basic: "The first transuranium element, produced in nuclear reactors.",
      advanced: "²³⁷Np (t½=2.14×10⁶y) is produced from ²³⁸U via (n,2n) reaction. Np exhibits oxidation states from +3 to +7. Named after Neptune, following uranium (Uranus)."
    }
  },
  Pu: {
    symbol: 'Pu', name: 'Plutonium', atomicNumber: 94, category: 'Actinide', color: '#006BFF',
    radius: 1.2, mass: 244, electrons: [2, 8, 18, 32, 24, 8, 2], electronConfiguration: '[Rn] 5f⁶ 7s²', block: 'f',
    electronegativity: 1.28, xpos: 8, ypos: 10,
    description: {
      basic: "Used in nuclear weapons and spacecraft power sources.",
      advanced: "²³⁹Pu is fissile and bred from ²³⁸U in reactors. ²³⁸Pu powers RTGs on spacecraft (t½=87.7y). Plutonium has six allotropes, more than any other element."
    }
  },
  Am: {
    symbol: 'Am', name: 'Americium', atomicNumber: 95, category: 'Actinide', color: '#545CF2',
    radius: 1.2, mass: 243, electrons: [2, 8, 18, 32, 25, 8, 2], electronConfiguration: '[Rn] 5f⁷ 7s²', block: 'f',
    electronegativity: 1.30, xpos: 9, ypos: 10,
    description: {
      basic: "Used in smoke detectors and some industrial gauges.",
      advanced: "²⁴¹Am (t½=432y) α-decay ionizes air in smoke detectors. AmO₂ serves as neutron source when mixed with Be. Named after the Americas, analogous to europium."
    }
  },
  Cm: {
    symbol: 'Cm', name: 'Curium', atomicNumber: 96, category: 'Actinide', color: '#785CE3',
    radius: 1.2, mass: 247, electrons: [2, 8, 18, 32, 25, 9, 2], electronConfiguration: '[Rn] 5f⁷ 6d¹ 7s²', block: 'f',
    electronegativity: 1.30, xpos: 10, ypos: 10,
    description: {
      basic: "Named after Marie and Pierre Curie, highly radioactive.",
      advanced: "²⁴⁴Cm (t½=18.1y) provides compact α/heat sources. Cm has half-filled 5f⁷ shell like Gd has 4f⁷. ²⁴²Cm was used in Mars rover α-particle X-ray spectrometers."
    }
  },
  Bk: {
    symbol: 'Bk', name: 'Berkelium', atomicNumber: 97, category: 'Actinide', color: '#8A4FE3',
    radius: 1.2, mass: 247, electrons: [2, 8, 18, 32, 27, 8, 2], electronConfiguration: '[Rn] 5f⁹ 7s²', block: 'f',
    electronegativity: 1.30, xpos: 11, ypos: 10,
    description: {
      basic: "Named after Berkeley, California, where it was discovered.",
      advanced: "²⁴⁹Bk (t½=330d) is used to synthesize heavier elements. Only ~1g has ever been produced. Bk(IV) is unusually stable for a transplutonium element."
    }
  },
  Cf: {
    symbol: 'Cf', name: 'Californium', atomicNumber: 98, category: 'Actinide', color: '#A136D4',
    radius: 1.2, mass: 251, electrons: [2, 8, 18, 32, 28, 8, 2], electronConfiguration: '[Rn] 5f¹⁰ 7s²', block: 'f',
    electronegativity: 1.30, xpos: 12, ypos: 10,
    description: {
      basic: "A strong neutron emitter used in cancer treatment.",
      advanced: "²⁵²Cf (t½=2.65y) spontaneously fissions, emitting neutrons for reactor startup and neutron radiography. One microgram emits 2.3×10⁶ neutrons/second. Used to treat cervical cancer."
    }
  },
  Es: {
    symbol: 'Es', name: 'Einsteinium', atomicNumber: 99, category: 'Actinide', color: '#B31FD4',
    radius: 1.2, mass: 252, electrons: [2, 8, 18, 32, 29, 8, 2], electronConfiguration: '[Rn] 5f¹¹ 7s²', block: 'f',
    electronegativity: 1.30, xpos: 13, ypos: 10,
    description: {
      basic: "Discovered in hydrogen bomb debris, named after Einstein.",
      advanced: "Es was discovered in 1952 Ivy Mike test fallout. ²⁵³Es (t½=20d) enables chemistry studies. First bulk chemistry performed in 2021 confirmed +3 oxidation state."
    }
  },
  Fm: {
    symbol: 'Fm', name: 'Fermium', atomicNumber: 100, category: 'Actinide', color: '#B31FBA',
    radius: 1.2, mass: 257, electrons: [2, 8, 18, 32, 30, 8, 2], electronConfiguration: '[Rn] 5f¹² 7s²', block: 'f',
    electronegativity: 1.30, xpos: 14, ypos: 10,
    description: {
      basic: "Also discovered in H-bomb debris, named after Enrico Fermi.",
      advanced: "²⁵⁷Fm (t½=100d) is the heaviest element producible in weighable quantities. Fermium is the last element that can be made by neutron capture. Named after Enrico Fermi."
    }
  },
  Md: {
    symbol: 'Md', name: 'Mendelevium', atomicNumber: 101, category: 'Actinide', color: '#B30DA6',
    radius: 1.2, mass: 258, electrons: [2, 8, 18, 32, 31, 8, 2], electronConfiguration: '[Rn] 5f¹³ 7s²', block: 'f',
    electronegativity: 1.30, xpos: 15, ypos: 10,
    description: {
      basic: "Named after Dmitri Mendeleev, creator of the periodic table.",
      advanced: "First Md atoms were made by bombarding ²⁵³Es with α particles at Berkeley in 1955. ²⁵⁸Md (t½=51d) allows limited chemistry. Md(II) is more stable than expected."
    }
  },
  No: {
    symbol: 'No', name: 'Nobelium', atomicNumber: 102, category: 'Actinide', color: '#BD0D87',
    radius: 1.2, mass: 259, electrons: [2, 8, 18, 32, 32, 8, 2], electronConfiguration: '[Rn] 5f¹⁴ 7s²', block: 'f',
    electronegativity: 1.30, xpos: 16, ypos: 10,
    description: {
      basic: "Named after Alfred Nobel, inventor of dynamite.",
      advanced: "No has a filled 5f¹⁴ shell, making No(II) unusually stable, similar to Yb(II). ²⁵⁹No (t½=58min) enables aqueous chemistry studies. Named after Alfred Nobel."
    }
  },
  Lr: {
    symbol: 'Lr', name: 'Lawrencium', atomicNumber: 103, category: 'Actinide', color: '#C70066',
    radius: 1.2, mass: 266, electrons: [2, 8, 18, 32, 32, 8, 3], electronConfiguration: '[Rn] 5f¹⁴ 7s² 7p¹', block: 'p',
    electronegativity: 1.30, xpos: 17, ypos: 10,
    description: {
      basic: "The last actinide, named after Ernest Lawrence.",
      advanced: "Lr's ground state is [Rn]5f¹⁴7s²7p¹, unique among actinides. Named after Ernest Lawrence, cyclotron inventor. ²⁶⁶Lr (t½=11h) was confirmed in 2015."
    }
  },
  Rf: {
    symbol: 'Rf', name: 'Rutherfordium', atomicNumber: 104, category: 'Transition Metal', color: '#CC0059',
    radius: 1.0, mass: 267, electrons: [2, 8, 18, 32, 32, 10, 2], electronConfiguration: '[Rn] 5f¹⁴ 6d² 7s²', block: 'd',
    electronegativity: null, xpos: 4, ypos: 7,
    description: {
      basic: "First transactinide element, named after Ernest Rutherford.",
      advanced: "Rf chemistry shows it behaves like Hf/Zr (Group 4). ²⁶⁷Rf (t½=1.3h) enables chemistry studies. Relativistic effects cause deviation from simple periodic trends."
    }
  },
  Db: {
    symbol: 'Db', name: 'Dubnium', atomicNumber: 105, category: 'Transition Metal', color: '#D1004F',
    radius: 1.0, mass: 268, electrons: [2, 8, 18, 32, 32, 11, 2], electronConfiguration: '[Rn] 5f¹⁴ 6d³ 7s²', block: 'd',
    electronegativity: null, xpos: 5, ypos: 7,
    description: {
      basic: "Named after Dubna, Russia, where it was discovered.",
      advanced: "Db shows Group 5 chemistry similar to Ta/Nb. The naming controversy (Hahnium vs Dubnium) was resolved by IUPAC in 1997. ²⁶⁸Db (t½=16h) allows detailed studies."
    }
  },
  Sg: {
    symbol: 'Sg', name: 'Seaborgium', atomicNumber: 106, category: 'Transition Metal', color: '#D90045',
    radius: 1.0, mass: 269, electrons: [2, 8, 18, 32, 32, 12, 2], electronConfiguration: '[Rn] 5f¹⁴ 6d⁴ 7s²', block: 'd',
    electronegativity: null, xpos: 6, ypos: 7,
    description: {
      basic: "Named after Glenn Seaborg while he was still alive.",
      advanced: "Sg chemistry shows tungsten-like behavior (Group 6). First element named after a living person (exception made by IUPAC). SgO₂Cl₂ has been synthesized."
    }
  },
  Bh: {
    symbol: 'Bh', name: 'Bohrium', atomicNumber: 107, category: 'Transition Metal', color: '#E00038',
    radius: 1.0, mass: 270, electrons: [2, 8, 18, 32, 32, 13, 2], electronConfiguration: '[Rn] 5f¹⁴ 6d⁵ 7s²', block: 'd',
    electronegativity: null, xpos: 7, ypos: 7,
    description: {
      basic: "Named after Niels Bohr, pioneer of atomic theory.",
      advanced: "Bh shows expected Group 7 (Re-like) chemistry. BhO₃Cl has been identified. ²⁷⁰Bh (t½=61s) is the longest-lived isotope. Named after Niels Bohr."
    }
  },
  Hs: {
    symbol: 'Hs', name: 'Hassium', atomicNumber: 108, category: 'Transition Metal', color: '#E6002E',
    radius: 1.0, mass: 277, electrons: [2, 8, 18, 32, 32, 14, 2], electronConfiguration: '[Rn] 5f¹⁴ 6d⁶ 7s²', block: 'd',
    electronegativity: null, xpos: 8, ypos: 7,
    description: {
      basic: "Named after Hesse, Germany (Latin: Hassia).",
      advanced: "HsO₄ volatility confirms Group 8 (Os-like) chemistry. ²⁷⁷Hs (t½=11s) is the longest-lived isotope. Hassium is the heaviest element with confirmed chemistry."
    }
  },
  Mt: {
    symbol: 'Mt', name: 'Meitnerium', atomicNumber: 109, category: 'Transition Metal', color: '#EB0026',
    radius: 1.0, mass: 278, electrons: [2, 8, 18, 32, 32, 15, 2], electronConfiguration: '[Rn] 5f¹⁴ 6d⁷ 7s²', block: 'd',
    electronegativity: null, xpos: 9, ypos: 7,
    description: {
      basic: "Named after Lise Meitner, nuclear physics pioneer.",
      advanced: "Mt is predicted to have Ir-like chemistry (Group 9). ²⁷⁸Mt (t½=4.5s) is the longest-lived isotope. Named after Lise Meitner, who explained nuclear fission."
    }
  },
  Ds: {
    symbol: 'Ds', name: 'Darmstadtium', atomicNumber: 110, category: 'Transition Metal', color: '#D1D100',
    radius: 1.0, mass: 281, electrons: [2, 8, 18, 32, 32, 17, 1], electronConfiguration: '[Rn] 5f¹⁴ 6d⁸ 7s²', block: 'd',
    electronegativity: null, xpos: 10, ypos: 7,
    description: {
      basic: "Named after Darmstadt, Germany, where it was discovered.",
      advanced: "Ds is predicted to have Pt-like chemistry (Group 10). ²⁸¹Ds (t½=14s) enables limited studies. Relativistic effects may cause deviation from Pt chemistry."
    }
  },
  Rg: {
    symbol: 'Rg', name: 'Roentgenium', atomicNumber: 111, category: 'Transition Metal', color: '#C9C900',
    radius: 1.0, mass: 282, electrons: [2, 8, 18, 32, 32, 18, 1], electronConfiguration: '[Rn] 5f¹⁴ 6d⁹ 7s²', block: 'd',
    electronegativity: null, xpos: 11, ypos: 7,
    description: {
      basic: "Named after Wilhelm Röntgen, discoverer of X-rays.",
      advanced: "Rg is predicted to have Au-like chemistry but may be more reactive. Relativistic effects significantly contract the 7s orbital. ²⁸²Rg (t½=100s) is the longest-lived isotope."
    }
  },
  Cn: {
    symbol: 'Cn', name: 'Copernicium', atomicNumber: 112, category: 'Transition Metal', color: '#C2C200',
    radius: 1.0, mass: 285, electrons: [2, 8, 18, 32, 32, 18, 2], electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s²', block: 'd',
    electronegativity: null, xpos: 12, ypos: 7,
    description: {
      basic: "Named after Nicolaus Copernicus, astronomer.",
      advanced: "Cn shows volatile, noble-gas-like behavior due to relativistic effects. It may be a liquid or gas at room temperature. ²⁸⁵Cn (t½=30s) allows adsorption studies."
    }
  },
  Nh: {
    symbol: 'Nh', name: 'Nihonium', atomicNumber: 113, category: 'Post-transition Metal', color: '#C2A300',
    radius: 1.0, mass: 286, electrons: [2, 8, 18, 32, 32, 18, 3], electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', block: 'p',
    electronegativity: null, xpos: 13, ypos: 7,
    description: {
      basic: "Named after Japan (Nihon), first element discovered in Asia.",
      advanced: "Nh is predicted to have Tl-like chemistry (Group 13). First element discovered in Asia (RIKEN, Japan). ²⁸⁶Nh (t½=10s) is the longest-lived isotope."
    }
  },
  Fl: {
    symbol: 'Fl', name: 'Flerovium', atomicNumber: 114, category: 'Post-transition Metal', color: '#B5A100',
    radius: 1.0, mass: 289, electrons: [2, 8, 18, 32, 32, 18, 4], electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', block: 'p',
    electronegativity: null, xpos: 14, ypos: 7,
    description: {
      basic: "Named after Flerov Laboratory of Nuclear Reactions.",
      advanced: "Fl shows weak metallic character due to relativistic effects. Adsorption studies suggest volatile, inert behavior. Named after Georgy Flyorov and his laboratory."
    }
  },
  Mc: {
    symbol: 'Mc', name: 'Moscovium', atomicNumber: 115, category: 'Post-transition Metal', color: '#A89F00',
    radius: 1.0, mass: 290, electrons: [2, 8, 18, 32, 32, 18, 5], electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', block: 'p',
    electronegativity: null, xpos: 15, ypos: 7,
    description: {
      basic: "Named after Moscow Oblast, Russia.",
      advanced: "Mc is predicted to have Bi-like chemistry (Group 15). ²⁹⁰Mc (t½=0.8s) is the longest-lived isotope. Named after Moscow region where Dubna is located."
    }
  },
  Lv: {
    symbol: 'Lv', name: 'Livermorium', atomicNumber: 116, category: 'Post-transition Metal', color: '#9B9600',
    radius: 1.0, mass: 293, electrons: [2, 8, 18, 32, 32, 18, 6], electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', block: 'p',
    electronegativity: null, xpos: 16, ypos: 7,
    description: {
      basic: "Named after Lawrence Livermore National Laboratory.",
      advanced: "Lv is predicted to have Po-like chemistry (Group 16). Strong relativistic effects may cause noble gas character. ²⁹³Lv (t½=60ms) is studied via decay chains."
    }
  },
  Ts: {
    symbol: 'Ts', name: 'Tennessine', atomicNumber: 117, category: 'Halogen', color: '#8E8D00',
    radius: 1.0, mass: 294, electrons: [2, 8, 18, 32, 32, 18, 7], electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', block: 'p',
    electronegativity: null, xpos: 17, ypos: 7,
    description: {
      basic: "Named after Tennessee, home of Oak Ridge National Laboratory.",
      advanced: "Ts is predicted to show metallic rather than halogen behavior. Relativistic effects stabilize 7s² over 7p electrons. ²⁹⁴Ts (t½=51ms) is the longest-lived isotope."
    }
  },
  Og: {
    symbol: 'Og', name: 'Oganesson', atomicNumber: 118, category: 'Noble Gas', color: '#818100',
    radius: 1.0, mass: 294, electrons: [2, 8, 18, 32, 32, 18, 8], electronConfiguration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', block: 'p',
    electronegativity: null, xpos: 18, ypos: 7,
    description: {
      basic: "The heaviest known element, named after Yuri Oganessian.",
      advanced: "Og may be a reactive solid due to relativistic effects, not a noble gas. Only 5 atoms have been detected. Named after Yuri Oganessian, pioneer of superheavy element synthesis."
    }
  }
};

// Helper function to get element by atomic number
export const getElementByNumber = (atomicNumber) => {
  return Object.values(ELEMENTS).find(el => el.atomicNumber === atomicNumber);
};

// Get all elements as array
export const ELEMENTS_ARRAY = Object.values(ELEMENTS);

// Category colors for the periodic table
export const CATEGORY_COLORS = {
  'Noble Gas': '#5CB8D1',
  'Alkali Metal': '#AB5CF2',
  'Alkaline Earth': '#3DFF00',
  'Transition Metal': '#E6E6E6',
  'Post-transition Metal': '#BFA6A6',
  'Metalloid': '#F0C8A0',
  'Nonmetal': '#90E050',
  'Halogen': '#1FF01F',
  'Lanthanide': '#70D4FF',
  'Actinide': '#70ABFA'
};

// Block colors for orbital visualization
export const BLOCK_COLORS = {
  's': '#3B82F6',  // Blue
  'p': '#22C55E',  // Green
  'd': '#F97316',  // Orange
  'f': '#A855F7'   // Purple
};
