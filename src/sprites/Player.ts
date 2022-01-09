import Phaser from 'phaser';

import { Texture } from '../types';

enum Animation {
  Left = 'Left',
  Right = 'Right',
  Up = 'Up',
  Down = 'Down',
}

enum Velocity {
  Horizontal = 80,
  Vertical = 80,
}

let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

export default class Player extends Phaser.Physics.Arcade.Sprite {
  static key = 'PlayerSprite';

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture = Texture.Spaceman,
    frame = 6
  ) {
    super(scene, x, y, Texture.Spaceman, frame);

    // Add the sprite to the scene.
    scene.add.existing(this);

    // Enable physics for the sprite.
    scene.physics.world.enable(this);

    // Add cursor keys.
    cursors = scene.input.keyboard.createCursorKeys();

    // Create left animation.
    this.anims.create({
      key: Animation.Left,
      frames: this.anims.generateFrameNumbers(Texture.Spaceman, {
        start: 8,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Create right animation.
    this.anims.create({
      key: Animation.Right,
      frames: this.anims.generateFrameNumbers(Texture.Spaceman, {
        start: 1,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Create up animation.
    this.anims.create({
      key: Animation.Up,
      frames: this.anims.generateFrameNumbers(Texture.Spaceman, {
        start: 11,
        end: 13,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Create down animation.
    this.anims.create({
      key: Animation.Down,
      frames: this.anims.generateFrameNumbers(Texture.Spaceman, {
        start: 4,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    if (!(this.body instanceof Phaser.Physics.Arcade.Body)) {
      return;
    }

    this.body.setVelocity(0);

    switch (true) {
      // Move left.
      case cursors.left.isDown:
        this.anims.play(Animation.Left, true);
        this.body.setVelocityX(-Velocity.Horizontal);
        break;

      // Move right.
      case cursors.right.isDown:
        this.anims.play(Animation.Right, true);
        this.body.setVelocityX(Velocity.Horizontal);
        break;

      // Move up.
      case cursors.up.isDown:
        this.anims.play(Animation.Up, true);
        this.body.setVelocityY(-Velocity.Vertical);
        break;

      // Move down.
      case cursors.down.isDown:
        this.anims.play(Animation.Down, true);
        this.body.setVelocityY(Velocity.Vertical);
        break;

      // Stand still.
      default:
        this.anims.stop();
        break;
    }
  }
}
