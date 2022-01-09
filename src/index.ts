import './index.css';

import { Game, Scale } from 'phaser';

import { Boot, Main } from './scenes';

/**
 * https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
 */
const config = {
  width: 800,
  height: 600,
  zoom: 2,
  title: 'Phaser RPG',
  url: 'https://remarkablegames.org/phaser-rpg/',
  // see `.env` and `package.json`
  version: process.env.WEB_APP_VERSION,
  scene: [Boot, Main],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0,
      },
      debug: process.env.NODE_ENV === 'development',
    },
  },
  disableContextMenu: true,
  backgroundColor: '#000',
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  pixelArt: true,
};

new Game(config);
