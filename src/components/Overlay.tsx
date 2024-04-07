import { Rectangle, useScene } from 'phaser-jsx';

import { Depth } from '../constants';

export function Overlay() {
  const scene = useScene();

  return (
    <Rectangle
      width={scene.cameras.main.width * 2}
      height={scene.cameras.main.height * 2}
      fillColor={0x000000}
      alpha={0.5}
      scrollFactorX={0}
      scrollFactorY={0}
      depth={Depth.Overlay}
    />
  );
}
