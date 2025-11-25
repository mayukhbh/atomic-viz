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
- **Real-time Electron Visualization:** See electron shells orbiting the nucleus with physics-based animations
- **36+ Elements:** Comprehensive database covering elements from Hydrogen to Krypton, plus key metals (Gold, Silver, Uranium)
- **Element Information:** Detailed descriptions, atomic mass, and fun facts for each element

### 🧪 **Reaction Lab**
- **Animated Chemical Reactions:** Watch molecules form and break apart in real-time
- **Multiple Reaction Types:**
  - Water Formation (H₂ + O₂ → H₂O)
  - Salt Formation (Na + Cl → NaCl)
  - Photosynthesis
  - Methane Combustion
- **Step-by-Step Visualization:** Pause, play, and step through each reaction stage
- **Smooth Transitions:** Physics-based animations using react-spring

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
- **Full 18-Column Layout:** Authentic periodic table grid
- **40+ Elements:** Rows 1-4 complete, plus precious metals
- **Category Color-Coding:** Noble gases, alkali metals, halogens, transition metals, etc.
- **Live Descriptions:** Click any element to see detailed information and fun facts
- **Responsive Design:** Optimized for desktop and tablet viewing

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
- **Framer Motion 10.18** - UI animations and transitions
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
- [x] Expanded periodic table (36+ elements)
- [x] Element descriptions and metadata
- [x] Post-processing effects (Bloom)
- [x] Smooth reaction animations

### 🚧 **Phase 3: Advanced Chemistry** (In Progress)
- [ ] Ionic bonding visualization
- [ ] Covalent vs ionic bond differentiation
- [ ] Electronegativity indicators
- [ ] Nuclear decay simulations

### 📋 **Phase 4: Educational Tools** (Planned)
- [ ] Quiz mode with interactive challenges
- [ ] Save/load custom molecules
- [ ] Export 3D models for printing
- [ ] Collaborative molecule building

### 🌐 **Phase 5: Deployment & Scale** (Planned)
- [ ] Progressive Web App (PWA)
- [ ] Mobile-optimized interface
- [ ] Teacher dashboard for classrooms
- [ ] API for third-party integrations

---

## 🎬 Demo

### Screenshots

*(Add screenshots of your application here - Atom Explorer, Reaction Lab, Molecule Sandbox, Periodic Table)*

### Live Demo

**[Visit Live Site](#)** *(Add your deployment URL here)*

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
│   ├── components/          # React components
│   │   ├── Atom.jsx        # 3D atom visualization
│   │   ├── AtomBuilder.jsx # Interactive atom builder
│   │   ├── Molecule.jsx    # Molecule renderer
│   │   ├── MoleculeSandbox.jsx # Drag-drop sandbox
│   │   ├── PeriodicTable.jsx   # Interactive table
│   │   ├── ReactionRenderer.jsx # Reaction animations
│   │   └── Scene.jsx       # 3D scene setup
│   ├── data/               # Static data
│   │   ├── elements.js     # Element properties & descriptions
│   │   └── reactions.js    # Reaction definitions
│   ├── App.jsx             # Main application
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── public/                 # Static assets
├── package.json
└── README.md
```

---

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are always welcome! Feel free to open an issue or reach out.

---

## 👨‍💻 About the Developer

**Mayukh Bhattacharyya** - Product-focused engineer passionate about building educational tools that make learning interactive and fun.

**Skills Demonstrated:**
- ✅ Modern React development (hooks, state management, component architecture)
- ✅ 3D graphics and WebGL with Three.js
- ✅ Complex animation systems
- ✅ UI/UX design and implementation
- ✅ Data modeling and chemistry domain knowledge
- ✅ Performance optimization for real-time rendering
- ✅ Product thinking and roadmap planning

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
