import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from 'remotion';
import { ParticleField, EnergyWave } from '../components/ParticleField';
import { GlassCard } from '../components/GlassCard';
import { colors } from '../lib/colors';
import { springConfigs } from '../lib/animations';

// Large sandbox atom
const SandboxAtom: React.FC<{
  symbol: string;
  color: string;
  x: number;
  y: number;
  size?: number;
  selected?: boolean;
}> = ({ symbol, color, x, y, size = 120, selected = false }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at 35% 35%, ${colors.white}50, ${color} 45%, ${color}90)`,
        boxShadow: selected
          ? `0 0 60px ${color}, 0 0 120px ${color}60, inset 0 0 30px ${colors.white}20`
          : `0 0 40px ${color}60, 0 0 80px ${color}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.45,
        fontWeight: 900,
        color: colors.white,
        textShadow: `0 0 20px ${color}`,
        border: selected ? `4px solid ${colors.white}` : 'none',
      }}
    >
      {symbol}
    </div>
  );
};

// Glowing bond line
const Bond: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress: number;
  color?: string;
}> = ({ x1, y1, x2, y2, progress, color = colors.cyan }) => {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  return (
    <div
      style={{
        position: 'absolute',
        left: x1,
        top: y1,
        width: length * progress,
        height: 12,
        background: `linear-gradient(90deg, ${color}, ${colors.purpleLight}, ${color})`,
        borderRadius: 6,
        transformOrigin: 'left center',
        transform: `rotate(${angle}deg)`,
        boxShadow: `0 0 20px ${color}80, 0 0 40px ${color}40`,
      }}
    />
  );
};

export const MoleculeSandboxScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Title entrance
  const titleProgress = spring({
    frame,
    fps,
    config: springConfigs.smooth,
  });

  // Sandbox center
  const sandboxX = width * 0.42;
  const sandboxY = height * 0.52;

  // Carbon position animation
  const carbonProgress = spring({
    frame: frame - 50,
    fps,
    config: springConfigs.smooth,
  });
  const carbonX = interpolate(carbonProgress, [0, 1], [width * 0.75, sandboxX]);
  const carbonY = interpolate(carbonProgress, [0, 1], [height * 0.35, sandboxY]);

  // Hydrogen positions (forming CH4 tetrahedral-ish)
  const hydrogenData = [
    { endX: sandboxX - 180, endY: sandboxY, delay: 100 },
    { endX: sandboxX + 180, endY: sandboxY, delay: 130 },
    { endX: sandboxX, endY: sandboxY - 180, delay: 160 },
    { endX: sandboxX, endY: sandboxY + 180, delay: 190 },
  ];

  // Bond animations
  const bondProgresses = hydrogenData.map((h) =>
    spring({
      frame: frame - h.delay - 25,
      fps,
      config: springConfigs.smooth,
    })
  );

  // Panel animation
  const panelProgress = spring({
    frame: frame - 20,
    fps,
    config: springConfigs.smooth,
  });

  // Validation state
  const isValid = frame > 250;
  const validationProgress = spring({
    frame: frame - 250,
    fps,
    config: springConfigs.bouncy,
  });

  return (
    <div style={{ width, height, position: 'relative', overflow: 'hidden' }}>
      <ParticleField count={150} fadeIn={false} intensity="medium" />

      {/* Validation success wave */}
      {isValid && frame < 280 && (
        <EnergyWave x={sandboxX} y={sandboxY} color={colors.green} delay={250} size={900} />
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
            background: colors.gradients.purplePink,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 40px ${colors.purpleLight}40)`,
          }}
        >
          Molecule Sandbox
        </div>
        <div style={{ fontSize: 48, fontWeight: 500, color: colors.grayLight, marginTop: 16 }}>
          Drag & Drop • Valency Rules • Real Chemistry
        </div>
      </div>

      {/* Sandbox workspace area */}
      <div
        style={{
          position: 'absolute',
          left: 100,
          top: 280,
          width: width * 0.52,
          height: height - 380,
          borderRadius: 48,
          background: 'rgba(0,0,0,0.4)',
          border: `3px dashed ${colors.purpleLight}25`,
          boxShadow: `inset 0 0 100px ${colors.purpleLight}08`,
        }}
      />

      {/* Bonds */}
      {hydrogenData.map((h, i) => {
        if (bondProgresses[i] <= 0) return null;
        const hProgress = spring({
          frame: frame - h.delay,
          fps,
          config: springConfigs.smooth,
        });
        const hX = interpolate(hProgress, [0, 1], [width * 0.75, h.endX]);
        const hY = interpolate(hProgress, [0, 1], [height * (0.4 + i * 0.12), h.endY]);

        return (
          <Bond
            key={i}
            x1={sandboxX}
            y1={sandboxY}
            x2={hX}
            y2={hY}
            progress={bondProgresses[i]}
            color={colors.cyan}
          />
        );
      })}

      {/* Carbon atom */}
      {carbonProgress > 0 && (
        <SandboxAtom
          symbol="C"
          color={colors.carbon}
          x={carbonX}
          y={carbonY}
          size={150}
          selected={frame > 50 && frame < 100}
        />
      )}

      {/* Hydrogen atoms */}
      {hydrogenData.map((h, i) => {
        const hProgress = spring({
          frame: frame - h.delay,
          fps,
          config: springConfigs.smooth,
        });

        if (frame < h.delay - 20) return null;

        const hX = interpolate(hProgress, [0, 1], [width * 0.75, h.endX]);
        const hY = interpolate(hProgress, [0, 1], [height * (0.4 + i * 0.12), h.endY]);

        return (
          <SandboxAtom
            key={i}
            symbol="H"
            color={colors.white}
            x={hX}
            y={hY}
            size={100}
            selected={hProgress > 0 && hProgress < 1}
          />
        );
      })}

      {/* Element palette panel */}
      <Sequence from={15}>
        <div
          style={{
            position: 'absolute',
            right: 140,
            top: height * 0.22,
            opacity: panelProgress,
            transform: `translateX(${interpolate(panelProgress, [0, 1], [80, 0])}px)`,
          }}
        >
          <GlassCard width={550} padding={50} borderRadius={36} showGlow glowColor={colors.purpleLight}>
            <div
              style={{
                fontSize: 40,
                fontWeight: 800,
                color: colors.white,
                marginBottom: 36,
              }}
            >
              Elements
            </div>

            {/* Element grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 20,
              }}
            >
              {[
                { symbol: 'H', color: colors.white, valency: 1 },
                { symbol: 'C', color: colors.carbon, valency: 4 },
                { symbol: 'N', color: colors.nitrogen, valency: 3 },
                { symbol: 'O', color: colors.oxygen, valency: 2 },
                { symbol: 'S', color: colors.sulfur, valency: 2 },
                { symbol: 'Cl', color: colors.chlorine, valency: 1 },
              ].map((el) => (
                <div
                  key={el.symbol}
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: 24,
                    background: `${el.color}15`,
                    border: `3px solid ${el.color}40`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: 900,
                      color: el.color,
                      textShadow: `0 0 20px ${el.color}60`,
                    }}
                  >
                    {el.symbol}
                  </div>
                  <div style={{ fontSize: 20, color: colors.grayLight, marginTop: 8 }}>
                    v={el.valency}
                  </div>
                </div>
              ))}
            </div>

            {/* Current molecule */}
            <div
              style={{
                marginTop: 40,
                padding: 28,
                borderRadius: 24,
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              <div style={{ fontSize: 28, color: colors.grayLight, marginBottom: 12 }}>
                Building:
              </div>
              <div style={{ fontSize: 48, fontWeight: 800, color: colors.white }}>
                CH₄{' '}
                <span style={{ fontSize: 32, color: colors.cyan }}>
                  (Methane)
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </Sequence>

      {/* Validation message */}
      {isValid && (
        <div
          style={{
            position: 'absolute',
            left: sandboxX,
            bottom: 160,
            transform: `translateX(-50%) scale(${validationProgress})`,
            opacity: validationProgress,
          }}
        >
          <GlassCard
            padding={36}
            borderRadius={24}
            borderColor={`${colors.green}80`}
            showGlow
            glowColor={colors.green}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                fontSize: 40,
                fontWeight: 700,
                color: colors.green,
              }}
            >
              <span style={{ fontSize: 56 }}>✓</span>
              Valid Molecule! All valencies satisfied.
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
