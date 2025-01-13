import type Phaser from 'phaser';
import { Text, useRef, useScene } from 'phaser-jsx';

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
  const ref = useRef<Phaser.GameObjects.Text>();
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
          if (typeof props.onEnd === 'function') {
            props.onEnd();
          }
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
        backgroundColor: '#fff',
        color: '#000',
        font: '18px monospace',
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
