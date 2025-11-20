export const ELEMENTS = {
  // Period 1
  H: { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, category: 'Nonmetal', color: '#FFFFFF', radius: 0.5, mass: 1.008, electrons: [1], xpos: 1, ypos: 1, description: "The lightest and most abundant element in the universe, fueling stars." },
  He: { symbol: 'He', name: 'Helium', atomicNumber: 2, category: 'Noble Gas', color: '#D9FFFF', radius: 0.5, mass: 4.0026, electrons: [2], xpos: 18, ypos: 1, description: "A colorless, odorless, inert gas. Used in balloons and cryogenics." },

  // Period 2
  Li: { symbol: 'Li', name: 'Lithium', atomicNumber: 3, category: 'Alkali Metal', color: '#CC80FF', radius: 0.6, mass: 6.94, electrons: [2, 1], xpos: 1, ypos: 2, description: "The lightest metal, highly reactive and used in rechargeable batteries." },
  Be: { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, category: 'Alkaline Earth', color: '#C2FF00', radius: 0.6, mass: 9.0122, electrons: [2, 2], xpos: 2, ypos: 2, description: "A strong, lightweight metal used in aerospace and X-ray windows." },
  B: { symbol: 'B', name: 'Boron', atomicNumber: 5, category: 'Metalloid', color: '#FFB5B5', radius: 0.7, mass: 10.81, electrons: [2, 3], xpos: 13, ypos: 2, description: "A metalloid found in borax and used to make heat-resistant glass." },
  C: { symbol: 'C', name: 'Carbon', atomicNumber: 6, category: 'Nonmetal', color: '#909090', radius: 0.7, mass: 12.011, electrons: [2, 4], xpos: 14, ypos: 2, description: "The basis of all known life, existing as diamond, graphite, and coal." },
  N: { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, category: 'Nonmetal', color: '#3050F8', radius: 0.7, mass: 14.007, electrons: [2, 5], xpos: 15, ypos: 2, description: "Makes up 78% of Earth's atmosphere and is essential for DNA." },
  O: { symbol: 'O', name: 'Oxygen', atomicNumber: 8, category: 'Nonmetal', color: '#FF0D0D', radius: 0.7, mass: 15.999, electrons: [2, 6], xpos: 16, ypos: 2, description: "Essential for respiration and combustion, the third most abundant element." },
  F: { symbol: 'F', name: 'Fluorine', atomicNumber: 9, category: 'Halogen', color: '#90E050', radius: 0.7, mass: 18.998, electrons: [2, 7], xpos: 17, ypos: 2, description: "The most reactive and electronegative element, used in toothpaste." },
  Ne: { symbol: 'Ne', name: 'Neon', atomicNumber: 10, category: 'Noble Gas', color: '#B3E3F5', radius: 0.6, mass: 20.180, electrons: [2, 8], xpos: 18, ypos: 2, description: "Glows reddish-orange in vacuum discharge tubes, used in signs." },

  // Period 3
  Na: { symbol: 'Na', name: 'Sodium', atomicNumber: 11, category: 'Alkali Metal', color: '#AB5CF2', radius: 0.8, mass: 22.990, electrons: [2, 8, 1], xpos: 1, ypos: 3, description: "A soft, reactive metal, essential for nerve function (as ions)." },
  Mg: { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, category: 'Alkaline Earth', color: '#8AFF00', radius: 0.8, mass: 24.305, electrons: [2, 8, 2], xpos: 2, ypos: 3, description: "Light and strong, burns with a brilliant white light." },
  Al: { symbol: 'Al', name: 'Aluminium', atomicNumber: 13, category: 'Post-transition Metal', color: '#BFA6A6', radius: 0.8, mass: 26.982, electrons: [2, 8, 3], xpos: 13, ypos: 3, description: "The most abundant metal in Earth's crust, lightweight and corrosion-resistant." },
  Si: { symbol: 'Si', name: 'Silicon', atomicNumber: 14, category: 'Metalloid', color: '#F0C8A0', radius: 0.8, mass: 28.085, electrons: [2, 8, 4], xpos: 14, ypos: 3, description: "The basis of modern electronics and computer chips." },
  P: { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, category: 'Nonmetal', color: '#FF8000', radius: 0.8, mass: 30.974, electrons: [2, 8, 5], xpos: 15, ypos: 3, description: "Highly reactive, essential for life (ATP, DNA) and used in matches." },
  S: { symbol: 'S', name: 'Sulfur', atomicNumber: 16, category: 'Nonmetal', color: '#FFFF30', radius: 0.8, mass: 32.06, electrons: [2, 8, 6], xpos: 16, ypos: 3, description: "A yellow solid, known for its rotten egg smell (in compounds)." },
  Cl: { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, category: 'Halogen', color: '#1FF01F', radius: 0.8, mass: 35.45, electrons: [2, 8, 7], xpos: 17, ypos: 3, description: "A toxic yellow-green gas, used as a disinfectant and in PVC." },
  Ar: { symbol: 'Ar', name: 'Argon', atomicNumber: 18, category: 'Noble Gas', color: '#80D1E3', radius: 0.7, mass: 39.948, electrons: [2, 8, 8], xpos: 18, ypos: 3, description: "The third most abundant gas in the atmosphere, used in welding." },

  // Period 4 (Selected)
  K: { symbol: 'K', name: 'Potassium', atomicNumber: 19, category: 'Alkali Metal', color: '#8F40D4', radius: 0.9, mass: 39.098, electrons: [2, 8, 8, 1], xpos: 1, ypos: 4, description: "A soft metal that reacts violently with water, vital for plant growth." },
  Ca: { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, category: 'Alkaline Earth', color: '#3DFF00', radius: 0.9, mass: 40.078, electrons: [2, 8, 8, 2], xpos: 2, ypos: 4, description: "Essential for strong bones and teeth, found in limestone." },
  Sc: { symbol: 'Sc', name: 'Scandium', atomicNumber: 21, category: 'Transition Metal', color: '#E6E6E6', radius: 0.9, mass: 44.956, electrons: [2, 8, 9, 2], xpos: 3, ypos: 4, description: "A rare earth element used in high-strength aluminium alloys." },
  Ti: { symbol: 'Ti', name: 'Titanium', atomicNumber: 22, category: 'Transition Metal', color: '#BFC2C7', radius: 0.9, mass: 47.867, electrons: [2, 8, 10, 2], xpos: 4, ypos: 4, description: "Strong as steel but much lighter, used in aerospace and implants." },
  V: { symbol: 'V', name: 'Vanadium', atomicNumber: 23, category: 'Transition Metal', color: '#A6A6AB', radius: 0.9, mass: 50.942, electrons: [2, 8, 11, 2], xpos: 5, ypos: 4, description: "Used to strengthen steel and in flow batteries." },
  Cr: { symbol: 'Cr', name: 'Chromium', atomicNumber: 24, category: 'Transition Metal', color: '#8A99C7', radius: 0.9, mass: 51.996, electrons: [2, 8, 13, 1], xpos: 6, ypos: 4, description: "Hard and shiny, used in stainless steel and chrome plating." },
  Mn: { symbol: 'Mn', name: 'Manganese', atomicNumber: 25, category: 'Transition Metal', color: '#9C7AC7', radius: 0.9, mass: 54.938, electrons: [2, 8, 13, 2], xpos: 7, ypos: 4, description: "Essential for steel production and biological functions." },
  Fe: { symbol: 'Fe', name: 'Iron', atomicNumber: 26, category: 'Transition Metal', color: '#E06633', radius: 0.9, mass: 55.845, electrons: [2, 8, 14, 2], xpos: 8, ypos: 4, description: "The most used metal, forms the core of the Earth and carries oxygen in blood." },
  Co: { symbol: 'Co', name: 'Cobalt', atomicNumber: 27, category: 'Transition Metal', color: '#F090A0', radius: 0.9, mass: 58.933, electrons: [2, 8, 15, 2], xpos: 9, ypos: 4, description: "Used in superalloys, magnets, and rechargeable batteries." },
  Ni: { symbol: 'Ni', name: 'Nickel', atomicNumber: 28, category: 'Transition Metal', color: '#50D050', radius: 0.9, mass: 58.693, electrons: [2, 8, 16, 2], xpos: 10, ypos: 4, description: "Resistant to corrosion, used in coins and stainless steel." },
  Cu: { symbol: 'Cu', name: 'Copper', atomicNumber: 29, category: 'Transition Metal', color: '#C88033', radius: 0.9, mass: 63.546, electrons: [2, 8, 18, 1], xpos: 11, ypos: 4, description: "Excellent conductor of electricity and heat, one of the first metals used by humans." },
  Zn: { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, category: 'Transition Metal', color: '#7D80B0', radius: 0.9, mass: 65.38, electrons: [2, 8, 18, 2], xpos: 12, ypos: 4, description: "Used to galvanize steel and in brass alloys." },
  Ga: { symbol: 'Ga', name: 'Gallium', atomicNumber: 31, category: 'Post-transition Metal', color: '#C28F8F', radius: 0.9, mass: 69.723, electrons: [2, 8, 18, 3], xpos: 13, ypos: 4, description: "Melts in your hand, used in semiconductors and LEDs." },
  Ge: { symbol: 'Ge', name: 'Germanium', atomicNumber: 32, category: 'Metalloid', color: '#668F8F', radius: 0.9, mass: 72.63, electrons: [2, 8, 18, 4], xpos: 14, ypos: 4, description: "A semiconductor used in fiber optics and solar cells." },
  As: { symbol: 'As', name: 'Arsenic', atomicNumber: 33, category: 'Metalloid', color: '#BD80E3', radius: 0.9, mass: 74.922, electrons: [2, 8, 18, 5], xpos: 15, ypos: 4, description: "Historically a poison, but also used in semiconductors." },
  Se: { symbol: 'Se', name: 'Selenium', atomicNumber: 34, category: 'Nonmetal', color: '#8CAFA6', radius: 0.9, mass: 78.96, electrons: [2, 8, 18, 6], xpos: 16, ypos: 4, description: "Used in photocopiers and as a dietary supplement." },
  Br: { symbol: 'Br', name: 'Bromine', atomicNumber: 35, category: 'Halogen', color: '#A62929', radius: 0.9, mass: 79.904, electrons: [2, 8, 18, 7], xpos: 17, ypos: 4, description: "A reddish-brown liquid, used in flame retardants." },
  Kr: { symbol: 'Kr', name: 'Krypton', atomicNumber: 36, category: 'Noble Gas', color: '#5CB8D1', radius: 0.8, mass: 83.798, electrons: [2, 8, 18, 8], xpos: 18, ypos: 4, description: "Used in high-speed photography flashes and fluorescent lights." },

  // Others
  Ag: { symbol: 'Ag', name: 'Silver', atomicNumber: 47, category: 'Transition Metal', color: '#C0C0C0', radius: 1.0, mass: 107.87, electrons: [2, 8, 18, 18, 1], xpos: 11, ypos: 5, description: "The most conductive metal, used in jewelry and electronics." },
  Au: { symbol: 'Au', name: 'Gold', atomicNumber: 79, category: 'Transition Metal', color: '#FFD123', radius: 1.0, mass: 196.97, electrons: [2, 8, 18, 32, 18, 1], xpos: 11, ypos: 6, description: "A precious metal, highly malleable and resistant to corrosion." },
  U: { symbol: 'U', name: 'Uranium', atomicNumber: 92, category: 'Actinide', color: '#208020', radius: 1.2, mass: 238.029, electrons: [2, 8, 18, 32, 21, 9, 2], xpos: 6, ypos: 7, description: "A heavy, radioactive metal used as nuclear fuel." } // Placed in Actinide row logic or just separate
};
