import { Scene } from 'phaser';
import { render } from 'phaser-jsx';

import { Button, Overlay } from '../components';
import { key } from '../data';

export default class Menu extends Scene {
  constructor() {
    super(key.scene.menu);
  }

  create() {
    this.input.keyboard!.on('keydown-ESC', this.unpause, this);
    const { centerX, centerY } = this.cameras.main;

    render(
      <>
        <Overlay />

        <Button center fixed onClick={this.unpause} x={centerX} y={centerY}>
          Resume
        </Button>
      </>,
      this,
    );
  }

  private unpause() {
    this.scene.resume(key.scene.main);
    this.scene.stop();
  }
}
