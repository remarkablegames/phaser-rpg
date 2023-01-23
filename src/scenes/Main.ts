import { Scene } from 'phaser';

import { key } from '../data';
import { Player } from '../sprites';

export default class Main extends Scene {
  private player!: Player;

  constructor() {
    super({ key: key.scene.main });
  }

  create() {
    const map = this.make.tilemap({ key: key.tilemap.desert });
    const tiles = map.addTilesetImage('Desert', key.image.desert);
    const layer = map.createLayer('Ground', tiles, 0, 0);

    this.physics.world.bounds.width = layer.width;
    this.physics.world.bounds.height = layer.height;

    this.player = new Player(this, 32, Number(this.game.config.height) - 150);
    this.player.setCollideWorldBounds(true);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(2);
  }

  update() {
    this.player.update();
  }
}
