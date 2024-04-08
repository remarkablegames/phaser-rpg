import { Graphics, useScene } from 'phaser-jsx';

import { Depth, isProduction } from '../constants';

interface Props {
  tilemapLayer: Phaser.Tilemaps.TilemapLayer;
}

export function TilemapDebug(props: Props) {
  const scene = useScene();
  let isDebug = false;
  let graphics: Phaser.GameObjects.Graphics;

  if (isProduction) {
    return null;
  }

  scene.input.keyboard!.on('keydown-SHIFT', () => {
    isDebug = !isDebug;
    graphics.setAlpha(isDebug ? 0.75 : 0);
  });

  // Create worldLayer collision graphic above the player, but below the help text
  function renderDebug() {
    props.tilemapLayer.renderDebug(graphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    });
  }

  return (
    <Graphics
      alpha={0}
      depth={Depth.AboveWorld}
      ref={(gameobject) => {
        graphics = gameobject;
        renderDebug();
      }}
    />
  );
}
