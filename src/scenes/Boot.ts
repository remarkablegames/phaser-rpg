import { Scene } from 'phaser';

import * as assets from '../assets';
import { key } from '../data';

export default class Boot extends Scene {
  constructor() {
    super({ key: key.scene.boot });
  }

  preload() {
    this.load.spritesheet(key.image.spaceman, assets.sprites.spaceman, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image(key.image.desert, assets.tilesets.desert);
    this.load.tilemapTiledJSON(key.tilemap.desert, assets.tilemaps.desert);
    this.load.atlas(key.atlas.player, assets.atlas.image, assets.atlas.data);
  }

  create() {
    this.scene.start(key.scene.main);
  }
}
