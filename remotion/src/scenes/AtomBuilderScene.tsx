import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from 'remotion';
import { ParticleField, EnergyWave } from '../components/ParticleField';
import { GlassCard } from '../components/GlassCard';
import { colors } from '../lib/colors';
import { springConfigs } from '../lib/animations';

// Large particle component with premium effects
const Particle: React.FC<{
  type: 'proton' | 'neutron' | 'electron';
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
}> = ({ type, x, y, scale = 1, opacity = 1 }) => {
  const config = {
    proton: { color: colors.proton, symbol: 'p⁺', size: 80, glow: colors.proton },
    neutron: { color: colors.neutron, symbol: 'n⁰', size: 80, glow: colors.grayLight },
    electron: { color: colors.electron, symbol: 'e⁻', size: 50, glow: colors.cyan },
  }[type];

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: config.size,
        height: config.size,
        borderRadius: '50%',
        background: `radial-gradient(circle at 35% 35%, ${colors.white}50, ${config.color} 50%, ${config.color}90)`,
        boxShadow: `0 0 ${config.size}px ${config.glow}80, 0 0 ${config.size * 2}px ${config.glow}40`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: config.size * 0.4,
        fontWeight: 800,
        color: colors.white,
        textShadow: `0 0 10px ${config.color}`,
        opacity,
      }}
    >
      {config.symbol}
    </div>
  );
};

export const AtomBuilderScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Title entrance
  const titleProgress = spring({
    frame,
    fps,
    config: springConfigs.smooth,
  });

  // Nucleus area position - large and centered
  const nucleusX = width * 0.42;
  const nucleusY = height * 0.52;
  const orbitRadius = 220;

  // Particle animation timings
  const particles: {
    type: 'proton' | 'neutron' | 'electron';
    targetX: number;
    targetY: number;
    delay: number;
  }[] = [
    { type: 'proton', targetX: nucleusX - 30, targetY: nucleusY - 20, delay: 25 },
    { type: 'proton', targetX: nucleusX + 30, targetY: nucleusY + 20, delay: 50 },
    { type: 'neutron', targetX: nucleusX + 20, targetY: nucleusY - 30, delay: 80 },
    { type: 'neutron', targetX: nucleusX - 20, targetY: nucleusY + 30, delay: 105 },
  ];

  // Counters
  const protonCount = Math.min(2, Math.max(0, Math.floor((frame - 25) / 25)));
  const neutronCount = Math.min(2, Math.max(0, Math.floor((frame - 80) / 25)));
  const electronCount = Math.min(2, Math.max(0, Math.floor((frame - 140) / 25)));

  // Completion state
  const isComplete = frame > 200;
  const celebrationPulse = isComplete ? 1 + Math.sin((frame - 200) * 0.08) * 0.15 : 1;

  // Panel animation
  const panelProgress = spring({
    frame: frame - 15,
    fps,
    config: springConfigs.smooth,
  });

  return (
    <div style={{ width, height, position: 'relative', overflow: 'hidden' }}>
      <ParticleField count={150} fadeIn={false} intensity="medium" />

      {/* Completion energy wave */}
      {isComplete && frame < 230 && (
        <EnergyWave x={nucleusX} y={nucleusY} color={colors.green} delay={200} size={800} />
      )}

      {/* Section header */}
      <div
        style={{
          position: 'absolute',
          left: 140,
          top: 120,
          opacity: titleProgress,
          transform: `translateX(${interpolate(titleProgress, [0, 1], [-60, 0])}px)`,
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            letterSpacing: '-0.03em',
            background: colors.gradients.aurora,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 40px ${colors.green}40)`,
          }}
        >
          Atom Builder
        </div>
        <div style={{ fontSize: 48, fontWeight: 500, color: colors.grayLight, marginTop: 16 }}>
          Build Atoms Particle by Particle
        </div>
      </div>

      {/* Orbital rings */}
      <div
        style={{
          position: 'absolute',
          left: nucleusX - orbitRadius,
          top: nucleusY - orbitRadius,
          width: orbitRadius * 2,
          height: orbitRadius * 2,
          borderRadius: '50%',
          border: `4px dashed ${colors.cyan}30`,
          opacity: frame > 130 ? 1 : 0,
          boxShadow: `0 0 40px ${colors.cyan}15, inset 0 0 40px ${colors.cyan}08`,
        }}
      />

      {/* Nucleus glow area */}
      <div
        style={{
          position: 'absolute',
          left: nucleusX,
          top: nucleusY,
          transform: `translate(-50%, -50%) scale(${celebrationPulse})`,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.proton}40 0%, ${colors.neutron}20 50%, transparent 70%)`,
          filter: 'blur(30px)',
          opacity: frame > 50 ? 1 : 0,
        }}
      />

      {/* Nucleus particles */}
      {particles.map((particle, i) => {
        const progress = spring({
          frame: frame - particle.delay,
          fps,
          config: { damping: 18, stiffness: 120, mass: 1 },
        });

        const startX = width * 0.82;
        const startY = height * (0.25 + i * 0.15);

        const currentX = interpolate(progress, [0, 1], [startX, particle.targetX]);
        const currentY = interpolate(progress, [0, 1], [startY, particle.targetY]);

        return (
          <Particle
            key={i}
            type={particle.type}
            x={currentX}
            y={currentY}
            scale={interpolate(progress, [0, 0.5, 1], [1, 1.4, 1])}
          />
        );
      })}

      {/* Orbiting electrons */}
      {[0, 1].map((i) => {
        const electronDelay = 140 + i * 25;
        const electronProgress = spring({
          frame: frame - electronDelay,
          fps,
          config: springConfigs.smooth,
        });

        if (electronProgress <= 0) return null;

        const angle = frame * 0.04 + i * Math.PI;
        const electronX = nucleusX + Math.cos(angle) * orbitRadius * electronProgress;
        const electronY = nucleusY + Math.sin(angle) * orbitRadius * electronProgress;

        // Electron trail
        const trailCount = 5;
        const trails = Array.from({ length: trailCount }).map((_, t) => {
          const trailAngle = (frame - t * 2) * 0.04 + i * Math.PI;
          return {
            x: nucleusX + Math.cos(trailAngle) * orbitRadius * electronProgress,
            y: nucleusY + Math.sin(trailAngle) * orbitRadius * electronProgress,
            opacity: (1 - t / trailCount) * 0.4,
          };
        });

        return (
          <React.Fragment key={`electron-${i}`}>
            {/* Trails */}
            {trails.map((trail, t) => (
              <div
                key={t}
                style={{
                  position: 'absolute',
                  left: trail.x,
                  top: trail.y,
                  transform: 'translate(-50%, -50%)',
                  width: 25,
                  height: 25,
                  borderRadius: '50%',
                  background: colors.cyan,
                  opacity: trail.opacity * electronProgress,
                  boxShadow: `0 0 20px ${colors.cyan}`,
                }}
              />
            ))}
            {/* Main electron */}
            <Particle
              type="electron"
              x={electronX}
              y={electronY}
              opacity={electronProgress}
            />
          </React.Fragment>
        );
      })}

      {/* Builder panel */}
      <Sequence from={10}>
        <div
          style={{
            position: 'absolute',
            right: 140,
            top: height * 0.25,
            opacity: panelProgress,
            transform: `translateX(${interpolate(panelProgress, [0, 1], [80, 0])}px)`,
          }}
        >
          <GlassCard width={600} padding={50} borderRadius={36} showGlow glowColor={colors.cyan}>
            <div
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: colors.white,
                marginBottom: 40,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
              }}
            >
              <span
                style={{
                  fontSize: 72,
                  background: colors.gradients.cyanPurple,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                He
              </span>
              <span>Helium</span>
            </div>

            {/* Particle counters */}
            {[
              { label: 'Protons', count: protonCount, target: 2, color: colors.proton },
              { label: 'Neutrons', count: neutronCount, target: 2, color: colors.neutron },
              { label: 'Electrons', count: electronCount, target: 2, color: colors.electron },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 24,
                  padding: '24px 32px',
                  borderRadius: 20,
                  background: `${item.color}12`,
                  border: `2px solid ${item.color}40`,
                }}
              >
                <span style={{ fontSize: 32, fontWeight: 600, color: colors.grayLight }}>
                  {item.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {/* Progress dots */}
                  {Array.from({ length: item.target }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: i < item.count ? item.color : 'rgba(255,255,255,0.1)',
                        boxShadow: i < item.count ? `0 0 15px ${item.color}` : 'none',
                      }}
                    />
                  ))}
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 800,
                      color: item.color,
                      marginLeft: 12,
                    }}
                  >
                    {item.count}/{item.target}
                  </span>
                </div>
              </div>
            ))}

            {/* Status indicator */}
            <div
              style={{
                marginTop: 32,
                padding: '24px 40px',
                borderRadius: 20,
                background: isComplete ? `${colors.green}20` : 'rgba(255,255,255,0.05)',
                border: `3px solid ${isComplete ? colors.green : 'transparent'}`,
                textAlign: 'center',
                fontSize: 36,
                fontWeight: 700,
                color: isComplete ? colors.green : colors.grayLight,
                boxShadow: isComplete ? `0 0 40px ${colors.green}30` : 'none',
              }}
            >
              {isComplete ? '✓ Atom Complete!' : 'Building...'}
            </div>
          </GlassCard>
        </div>
      </Sequence>

      {/* Completion celebration effect */}
      {isComplete && (
        <div
          style={{
            position: 'absolute',
            left: nucleusX,
            top: nucleusY,
            transform: 'translate(-50%, -50%)',
            width: 500 * celebrationPulse,
            height: 500 * celebrationPulse,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.green}20 0%, ${colors.cyan}10 50%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
