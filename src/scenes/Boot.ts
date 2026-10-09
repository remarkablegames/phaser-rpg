import { Scene } from 'phaser';

import * as assets from '../assets';
import { KEY } from '../constants';

export class Boot extends Scene {
  constructor() {
    super(KEY.SCENE.BOOT);
  }

  preload() {
    this.load.spritesheet(KEY.IMAGE.SPACEMAN, assets.sprites.spaceman, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image(KEY.IMAGE.TUXEMON, assets.tilesets.tuxemon);
    this.load.tilemapTiledJSON(KEY.TILEMAP.TUXEMON, assets.tilemaps.tuxemon);
    this.load.atlas(KEY.ATLAS.PLAYER, assets.atlas.image, assets.atlas.data);
  }

  create() {
    this.scene.start(KEY.SCENE.MAIN);
  }
}
