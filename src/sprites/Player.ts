import Phaser from 'phaser';

import { KEY } from '../constants';

const ANIMATION = {
  LEFT: 'player_left',
  RIGHT: 'player_right',
  UP: 'player_up',
  DOWN: 'player_down',
} as const;

type Cursors = Record<
  'w' | 'a' | 's' | 'd' | 'up' | 'left' | 'down' | 'right' | 'space',
  Phaser.Input.Keyboard.Key
>;

const VELOCITY = {
  HORIZONTAL: 175,
  VERTICAL: 175,
} as const;

export class Player extends Phaser.Physics.Arcade.Sprite {
  declare body: Phaser.Physics.Arcade.Body;
  cursors: Cursors;
  selector: Phaser.Physics.Arcade.StaticBody;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture = KEY.ATLAS.PLAYER,
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
    this.selector = scene.physics.add.staticBody(x - 8, y + 32, 16, 16);
  }

  /**
   * Track the arrow keys & WASD.
   */
  private createCursorKeys() {
    return this.scene.input.keyboard?.addKeys(
      'w,a,s,d,up,left,down,right,space',
    ) as Cursors;
  }

  private createAnimations() {
    const anims = this.scene.anims;

    // Create left animation
    if (!anims.exists(ANIMATION.LEFT)) {
      anims.create({
        key: ANIMATION.LEFT,
        frames: anims.generateFrameNames(KEY.ATLAS.PLAYER, {
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
    if (!anims.exists(ANIMATION.RIGHT)) {
      anims.create({
        key: ANIMATION.RIGHT,
        frames: anims.generateFrameNames(KEY.ATLAS.PLAYER, {
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
    if (!anims.exists(ANIMATION.UP)) {
      anims.create({
        key: ANIMATION.UP,
        frames: anims.generateFrameNames(KEY.ATLAS.PLAYER, {
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
    if (!anims.exists(ANIMATION.DOWN)) {
      anims.create({
        key: ANIMATION.DOWN,
        frames: anims.generateFrameNames(KEY.ATLAS.PLAYER, {
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

  private moveSelector(animation: (typeof ANIMATION)[keyof typeof ANIMATION]) {
    const { body, selector } = this;

    switch (animation) {
      case ANIMATION.LEFT:
        selector.x = body.x - 19;
        selector.y = body.y + 14;
        break;

      case ANIMATION.RIGHT:
        selector.x = body.x + 35;
        selector.y = body.y + 14;
        break;

      case ANIMATION.UP:
        selector.x = body.x + 8;
        selector.y = body.y - 18;
        break;

      case ANIMATION.DOWN:
        selector.x = body.x + 8;
        selector.y = body.y + 46;
        break;
    }
  }

  update() {
    const { anims, body, cursors } = this;
    const prevVelocity = body.velocity.clone();

    // Stop any previous movement from the last frame
    body.setVelocity(0);

    // Horizontal movement
    switch (true) {
      case cursors.left.isDown:
      case cursors.a.isDown:
        body.setVelocityX(-VELOCITY.HORIZONTAL);
        break;

      case cursors.right.isDown:
      case cursors.d.isDown:
        body.setVelocityX(VELOCITY.HORIZONTAL);
        break;
    }

    // Vertical movement
    switch (true) {
      case cursors.up.isDown:
      case cursors.w.isDown:
        body.setVelocityY(-VELOCITY.VERTICAL);
        break;

      case cursors.down.isDown:
      case cursors.s.isDown:
        body.setVelocityY(VELOCITY.VERTICAL);
        break;
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    body.velocity.normalize().scale(VELOCITY.HORIZONTAL);

    // Update the animation last and give left/right animations precedence over up/down animations
    switch (true) {
      case cursors.left.isDown:
      case cursors.a.isDown:
        anims.play(ANIMATION.LEFT, true);
        this.moveSelector(ANIMATION.LEFT);
        break;

      case cursors.right.isDown:
      case cursors.d.isDown:
        anims.play(ANIMATION.RIGHT, true);
        this.moveSelector(ANIMATION.RIGHT);
        break;

      case cursors.up.isDown:
      case cursors.w.isDown:
        anims.play(ANIMATION.UP, true);
        this.moveSelector(ANIMATION.UP);
        break;

      case cursors.down.isDown:
      case cursors.s.isDown:
        anims.play(ANIMATION.DOWN, true);
        this.moveSelector(ANIMATION.DOWN);
        break;

      default:
        anims.stop();

        // If we were moving, pick an idle frame to use
        switch (true) {
          case prevVelocity.x < 0:
            this.setTexture(KEY.ATLAS.PLAYER, 'misa-left');
            this.moveSelector(ANIMATION.LEFT);
            break;

          case prevVelocity.x > 0:
            this.setTexture(KEY.ATLAS.PLAYER, 'misa-right');
            this.moveSelector(ANIMATION.RIGHT);
            break;

          case prevVelocity.y < 0:
            this.setTexture(KEY.ATLAS.PLAYER, 'misa-back');
            this.moveSelector(ANIMATION.UP);
            break;

          case prevVelocity.y > 0:
            this.setTexture(KEY.ATLAS.PLAYER, 'misa-front');
            this.moveSelector(ANIMATION.DOWN);
            break;
        }
    }
  }
}
