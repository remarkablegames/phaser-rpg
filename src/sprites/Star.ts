import Phaser from 'phaser';

import { Texture } from '../types';

export default class Star extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string | number
  ) {
    super(scene, x, y, Texture.Star);

    // Reset drawing position of image to the top-left.
    this.setOrigin(0);

    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      // Give the sprite some bounce.
      this.body.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    }
  }
}
