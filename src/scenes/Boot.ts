import Phaser from 'phaser';

import { sprites, tiles } from '../assets';
import { Image, Scene, Tilemap } from '../types';

export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: Scene.Boot });
  }

  preload() {
    this.load.spritesheet(Image.Spaceman, sprites.spaceman, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image(Image.Desert, tiles.desert);
    this.load.tilemapTiledJSON(Tilemap.Desert, tiles.map);
  }

  create() {
    this.scene.start(Scene.Main);
  }
}
