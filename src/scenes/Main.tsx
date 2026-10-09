import Phaser from 'phaser';
import { render } from 'phaser-jsx';

import { TilemapDebug, Typewriter } from '../components';
import {
  DEPTH,
  KEY,
  TILEMAP_LAYER,
  TILEMAP_OBJECT,
  TILESET_NAME,
} from '../constants';
import { Player } from '../sprites';
import { state } from '../state';

interface Sign extends Phaser.Physics.Arcade.StaticBody {
  text?: string;
}

export class Main extends Phaser.Scene {
  private player!: Player;
  private sign!: Sign;
  private tilemap!: Phaser.Tilemaps.Tilemap;
  private worldLayer!: Phaser.Tilemaps.TilemapLayer;

  constructor() {
    super(KEY.SCENE.MAIN);
  }

  create() {
    this.tilemap = this.make.tilemap({ key: KEY.TILEMAP.TUXEMON });

    // Parameters are the name you gave the tileset in Tiled and
    // the key of the tileset image in Phaser's cache (name used in preload)
    const tileset = this.tilemap.addTilesetImage(
      TILESET_NAME,
      KEY.IMAGE.TUXEMON,
    );
    if (!tileset) {
      throw new Error(`Tileset "${TILESET_NAME}" not found`);
    }

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    this.tilemap.createLayer(TILEMAP_LAYER.BELOW_PLAYER, tileset, 0, 0);
    this.worldLayer = this.tilemap.createLayer(
      TILEMAP_LAYER.WORLD,
      tileset,
      0,
      0,
    ) as Phaser.Tilemaps.TilemapLayer;
    const aboveLayer = this.tilemap.createLayer(
      TILEMAP_LAYER.ABOVE_PLAYER,
      tileset,
      0,
      0,
    );

    this.worldLayer.setCollisionByProperty({ collides: true });
    this.physics.world.bounds.width = this.worldLayer.width;
    this.physics.world.bounds.height = this.worldLayer.height;

    // By default, everything gets depth sorted on the screen in the order we created things.
    // We want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
    // Higher depths will sit on top of lower depth objects.
    aboveLayer.setDepth(DEPTH.ABOVE_PLAYER);

    this.addPlayer();

    // Set the bounds of the camera
    this.cameras.main.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );

    render(<TilemapDebug tilemapLayer={this.worldLayer} />, this);

    state.isTypewriting = true;
    render(
      <Typewriter
        text="WASD or arrow keys to move."
        onEnd={() => (state.isTypewriting = false)}
      />,
      this,
    );

    this.input.keyboard?.on('keydown-ESC', () => {
      this.scene.pause(KEY.SCENE.MAIN);
      this.scene.launch(KEY.SCENE.MENU);
    });
  }

  private addPlayer() {
    // Object layers in Tiled let you embed extra info into a map like a spawn point or custom collision shapes.
    // In the tmx file, there's an object layer with a point named 'Spawn Point'.
    const spawnPoint = this.tilemap.findObject(
      TILEMAP_LAYER.OBJECTS,
      ({ name }) => name === TILEMAP_OBJECT.SPAWN_POINT,
    );
    if (!spawnPoint) {
      throw new Error('Spawn point not found');
    }

    this.player = new Player(this, spawnPoint.x ?? 0, spawnPoint.y ?? 0);
    this.addPlayerSignInteraction();

    // Watch the player and worldLayer for collisions
    this.physics.add.collider(this.player, this.worldLayer);
  }

  private addPlayerSignInteraction() {
    const sign = this.tilemap.findObject(
      TILEMAP_LAYER.OBJECTS,
      ({ name }) => name === TILEMAP_OBJECT.SIGN,
    );
    if (!sign) {
      throw new Error('Sign not found');
    }

    this.sign = this.physics.add.staticBody(
      sign.x ?? 0,
      sign.y ?? 0,
      sign.width,
      sign.height,
    );

    const properties = sign.properties as
      { name: string; value: unknown }[] | undefined;
    const text = properties?.find(({ name }) => name === 'text')?.value;
    this.sign.text = typeof text === 'string' ? text : '';

    this.physics.add.overlap(
      this.sign,
      this.player.selector,
      (sign) => {
        if (this.player.cursors.space.isDown && !state.isTypewriting) {
          state.isTypewriting = true;

          render(
            <Typewriter
              text={(sign as unknown as Sign).text ?? ''}
              onEnd={() => (state.isTypewriting = false)}
            />,
            this,
          );
        }
      },
      undefined,
      this,
    );
  }

  update() {
    this.player.update();
  }
}
