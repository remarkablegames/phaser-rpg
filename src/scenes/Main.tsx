import Phaser from 'phaser';
import { render } from 'phaser-jsx';

import { Typewriter } from '../components';
import {
  Depth,
  isDevelopment,
  TilemapLayer,
  TilemapObject,
  TILESET_NAME,
} from '../constants';
import { key } from '../data';
import { Player } from '../sprites';

export default class Main extends Phaser.Scene {
  private player!: Player;
  private isDebug = false;
  private sign!: Phaser.Physics.Arcade.StaticBody;

  constructor() {
    super(key.scene.main);
  }

  create() {
    const map = this.make.tilemap({ key: key.tilemap.tuxemon });

    // Parameters are the name you gave the tileset in Tiled and
    // the key of the tileset image in Phaser's cache (name used in preload)
    const tileset = map.addTilesetImage(TILESET_NAME, key.image.tuxemon)!;

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    map.createLayer(TilemapLayer.BelowPlayer, tileset, 0, 0);
    const worldLayer = map.createLayer(TilemapLayer.World, tileset, 0, 0)!;
    const aboveLayer = map.createLayer(
      TilemapLayer.AbovePlayer,
      tileset,
      0,
      0,
    )!;

    worldLayer.setCollisionByProperty({ collides: true });
    this.physics.world.bounds.width = worldLayer.width;
    this.physics.world.bounds.height = worldLayer.height;

    // By default, everything gets depth sorted on the screen in the order we created things.
    // We want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
    // Higher depths will sit on top of lower depth objects.
    aboveLayer.setDepth(Depth.AbovePlayer);

    // Object layers in Tiled let you embed extra info into a map like a spawn point or custom collision shapes.
    // In the tmx file, there's an object layer with a point named 'Spawn Point'.
    const spawnPoint = map.findObject(
      TilemapLayer.Objects,
      ({ name }) => name === TilemapObject.SpawnPoint,
    )!;

    const sign = map.findObject(
      TilemapLayer.Objects,
      ({ name }) => name === TilemapObject.Sign,
    )!;

    this.sign = this.physics.add.staticBody(
      sign.x!,
      sign.y!,
      sign.width,
      sign.height,
    );

    this.player = new Player(this, spawnPoint.x!, spawnPoint.y!);

    this.enablePlayerSignInteraction();

    // Watch the player and worldLayer for collisions
    this.physics.add.collider(this.player, worldLayer);

    // Set the bounds of the camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    if (isDevelopment) {
      this.renderDebug(worldLayer);
    }

    render(<Typewriter text="WASD or arrow keys to move." />, this);
  }

  /**
   * Debug graphics.
   *
   * @param tilemapLayer - Tilemap layer.
   */
  private renderDebug(tilemapLayer: Phaser.Tilemaps.TilemapLayer) {
    const graphics = this.add.graphics().setAlpha(0).setDepth(Depth.AboveWorld);

    // Create worldLayer collision graphic above the player, but below the help text
    tilemapLayer.renderDebug(graphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    });

    this.input.keyboard!.on('keydown-ESC', () => {
      this.isDebug = !this.isDebug;
      graphics.setAlpha(this.isDebug ? 0.75 : 0);
    });
  }

  private enablePlayerSignInteraction() {
    let canInteract = true;

    this.physics.add.overlap(
      this.player.selector,
      this.sign as unknown as Phaser.Types.Physics.Arcade.ArcadeColliderType,
      () => {
        if (this.player.cursors.space.isDown && canInteract) {
          canInteract = false;

          render(
            <Typewriter
              text="Welcome to Phaser RPG!"
              onEnd={() => (canInteract = true)}
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
