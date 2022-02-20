import Phaser from 'phaser';

import * as assets from '../assets';
import { key } from '../data';

export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: key.scene.boot });
  }

  preload() {
    this.load.spritesheet(key.image.spaceman, assets.sprites.spaceman, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image(key.image.desert, assets.tiles.desert);
    this.load.tilemapTiledJSON(key.tilemap.map, assets.tiles.map);
  }

  create() {
    this.scene.start(key.scene.main);
  }
}
