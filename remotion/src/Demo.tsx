import React from 'react';
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import {
  IntroScene,
  AtomExplorerScene,
  ReactionLabScene,
  AtomBuilderScene,
  MoleculeSandboxScene,
  CtaScene,
} from './scenes';
import { colors } from './lib/colors';

// Scene timing configuration (in frames at 30fps)
const SCENE_TIMINGS = {
  intro: { start: 0, duration: 180 },           // 0-6s: Logo reveal with orbiting atom
  atomExplorer: { start: 180, duration: 600 },  // 6-26s: Element exploration (Bohr + Quantum modes)
  reactionLab: { start: 780, duration: 300 },   // 26-36s: Organic chemistry reactions
  atomBuilder: { start: 1080, duration: 300 },  // 36-46s: Build atom particle by particle
  moleculeSandbox: { start: 1380, duration: 330 }, // 46-57s: Drag-drop molecule building
  cta: { start: 1710, duration: 210 },          // 57-64s: Call to action
};

// Total duration: ~64 seconds (1920 frames at 30fps)
export const TOTAL_DURATION = 1920;

export const Demo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <TransitionSeries>
        {/* Intro Scene - Logo reveal with animated atom */}
        <TransitionSeries.Sequence durationInFrames={SCENE_TIMINGS.intro.duration}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 30 })}
        />

        {/* Atom Explorer - Showcase different elements */}
        <TransitionSeries.Sequence durationInFrames={SCENE_TIMINGS.atomExplorer.duration}>
          <AtomExplorerScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 30 })}
        />

        {/* Reaction Lab - Chemical reactions visualization */}
        <TransitionSeries.Sequence durationInFrames={SCENE_TIMINGS.reactionLab.duration}>
          <ReactionLabScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 30 })}
        />

        {/* Atom Builder - Build atoms particle by particle */}
        <TransitionSeries.Sequence durationInFrames={SCENE_TIMINGS.atomBuilder.duration}>
          <AtomBuilderScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 30 })}
        />

        {/* Molecule Sandbox - Drag and drop molecule building */}
        <TransitionSeries.Sequence durationInFrames={SCENE_TIMINGS.moleculeSandbox.duration}>
          <MoleculeSandboxScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 30 })}
        />

        {/* CTA Scene - Final call to action */}
        <TransitionSeries.Sequence durationInFrames={SCENE_TIMINGS.cta.duration}>
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
