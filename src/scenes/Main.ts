import Phaser from 'phaser';

import { Player } from '../sprites';
import { Image, Layer, Scene, Tilemap, Tileset } from '../types';

let player: Player;

export default class Main extends Phaser.Scene {
  constructor() {
    super({ key: Scene.Main });
  }

  create() {
    const map = this.make.tilemap({ key: Tilemap.Desert });
    const tiles = map.addTilesetImage(Tileset.Desert, Image.Desert);
    const layer = map.createLayer(Layer.Ground, tiles, 0, 0);

    this.physics.world.bounds.width = layer.width;
    this.physics.world.bounds.height = layer.height;

    player = new Player(this, 32, Number(this.game.config.height) - 150);
    player.setCollideWorldBounds(true);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(player);
    this.cameras.main.setZoom(2);
  }

  update(time: number, delta: number) {
    player.update();
  }
}
