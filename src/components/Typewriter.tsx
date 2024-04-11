import type Phaser from 'phaser';
import { createRef, Text, useScene } from 'phaser-jsx';

import { Depth } from '../constants';

interface Props {
  text: string;
  onEnd?: () => void;
}

/**
 * Textbox that has a "fixed" position on the screen.
 */
export function Typewriter(props: Props) {
  const scene = useScene();
  const ref = createRef<Phaser.GameObjects.Text>();
  let index = 0;

  const timer = scene.time.addEvent({
    callback() {
      ref.current!.text += props.text[index];
      index++;

      if (index >= props.text.length) {
        removeTimer(timer, scene);

        const oneshot = scene.time.delayedCall(1500, () => {
          ref.current!.destroy();
          removeTimer(oneshot, scene);
          props.onEnd && props.onEnd();
        });
      }
    },

    delay: 100,
    repeat: props.text.length - 1,
  });

  return (
    <Text
      x={16}
      y={16}
      style={{
        color: '#000',
        fontFamily: 'monospace',
        fontSize: '18px',
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

function removeTimer(timer: Phaser.Time.TimerEvent, scene: Phaser.Scene) {
  timer.destroy();
  scene.time.removeEvent(timer);
}
