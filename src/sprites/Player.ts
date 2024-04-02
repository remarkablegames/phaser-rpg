import Phaser from 'phaser';

import { key } from '../data';

enum Animation {
  Left = 'Left',
  Right = 'Right',
  Up = 'Up',
  Down = 'Down',
}

type Cursors = Record<
  'w' | 'a' | 's' | 'd' | 'up' | 'left' | 'down' | 'right',
  Phaser.Input.Keyboard.Key
>;

const Velocity = {
  Horizontal: 175,
  Vertical: 175,
} as const;

export default class Player extends Phaser.Physics.Arcade.Sprite {
  body!: Phaser.Physics.Arcade.Body;
  cursors: Cursors;
  selector: Phaser.GameObjects.Rectangle;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture = key.atlas.player,
    frame = 'misa-front',
  ) {
    super(scene, x, y, texture, frame);

    // Add the sprite to the scene
    scene.add.existing(this);

    // Enable physics for the sprite
    scene.physics.world.enable(this);

    // The image has a bit of whitespace so use setSize and
    // setOffset to control the size of the player's body
    this.setSize(32, 42).setOffset(0, 22);

    // Collide the sprite body with the world boundary
    this.setCollideWorldBounds(true);

    // Set the camera to follow the game object
    scene.cameras.main.startFollow(this);
    scene.cameras.main.setZoom(1);

    // Add cursor keys
    this.cursors = this.createCursorKeys();

    // Create sprite animations
    this.createAnimations();

    // Add selector
    const box = scene.add.rectangle(0, 0, 16, 16, 0xffffff, 0);
    this.selector =
      scene.physics.add.existing<Phaser.GameObjects.Rectangle>(box);
    this.selector.setPosition(x, y + 40);
  }

  /**
   * Track the arrow keys & WASD.
   */
  private createCursorKeys() {
    return this.scene.input.keyboard!.addKeys(
      'w,a,s,d,up,left,down,right',
    ) as Cursors;
  }

  private createAnimations() {
    const anims = this.scene.anims;

    // Create left animation
    if (!anims.exists(Animation.Left)) {
      anims.create({
        key: Animation.Left,
        frames: anims.generateFrameNames(key.atlas.player, {
          prefix: 'misa-left-walk.',
          start: 0,
          end: 3,
          zeroPad: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }

    // Create right animation
    if (!anims.exists(Animation.Right)) {
      anims.create({
        key: Animation.Right,
        frames: anims.generateFrameNames(key.atlas.player, {
          prefix: 'misa-right-walk.',
          start: 0,
          end: 3,
          zeroPad: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }

    // Create up animation
    if (!anims.exists(Animation.Up)) {
      anims.create({
        key: Animation.Up,
        frames: anims.generateFrameNames(key.atlas.player, {
          prefix: 'misa-back-walk.',
          start: 0,
          end: 3,
          zeroPad: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }

    // Create down animation
    if (!anims.exists(Animation.Down)) {
      anims.create({
        key: Animation.Down,
        frames: anims.generateFrameNames(key.atlas.player, {
          prefix: 'misa-front-walk.',
          start: 0,
          end: 3,
          zeroPad: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }
  }

  update() {
    const { anims, body, cursors, selector } = this;
    const prevVelocity = body.velocity.clone();

    // Stop any previous movement from the last frame
    body.setVelocity(0);

    // Horizontal movement
    switch (true) {
      case cursors.left.isDown:
      case cursors.a.isDown:
        body.setVelocityX(-Velocity.Horizontal);
        selector.setPosition(body.x - 11, body.y + 22);
        break;

      case cursors.right.isDown:
      case cursors.d.isDown:
        body.setVelocityX(Velocity.Horizontal);
        selector.setPosition(body.x + 42, body.y + 22);
        break;
    }

    // Vertical movement
    switch (true) {
      case cursors.up.isDown:
      case cursors.w.isDown:
        body.setVelocityY(-Velocity.Vertical);
        selector.setPosition(body.x + 16, body.y - 11);
        break;

      case cursors.down.isDown:
      case cursors.s.isDown:
        body.setVelocityY(Velocity.Vertical);
        selector.setPosition(body.x + 16, body.y + 53);
        break;
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    body.velocity.normalize().scale(Velocity.Horizontal);

    // Update the animation last and give left/right animations precedence over up/down animations
    switch (true) {
      case cursors.left.isDown:
      case cursors.a.isDown:
        anims.play(Animation.Left, true);
        break;

      case cursors.right.isDown:
      case cursors.d.isDown:
        anims.play(Animation.Right, true);
        break;

      case cursors.up.isDown:
      case cursors.w.isDown:
        anims.play(Animation.Up, true);
        break;

      case cursors.down.isDown:
      case cursors.s.isDown:
        anims.play(Animation.Down, true);
        break;

      default:
        anims.stop();

        // If we were moving, pick an idle frame to use
        switch (true) {
          case prevVelocity.x < 0:
            this.setTexture(key.atlas.player, 'misa-left');
            break;
          case prevVelocity.x > 0:
            this.setTexture(key.atlas.player, 'misa-right');
            break;
          case prevVelocity.y < 0:
            this.setTexture(key.atlas.player, 'misa-back');
            break;
          case prevVelocity.y > 0:
            this.setTexture(key.atlas.player, 'misa-front');
            break;
        }
    }
  }
}
