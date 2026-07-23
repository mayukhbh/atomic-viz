import React from 'react';
import { Text } from '@react-three/drei';
import fontUrl from '../../assets/fonts/InstrumentSans-Bold.ttf?url';

// drei's <Text> (troika) otherwise fetches its default font from a remote CDN; if that
// request is blocked the uncaught error tears down the whole Canvas. Pinning a bundled
// font keeps every 3D label self-contained and reliable offline.
export const LABEL_FONT = fontUrl;

export function Label3D(props) {
  return <Text font={fontUrl} {...props} />;
}
