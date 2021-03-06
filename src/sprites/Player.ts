import Phaser from 'phaser';

import { key } from '../data';

enum Animation {
  Left = 'Left',
  Right = 'Right',
  Up = 'Up',
  Down = 'Down',
}

enum Velocity {
  Horizontal = 100,
  Vertical = 100,
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
  body!: Phaser.Physics.Arcade.Body;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture = key.image.spaceman,
    frame = 1
  ) {
    super(scene, x, y, texture, frame);

    // Add the sprite to the scene
    scene.add.existing(this);

    // Enable physics for the sprite
    scene.physics.world.enable(this);

    // Add cursor keys
    this.cursors = scene.input.keyboard.createCursorKeys();

    // Create sprite animations
    this.createAnimations();
  }

  private createAnimations() {
    // Create left animation
    this.anims.create({
      key: Animation.Left,
      frames: this.anims.generateFrameNumbers(key.image.spaceman, {
        start: 8,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Create right animation
    this.anims.create({
      key: Animation.Right,
      frames: this.anims.generateFrameNumbers(key.image.spaceman, {
        start: 1,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Create up animation
    this.anims.create({
      key: Animation.Up,
      frames: this.anims.generateFrameNumbers(key.image.spaceman, {
        start: 11,
        end: 13,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Create down animation
    this.anims.create({
      key: Animation.Down,
      frames: this.anims.generateFrameNumbers(key.image.spaceman, {
        start: 4,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    this.body.setVelocity(0);

    switch (true) {
      // Move left
      case this.cursors.left.isDown:
        this.anims.play(Animation.Left, true);
        this.body.setVelocityX(-Velocity.Horizontal);
        break;

      // Move right
      case this.cursors.right.isDown:
        this.anims.play(Animation.Right, true);
        this.body.setVelocityX(Velocity.Horizontal);
        break;

      // Move up
      case this.cursors.up.isDown:
        this.anims.play(Animation.Up, true);
        this.body.setVelocityY(-Velocity.Vertical);
        break;

      // Move down
      case this.cursors.down.isDown:
        this.anims.play(Animation.Down, true);
        this.body.setVelocityY(Velocity.Vertical);
        break;

      // Stand still
      default:
        this.anims.stop();
        break;
    }
  }
}
