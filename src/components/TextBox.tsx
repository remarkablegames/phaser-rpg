import type Phaser from 'phaser';
import { createRef, Text } from 'phaser-jsx';

import { Depth } from '../constants';

interface Props {
  scene: Phaser.Scene;
  text: string;
}

/**
 * Text box that has a "fixed" position on the screen.
 */
export function TextBox(props: Props) {
  const ref = createRef<Phaser.GameObjects.Text>();
  const repeat = props.text.length - 1;
  let index = 0;

  const timer = props.scene.time.addEvent({
    callback() {
      ref.current!.text += props.text[index];
      index++;

      if (index >= props.text.length) {
        timer.destroy();
        props.scene.time.removeEvent(timer);
      }
    },
    delay: 100,
    repeat,
  });

  return (
    <Text
      x={16}
      y={16}
      style={{
        color: '#000',
        fontFamily: 'monospace',
        fontSize: '18px ',
        backgroundColor: '#fff',
        // @ts-expect-error padding
        padding: { x: 20, y: 10 },
      }}
      alpha={0.95}
      scrollFactorX={0}
      scrollFactorY={0}
      depth={Depth.AboveWorld}
      ref={ref}
    />
  );
}
