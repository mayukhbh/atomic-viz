import React from 'react';
import { Composition } from 'remotion';
import { Demo, TOTAL_DURATION } from './Demo';

// 4K Desktop Resolution
const WIDTH_4K = 3840;
const HEIGHT_4K = 2160;

// 1080p for preview/testing
const WIDTH_1080P = 1920;
const HEIGHT_1080P = 1080;

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main 4K composition */}
      <Composition
        id="Demo"
        component={Demo}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH_4K}
        height={HEIGHT_4K}
        defaultProps={{}}
      />

      {/* 1080p preview composition (for faster preview) */}
      <Composition
        id="Demo-1080p"
        component={Demo}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH_1080P}
        height={HEIGHT_1080P}
        defaultProps={{}}
      />

      {/* Individual scene compositions for development */}
      <Composition
        id="IntroScene"
        component={() => (
          <div style={{ width: WIDTH_4K, height: HEIGHT_4K, background: '#020612' }}>
            {React.createElement(require('./scenes').IntroScene)}
          </div>
        )}
        durationInFrames={180}
        fps={FPS}
        width={WIDTH_4K}
        height={HEIGHT_4K}
      />

      <Composition
        id="AtomExplorerScene"
        component={() => (
          <div style={{ width: WIDTH_4K, height: HEIGHT_4K, background: '#020612' }}>
            {React.createElement(require('./scenes').AtomExplorerScene)}
          </div>
        )}
        durationInFrames={300}
        fps={FPS}
        width={WIDTH_4K}
        height={HEIGHT_4K}
      />

      <Composition
        id="ReactionLabScene"
        component={() => (
          <div style={{ width: WIDTH_4K, height: HEIGHT_4K, background: '#020612' }}>
            {React.createElement(require('./scenes').ReactionLabScene)}
          </div>
        )}
        durationInFrames={270}
        fps={FPS}
        width={WIDTH_4K}
        height={HEIGHT_4K}
      />

      <Composition
        id="AtomBuilderScene"
        component={() => (
          <div style={{ width: WIDTH_4K, height: HEIGHT_4K, background: '#020612' }}>
            {React.createElement(require('./scenes').AtomBuilderScene)}
          </div>
        )}
        durationInFrames={300}
        fps={FPS}
        width={WIDTH_4K}
        height={HEIGHT_4K}
      />

      <Composition
        id="MoleculeSandboxScene"
        component={() => (
          <div style={{ width: WIDTH_4K, height: HEIGHT_4K, background: '#020612' }}>
            {React.createElement(require('./scenes').MoleculeSandboxScene)}
          </div>
        )}
        durationInFrames={330}
        fps={FPS}
        width={WIDTH_4K}
        height={HEIGHT_4K}
      />

      <Composition
        id="CtaScene"
        component={() => (
          <div style={{ width: WIDTH_4K, height: HEIGHT_4K, background: '#020612' }}>
            {React.createElement(require('./scenes').CtaScene)}
          </div>
        )}
        durationInFrames={210}
        fps={FPS}
        width={WIDTH_4K}
        height={HEIGHT_4K}
      />
    </>
  );
};
