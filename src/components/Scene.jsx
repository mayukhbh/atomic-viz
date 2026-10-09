import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { COMPACT_MAX_WIDTH, FRAMING, fitDistance, shouldRefitCamera } from '../engine/atomFraming';
import { SafeCanvas as Canvas } from './viewer/SafeCanvas';
import { OrbitControls, Stars, AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { StudioEnvironment } from './viewer/StudioEnvironment';

// Frames a sphere of `radius` around the origin whenever the radius or viewport changes.
// Keeps the user's current viewing direction and only changes the distance. On phones the
// projection is offset so the atom sits in the upper part of the screen, above the text.
function FitCamera({ radius }) {
    const previous = useRef(null);
    const camera = useThree((state) => state.camera);
    const width = useThree((state) => state.size.width);
    const height = useThree((state) => state.size.height);
    useEffect(() => {
        if (!radius || !width || !height) return;
        const compact = width <= COMPACT_MAX_WIDTH;
        const distance = fitDistance({ radius, fovDeg: camera.fov, aspect: width / height, compact });
        const currentDistance = camera.position.length();
        if (shouldRefitCamera(previous.current, { radius, width, height, distance: currentDistance })) {
            const direction = currentDistance > 1e-6 ? camera.position.clone().normalize() : camera.position.set(0, 0, 1);
            camera.position.copy(direction.multiplyScalar(distance));
        }
        previous.current = { radius, width, height, distance: camera.position.length() };
        const shift = compact ? FRAMING.compact.shift : FRAMING.roomy.shift;
        if (shift) camera.setViewOffset(width, height, 0, Math.round(height * shift), width, height);
        else camera.clearViewOffset();
        camera.updateProjectionMatrix();
    }, [camera, radius, width, height]);
    return null;
}

export const Scene = ({ children, fitRadius }) => {
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

            {fitRadius ? <FitCamera radius={fitRadius} /> : null}
            <OrbitControls makeDefault enableDamping dampingFactor={0.08} enablePan={false} minDistance={4} maxDistance={Math.max(20, (fitRadius || 0) * 8)} />
        </Canvas>
    );
};
