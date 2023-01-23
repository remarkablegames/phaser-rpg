import Phaser from 'phaser';

import scenes from './scenes';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
 */
new Phaser.Game({
  width: 800, // 1024
  height: 600, // 768
  title: 'Phaser RPG',
  url: process.env.URL,
  version: process.env.VERSION,
  scene: scenes,
  physics: {
    default: 'arcade',
    arcade: {
      debug: !isProduction,
    },
  },
  disableContextMenu: isProduction,
  backgroundColor: '#000',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
});
