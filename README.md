# ⚛️ AtomicViz - Interactive 3D Chemistry Visualizer

> **A premium, interactive 3D web application for visualizing atomic structures, chemical reactions, and molecular bonding in real-time.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.181-black?logo=three.js)
![Vite](https://img.shields.io/badge/Vite-7.2-646cff?logo=vite)

---

## 🎯 Project Overview

AtomicViz is a cutting-edge educational platform that brings chemistry to life through stunning 3D visualizations and interactive simulations. Built with modern web technologies, it transforms complex atomic concepts into an engaging, hands-on learning experience.

**Target Audience:** Students, educators, and chemistry enthusiasts looking for an intuitive way to understand atomic structures and chemical reactions.

**Product Vision:** To democratize chemistry education by making molecular interactions visible, tangible, and fun.

---

## ✨ Key Features

### 🔬 **Atom Explorer**
- **Interactive 3D Atoms:** Rotate and zoom into any element from the periodic table
- **Dual Visualization Modes:** Toggle between classic Bohr model and quantum orbital visualization
- **All 118 Elements:** Complete periodic table from Hydrogen to Oganesson
- **Quantum Orbitals:** Visualize s, p, d, f orbital shapes with electron probability clouds
- **Element Information:** Detailed descriptions with High School and University complexity levels

### 🧪 **Reaction Lab**
- **Smooth Reaction Engine:** Reactants morph continuously into products with eased, frame-accurate interpolation — no more snapping between discrete frames
- **Live Energy Diagrams:** Every reaction renders a reaction-coordinate energy profile (reactants → activation barrier → products) with a marker that rides the curve as the reaction plays, and honours the sign of ΔH
- **20+ Chemical Reactions:** Comprehensive library covering inorganic, organic, nuclear, and advanced reactions, filterable by domain
- **Bond Types:** Single, double, triple covalent bonds rendered as parallel cylinders, plus ionic and polar bonds
- **Reaction Categories:**
  - **Inorganic:** Water formation, salt formation, rust, acid-base neutralization, ammonia synthesis, sulfuric acid
  - **Organic:** Methane/ethanol combustion, photosynthesis, fermentation, esterification, hydrogenation
  - **Nuclear:** Uranium fission, hydrogen fusion, alpha/beta decay
  - **Advanced:** Electrochemistry, polymerization, ATP synthesis
- **Scrub & Playback:** Drag the timeline to any point, adjust speed 0.25x–4x, play/pause/replay

### 🧬 **Organic Chemistry Lab**
- **Functional-Group Library:** 18 organic molecules organised by class — alkanes, alkenes, alkynes, alcohols, aldehydes, ketones, carboxylic acids, esters, amines and aromatics
- **Three Render Modes:** Ball-and-stick, space-filling (van der Waals), and wireframe — switch instantly on any molecule
- **Functional-Group Highlighting:** Dims the carbon skeleton and spotlights the reactive group (–OH, C=O, –COOH, ring …) so the chemistry that matters stands out
- **True 3D Geometry:** Structures are grown from a procedural engine using correct sp³/sp² vertex geometry and standard bond lengths, then auto-fitted to frame — methane is a perfect tetrahedron, benzene a flat aromatic ring
- **Camera-Facing Labels:** Billboarded element labels stay legible from every angle

### 🔨 **Atom Builder (God Mode)**
- **Build Custom Atoms:** Add protons, neutrons, and electrons particle by particle
- **Real-time Feedback:** Instant element identification as you build
- **Stability Indicators:** Visual warnings for unstable isotopes
- **Charge Detection:** See when atoms become ions (cations/anions)
- **High-Fidelity Visualization:** Transform particle view into polished 3D atom

### 🧬 **Molecule Sandbox**
- **Drag-and-Drop Interface:** Spawn atoms and move them freely in 3D space
- **Smart Bonding:** Atoms automatically snap together based on proximity and valency rules
- **Chemistry Rules:** Respects real valency (H=1, O=2, C=4, N=3)
- **Molecule Recognition:** Discover and track molecules you create (H₂O, CH₄, CO₂, NH₃)
- **Recipe Book:** Your discoveries are saved and celebrated

### 📊 **Interactive Periodic Table**
- **Full 18-Column Layout:** Authentic periodic table grid with all 118 elements
- **Complete Coverage:** All 7 periods including lanthanides and actinides
- **Category Color-Coding:** Noble gases, alkali metals, halogens, transition metals, metalloids, and more
- **Live Descriptions:** Click any element to see detailed information at your chosen complexity level
- **Responsive Design:** Optimized for desktop and tablet viewing

### 📤 **Export & Sharing**
- **Screenshot Export:** Capture high-quality PNG images of any visualization
- **3D Model Export:** Download GLTF files for use in other 3D applications
- **Embed Code:** Generate embed snippets to share visualizations on websites

### 📚 **Guided Tutorials**
- **Interactive Learning Paths:** Step-by-step tutorials for atomic structure, bonding, and reactions
- **Dual Complexity Levels:** High School (basic concepts) and University (advanced theory)
- **3D Annotations:** Contextual labels pointing to relevant parts of the visualization
- **Progress Tracking:** Navigate through lessons with next/back controls

### 🎓 **Complexity Toggle**
- **High School Mode:** Simplified explanations focused on core concepts
- **University Mode:** Advanced content including electron configurations, electronegativity, and molecular orbital theory

---

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 19.2** - Modern component architecture with hooks
- **Vite 7.2** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.1** - Utility-first styling with custom design system

### **3D Rendering & Animation**
- **Three.js 0.181** - WebGL 3D graphics engine
- **@react-three/fiber 9.4** - React renderer for Three.js
- **@react-three/drei 10.7** - Useful helpers and abstractions
- **@react-three/postprocessing 3.0** - Bloom effects and visual polish

### **Animation Libraries**
- **Framer Motion 11** - UI animations and transitions (React 19 compatible)
- **@react-spring/three 10.0** - Physics-based 3D animations

### **UI/UX Enhancements**
- **Lucide React** - Beautiful, consistent icon set
- **Glassmorphism** - Modern frosted-glass aesthetic
- **Custom Gradients** - Dynamic color schemes per element category

### **Code Quality**
- **ESLint** - Code linting and consistency
- **PostCSS** - CSS processing pipeline

---

## 🎨 Design Philosophy

**Premium First:** Every interaction is designed to "wow" the user with smooth animations, vibrant colors, and rich visual feedback.

**Educational Focus:** Complex chemistry concepts are broken down into intuitive, visual experiences that build understanding through exploration.

**Performance-Optimized:** Efficient rendering ensures smooth 60fps animations even with complex molecular structures.

---

## 🚀 Roadmap

### ✅ **Phase 1: The Builder** (Completed)
- [x] Atom Builder (God Mode)
- [x] Molecule Sandbox with valency-based bonding
- [x] Recipe book for discovered molecules

### ✅ **Phase 2: Enhanced Visualization** (Completed)
- [x] Expanded periodic table (all 118 elements)
- [x] Element descriptions and metadata
- [x] Post-processing effects (Bloom)
- [x] Smooth reaction animations

### ✅ **Phase 3: Advanced Chemistry** (Completed)
- [x] Ionic bonding visualization
- [x] Covalent vs ionic bond differentiation (single, double, triple, polar bonds)
- [x] Quantum orbital visualization (s, p, d, f orbitals)
- [x] Nuclear reactions (fission, fusion, decay)
- [x] 20+ reaction library

### ✅ **Phase 4: Educational Tools** (Completed)
- [x] Guided tutorial system with step-by-step lessons
- [x] Complexity toggle (High School / University)
- [x] Export screenshots (PNG)
- [x] Export 3D models (GLTF)
- [x] Playback speed control

### 🌐 **Phase 5: Deployment & Scale** (Planned)
- [ ] Progressive Web App (PWA)
- [ ] Mobile-optimized interface
- [ ] Teacher dashboard for classrooms
- [ ] API for third-party integrations

---

## 🎬 Demo

### Screenshots

<img width="1914" height="1014" alt="image" src="https://github.com/user-attachments/assets/2a842b21-e449-4535-ba1d-ccfc91016330" />
<img width="1604" height="917" alt="image" src="https://github.com/user-attachments/assets/4c5ce271-9a6e-4d9b-bfcb-f0545ee054e9" />
<img width="1873" height="967" alt="image" src="https://github.com/user-attachments/assets/71b6ff4b-3486-4bc7-9afd-d1e678e0a407" />


---

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mayukhbh/atomic-viz.git

# Navigate to project directory
cd atomic-viz

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app in action!

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
atomic-viz/
├── src/
│   ├── components/              # React components
│   │   ├── atoms/              # Atom visualization modules
│   │   │   ├── BohrModel.jsx   # Classic electron shell visualization
│   │   │   └── QuantumOrbitals.jsx # s/p/d/f orbital shapes
│   │   ├── bonds/              # Bond visualization components
│   │   │   ├── CovalentBond.jsx
│   │   │   ├── IonicBond.jsx
│   │   │   └── PolarBond.jsx
│   │   ├── export/             # Export functionality
│   │   │   └── ExportPanel.jsx
│   │   ├── tutorials/          # Tutorial system
│   │   │   ├── TutorialMenu.jsx
│   │   │   └── TutorialOverlay.jsx
│   │   ├── Atom.jsx            # 3D atom visualization
│   │   ├── PeriodicTable.jsx   # Interactive table (118 elements)
│   │   └── ReactionRenderer.jsx # Ball-and-stick reaction animations
│   ├── context/                # React context providers
│   │   └── SettingsContext.jsx # Global settings (complexity, orbital mode)
│   ├── data/                   # Static data
│   │   ├── elements.js         # All 118 elements with descriptions
│   │   ├── reactions.js        # 20+ reaction definitions
│   │   └── tutorials/          # Tutorial content
│   ├── utils/                  # Utility functions
│   │   ├── orbitalGeometry.js  # Orbital shape mathematics
│   │   └── exportHelpers.js    # Export utilities
│   ├── App.jsx                 # Main application
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── public/                     # Static assets
├── package.json
└── README.md
```

---

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are always welcome! Feel free to open an issue or reach out.

---

## 👨‍💻 About the Developer

Product Manager having fun building applications with AI agents. 

---

## 📄 License

MIT License - feel free to use this project for learning and inspiration!

---

## 🙏 Acknowledgments

- **React Three Fiber** team for incredible 3D React abstractions
- **Three.js** community for comprehensive documentation
- Chemistry data sourced from public datasets and educational resources

---

**⭐ If you found this project interesting, please consider giving it a star!**
