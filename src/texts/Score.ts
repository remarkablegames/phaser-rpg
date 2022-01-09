import Phaser from 'phaser';

export default class Score extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: number,
    style: Phaser.Types.GameObjects.Text.TextStyle
  ) {
    super(scene, x, y, getScore(text), style);
    scene.add.existing(this);
  }

  /**
   * Updates the score text.
   */
  setScore = (score: number) => {
    this.text = getScore(score);
  };
}

function getScore(score: number) {
  return `Score: ${score}`;
}
