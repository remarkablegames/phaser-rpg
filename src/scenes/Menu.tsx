import { Scene } from 'phaser';
import { render } from 'phaser-jsx';

import { Button, Overlay } from '../components';
import { key } from '../constants';

export class Menu extends Scene {
  constructor() {
    super(key.scene.menu);
  }

  create() {
    this.input.keyboard!.on('keydown-ESC', this.exit, this);
    const { centerX, centerY } = this.cameras.main;

    render(
      <>
        <Overlay />

        <Button
          center
          fixed
          onClick={this.exit}
          text="Resume"
          x={centerX}
          y={centerY}
        />
      </>,
      this,
    );
  }

  private exit() {
    this.scene.resume(key.scene.main);
    this.scene.stop();
  }
}
