import './style.css';

import { Game, Scale } from 'phaser';

import { Boot, Main } from './scenes';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
 */
const config = {
  width: 800,
  height: 600,
  zoom: 2,
  title: 'Phaser RPG',
  url: 'https://remarkablegames.org/phaser-rpg/',
  version: process.env.VERSION,
  scene: [Boot, Main],
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
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  pixelArt: true,
};

new Game(config);
