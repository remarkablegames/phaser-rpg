import './style.css';

import Phaser from 'phaser';

import * as scenes from './scenes';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
 */
new Phaser.Game({
  width: 800,
  height: 600,
  zoom: 2,
  title: 'Phaser RPG',
  url: 'https://remarkablegames.org/phaser-rpg/',
  version: process.env.VERSION,
  scene: Object.values(scenes),
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0,
      },
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
