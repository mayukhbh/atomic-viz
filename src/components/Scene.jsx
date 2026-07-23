import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { StudioEnvironment } from './viewer/StudioEnvironment';

export const Scene = ({ children }) => {
    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, powerPreference: 'high-performance' }}
            style={{ background: 'radial-gradient(circle at 50% 30%, #0b1120 0%, #060912 55%, #04060a 100%)' }}
        >
            <AdaptiveDpr pixelated />
            <hemisphereLight intensity={0.25} groundColor="#0a0f1a" color="#a9c7ff" />
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#5b8bff" />
            <pointLight position={[0, 6, -10]} intensity={0.7} color="#7de3ff" />

            <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />
            <StudioEnvironment />

            <group>{children}</group>

            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} intensity={0.9} mipmapBlur />
                <Vignette eskil={false} offset={0.2} darkness={0.7} />
            </EffectComposer>

            <OrbitControls makeDefault enableDamping dampingFactor={0.08} enablePan={false} minDistance={4} maxDistance={20} />
        </Canvas>
    );
};
