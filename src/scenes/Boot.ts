import Phaser from 'phaser';

import { platform, sky, sprites, star } from '../assets';
import { Scene, Texture } from '../types';

export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: Scene.Boot });
  }

  preload() {
    this.load.spritesheet(Texture.Spaceman, sprites.spaceman, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image(Texture.Ground, platform);
    this.load.image(Texture.Sky, sky);
    this.load.image(Texture.Star, star);
  }

  create() {
    this.scene.start(Scene.Main);
  }
}
