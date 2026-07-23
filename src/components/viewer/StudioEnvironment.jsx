import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';

// A fully self-contained image-based-lighting environment built from Lightformers.
// Renders locally to a cube target — no network/HDR fetch — so clearcoat materials get
// rich studio reflections everywhere the app runs (including offline / sandboxed hosts).
export function StudioEnvironment() {
  return (
    <Environment resolution={256} frames={1}>
      {/* soft top key */}
      <Lightformer form="rect" intensity={2.2} color="#ffffff" position={[0, 6, 2]} scale={[10, 6, 1]} rotation={[-Math.PI / 2, 0, 0]} />
      {/* cool rim from behind */}
      <Lightformer form="rect" intensity={1.4} color="#7db4ff" position={[-6, 2, -6]} scale={[8, 8, 1]} rotation={[0, Math.PI / 4, 0]} />
      {/* warm accent */}
      <Lightformer form="rect" intensity={1.1} color="#ffd9b3" position={[6, 0, 4]} scale={[6, 6, 1]} rotation={[0, -Math.PI / 3, 0]} />
      {/* fill from below */}
      <Lightformer form="circle" intensity={0.6} color="#2a3550" position={[0, -5, 0]} scale={[10, 10, 1]} rotation={[Math.PI / 2, 0, 0]} />
    </Environment>
  );
}
