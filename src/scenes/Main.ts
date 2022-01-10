import Phaser from 'phaser';

import { Player } from '../sprites';
import { Scene } from '../types';

let player: Player;

export default class Main extends Phaser.Scene {
  constructor() {
    super({ key: Scene.Main });
  }

  create() {
    // Create player.
    player = new Player(this, 32, Number(this.game.config.height) - 150);
  }

  update(time: number, delta: number) {
    player.update();
  }
}
