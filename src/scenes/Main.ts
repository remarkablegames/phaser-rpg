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
    map.createLayer(Layer.Ground, tiles, 0, 0);
    player = new Player(this, 32, Number(this.game.config.height) - 150);
  }

  update(time: number, delta: number) {
    player.update();
  }
}
