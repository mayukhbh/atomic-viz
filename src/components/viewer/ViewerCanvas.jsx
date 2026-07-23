import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { StudioEnvironment } from './StudioEnvironment';

// A premium "studio" canvas: soft key/fill/rim lighting, contact shadow, gentle bloom
// and a vignette. Shared by the molecule viewer and organic sections for a cohesive look.
export function ViewerCanvas({
  children,
  cameraPosition = [0, 1.2, 7],
  fov = 42,
  autoRotateControls = false,
  enableZoom = true,
  shadow = true,
  bloom = 0.7,
  background = 'radial-gradient(circle at 50% 35%, #101826 0%, #070a12 60%, #04060a 100%)',
}) {
  return (
    <Canvas
      camera={{ position: cameraPosition, fov }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ background }}
    >
      <AdaptiveDpr pixelated />
      <hemisphereLight intensity={0.35} groundColor="#0a0f1a" color="#a9c7ff" />
      <ambientLight intensity={0.25} />
      {/* key */}
      <spotLight position={[6, 8, 6]} angle={0.5} penumbra={0.8} intensity={2.2} color="#ffffff" castShadow={shadow} />
      {/* fill */}
      <pointLight position={[-6, -2, 4]} intensity={0.5} color="#5b8bff" />
      {/* rim */}
      <pointLight position={[0, 4, -8]} intensity={0.9} color="#7de3ff" />

      <group position={[0, 0, 0]}>{children}</group>

      {shadow && (
        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.45}
          scale={16}
          blur={2.6}
          far={5}
          color="#000000"
        />
      )}

      <StudioEnvironment />

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.35} luminanceSmoothing={0.9} intensity={bloom} mipmapBlur />
        <Vignette eskil={false} offset={0.15} darkness={0.75} />
      </EffectComposer>

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        enableZoom={enableZoom}
        autoRotate={autoRotateControls}
        autoRotateSpeed={0.6}
        minDistance={3}
        maxDistance={16}
      />
    </Canvas>
  );
}
