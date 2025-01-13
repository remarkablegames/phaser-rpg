import type Phaser from 'phaser';
import { Text, useRef } from 'phaser-jsx';

interface Props {
  center?: boolean;
  fixed?: boolean;
  onClick?: () => void;
  text: string;
  x?: number;
  y?: number;
}

export function Button(props: Props) {
  const { center, text, fixed, onClick, ...textProps } = props;
  const ref = useRef<Phaser.GameObjects.Text>();

  function onMouseOver() {
    ref.current!.setTint(0xdddddd);
  }

  function onMouseOut() {
    ref.current!.setTint(0xffffff);
  }

  return (
    <Text
      {...textProps}
      input={{ cursor: 'pointer' }}
      onPointerDown={onClick}
      onPointerOver={onMouseOver}
      onPointerOut={onMouseOut}
      originX={center ? 0.5 : undefined}
      originY={center ? 0.5 : undefined}
      ref={ref}
      scrollFactorX={fixed ? 0 : undefined}
      scrollFactorY={fixed ? 0 : undefined}
      style={{
        backgroundColor: '#fff',
        color: '#000',
        font: '18px monospace',
        padding: { x: 20, y: 10 },
      }}
      text={text}
    />
  );
}
