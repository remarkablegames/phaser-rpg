import Phaser from 'phaser';

import { sprites } from '../assets';
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
  }

  create() {
    this.scene.start(Scene.Main);
  }
}
