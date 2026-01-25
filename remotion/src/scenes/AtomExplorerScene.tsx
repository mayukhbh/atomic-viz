import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from 'remotion';
import { ParticleField, EnergyWave } from '../components/ParticleField';
import { AtomViz } from '../components/AtomViz';
import { QuantumAtom, quantumAtoms } from '../components/QuantumAtom';
import { GlassCard } from '../components/GlassCard';
import { colors } from '../lib/colors';
import { springConfigs } from '../lib/animations';

// Showcase elements with vibrant colors - Bohr model data
const bohrElements = [
  {
    symbol: 'Li',
    name: 'Lithium',
    atomicNumber: 3,
    color: colors.electricPink,
    category: 'Alkali Metal',
    config: '1s² 2s¹',
    shells: [
      { electrons: 2, radius: 140 },
      { electrons: 1, radius: 280 },
    ],
  },
  {
    symbol: 'Ne',
    name: 'Neon',
    atomicNumber: 10,
    color: colors.neon,
    category: 'Noble Gas',
    config: '1s² 2s² 2p⁶',
    shells: [
      { electrons: 2, radius: 120 },
      { electrons: 8, radius: 260 },
    ],
  },
  {
    symbol: 'Fe',
    name: 'Iron',
    atomicNumber: 26,
    color: colors.iron,
    category: 'Transition Metal',
    config: '[Ar] 3d⁶ 4s²',
    shells: [
      { electrons: 2, radius: 80 },
      { electrons: 8, radius: 150 },
      { electrons: 14, radius: 230 },
      { electrons: 2, radius: 320 },
    ],
  },
];

export const AtomExplorerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Element cycling - each element shown in both modes
  const cycleDuration = 100; // frames per element-mode combination
  const totalCycleFrame = frame % (cycleDuration * 2); // 2 modes per element
  const elementIndex = Math.min(
    Math.floor(frame / (cycleDuration * 2)),
    bohrElements.length - 1
  );
  const currentElement = bohrElements[elementIndex];
  const isQuantumMode = totalCycleFrame >= cycleDuration;
  const modeFrame = totalCycleFrame % cycleDuration;

  // Get corresponding quantum atom
  const quantumElementMap: Record<string, keyof typeof quantumAtoms> = {
    Li: 'lithium',
    Ne: 'neon',
    Fe: 'iron',
  };
  const quantumElement = quantumAtoms[quantumElementMap[currentElement.symbol]];

  // Title entrance
  const titleProgress = spring({
    frame,
    fps,
    config: springConfigs.smooth,
  });

  // Element/mode transition
  const elementProgress = spring({
    frame: modeFrame,
    fps,
    config: { damping: 20, stiffness: 100, mass: 1 },
  });

  // Exit animation
  const exitProgress =
    modeFrame > cycleDuration - 25
      ? spring({
          frame: modeFrame - (cycleDuration - 25),
          fps,
          config: springConfigs.smooth,
        })
      : 0;

  // Mode switch animation
  const modeSwitchProgress = spring({
    frame: modeFrame - 5,
    fps,
    config: springConfigs.bouncy,
  });

  return (
    <div style={{ width, height, position: 'relative', overflow: 'hidden' }}>
      <ParticleField count={200} fadeIn={false} intensity="medium" />

      {/* Energy wave on mode/element change */}
      {modeFrame < 30 && (
        <EnergyWave
          x={width * 0.38}
          y={height * 0.52}
          color={isQuantumMode ? colors.purpleLight : currentElement.color}
          delay={0}
          size={900}
        />
      )}

      {/* Section header - large and bold */}
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
            background: colors.gradients.cyanPurple,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 40px ${colors.cyan}40)`,
          }}
        >
          Atom Explorer
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 500,
            color: colors.grayLight,
            marginTop: 16,
            letterSpacing: '0.05em',
          }}
        >
          118 Elements • Bohr & Quantum Models
        </div>
      </div>

      {/* Central atom visualization - switches between Bohr and Quantum */}
      <div
        style={{
          position: 'absolute',
          left: width * 0.38,
          top: height * 0.55,
          transform: `translate(-50%, -50%) scale(${elementProgress * (1 - exitProgress * 0.4)})`,
          opacity: 1 - exitProgress,
        }}
      >
        {isQuantumMode ? (
          // Quantum model - probability clouds
          <QuantumAtom
            {...quantumElement}
            size={900}
            animate
            delay={0}
            showLabel
          />
        ) : (
          // Bohr model - orbital rings
          <AtomViz
            {...currentElement}
            size={900}
            animate
            delay={0}
            glowIntensity={2}
            electronSize={28}
          />
        )}
      </div>

      {/* Mode indicator overlay */}
      <div
        style={{
          position: 'absolute',
          left: width * 0.38,
          top: height * 0.15,
          transform: 'translateX(-50%)',
          opacity: modeSwitchProgress,
        }}
      >
        <div
          style={{
            padding: '16px 48px',
            borderRadius: 16,
            background: isQuantumMode
              ? `${colors.purpleLight}25`
              : `${colors.cyan}25`,
            border: `3px solid ${isQuantumMode ? colors.purpleLight : colors.cyan}50`,
            fontSize: 36,
            fontWeight: 700,
            color: isQuantumMode ? colors.purpleLight : colors.cyan,
            textShadow: `0 0 20px ${isQuantumMode ? colors.purpleLight : colors.cyan}`,
          }}
        >
          {isQuantumMode ? '⚛ Quantum Model' : '◎ Bohr Model'}
        </div>
      </div>

      {/* Element info panel - large and prominent */}
      <Sequence from={20}>
        <div
          style={{
            position: 'absolute',
            right: 140,
            top: height * 0.28,
            opacity:
              spring({ frame: modeFrame - 25, fps, config: springConfigs.smooth }) *
              (1 - exitProgress),
            transform: `translateX(${interpolate(
              spring({ frame: modeFrame - 25, fps, config: springConfigs.smooth }),
              [0, 1],
              [80, 0]
            )}px)`,
          }}
        >
          <GlassCard
            width={800}
            padding={60}
            borderRadius={40}
            showGlow
            glowColor={isQuantumMode ? colors.purpleLight : currentElement.color}
            borderColor={`${isQuantumMode ? colors.purpleLight : currentElement.color}50`}
          >
            {/* Element header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginBottom: 40 }}>
              {/* Symbol badge */}
              <div
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: 36,
                  background: `linear-gradient(135deg, ${currentElement.color}30 0%, ${currentElement.color}10 100%)`,
                  border: `4px solid ${currentElement.color}60`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 100,
                  fontWeight: 900,
                  color: currentElement.color,
                  textShadow: `0 0 40px ${currentElement.color}`,
                }}
              >
                {currentElement.symbol}
              </div>
              <div>
                <div style={{ fontSize: 72, fontWeight: 800, color: colors.white }}>
                  {currentElement.name}
                </div>
                <div style={{ fontSize: 36, color: colors.grayLight, marginTop: 8 }}>
                  Atomic Number: {currentElement.atomicNumber}
                </div>
                <div
                  style={{
                    fontSize: 28,
                    color: currentElement.color,
                    marginTop: 12,
                    padding: '8px 20px',
                    background: `${currentElement.color}15`,
                    borderRadius: 12,
                    display: 'inline-block',
                  }}
                >
                  {currentElement.category}
                </div>
              </div>
            </div>

            {/* Electron configuration */}
            <div style={{ fontSize: 32, color: colors.gray, marginBottom: 20 }}>
              {isQuantumMode ? 'Quantum Configuration' : 'Electron Shells'}
            </div>

            {isQuantumMode ? (
              // Quantum notation
              <div
                style={{
                  padding: '24px 36px',
                  borderRadius: 16,
                  background: `${colors.purpleLight}12`,
                  border: `2px solid ${colors.purpleLight}30`,
                  fontSize: 36,
                  fontWeight: 600,
                  fontFamily: 'monospace',
                  color: colors.purpleLight,
                }}
              >
                {currentElement.config}
              </div>
            ) : (
              // Bohr shell notation
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {currentElement.shells.map((shell, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '18px 36px',
                      borderRadius: 16,
                      background: `${colors.cyan}12`,
                      border: `2px solid ${colors.cyan}30`,
                      fontSize: 28,
                      fontWeight: 600,
                      color: colors.cyan,
                    }}
                  >
                    Shell {i + 1}: {shell.electrons}e⁻
                  </div>
                ))}
              </div>
            )}

            {/* View mode toggle */}
            <div style={{ marginTop: 50, display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ fontSize: 28, color: colors.gray }}>View Mode:</div>
              <div
                style={{
                  display: 'flex',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 16,
                  padding: 8,
                }}
              >
                {['Bohr', 'Quantum'].map((mode, i) => {
                  const isActive = isQuantumMode ? i === 1 : i === 0;
                  return (
                    <div
                      key={mode}
                      style={{
                        padding: '16px 40px',
                        borderRadius: 12,
                        fontSize: 24,
                        fontWeight: 600,
                        background: isActive
                          ? i === 0
                            ? colors.cyan
                            : colors.purpleLight
                          : 'transparent',
                        color: isActive ? colors.background : colors.grayLight,
                        boxShadow: isActive
                          ? `0 0 20px ${i === 0 ? colors.cyan : colors.purpleLight}50`
                          : 'none',
                      }}
                    >
                      {mode}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Model description */}
            <div
              style={{
                marginTop: 30,
                fontSize: 24,
                color: colors.grayLight,
                lineHeight: 1.5,
              }}
            >
              {isQuantumMode
                ? 'Showing electron probability distributions based on quantum mechanics'
                : 'Classical model showing electrons in circular orbits around the nucleus'}
            </div>
          </GlassCard>
        </div>
      </Sequence>

      {/* Progress indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: width / 2,
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 24,
        }}
      >
        {bohrElements.map((el, i) => {
          const isCurrentElement = i === elementIndex;
          return (
            <div
              key={el.symbol}
              style={{
                display: 'flex',
                gap: 8,
              }}
            >
              {/* Bohr indicator */}
              <div
                style={{
                  width: isCurrentElement && !isQuantumMode ? 40 : 20,
                  height: 20,
                  borderRadius: 10,
                  background:
                    isCurrentElement && !isQuantumMode
                      ? colors.cyan
                      : i < elementIndex || (i === elementIndex && isQuantumMode)
                      ? colors.cyan + '60'
                      : 'rgba(255,255,255,0.2)',
                  boxShadow:
                    isCurrentElement && !isQuantumMode ? `0 0 20px ${colors.cyan}` : 'none',
                }}
              />
              {/* Quantum indicator */}
              <div
                style={{
                  width: isCurrentElement && isQuantumMode ? 40 : 20,
                  height: 20,
                  borderRadius: 10,
                  background:
                    isCurrentElement && isQuantumMode
                      ? colors.purpleLight
                      : i < elementIndex
                      ? colors.purpleLight + '60'
                      : 'rgba(255,255,255,0.2)',
                  boxShadow:
                    isCurrentElement && isQuantumMode ? `0 0 20px ${colors.purpleLight}` : 'none',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
