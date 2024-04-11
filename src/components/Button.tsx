import type Phaser from 'phaser';
import { createRef, Text } from 'phaser-jsx';

interface Props {
  center?: boolean;
  children: string;
  fixed?: boolean;
  onClick?: () => void;
  x?: number;
  y?: number;
}

export function Button(props: Props) {
  const { center, children, fixed, onClick, ...textProps } = props;
  const ref = createRef<Phaser.GameObjects.Text>();

  return (
    <Text
      {...textProps}
      input={{ cursor: 'pointer' }}
      onPointerDown={onClick}
      onPointerOver={() => ref.current!.setTint(0xdddddd)}
      onPointerOut={() => ref.current!.setTint(0xffffff)}
      originX={center ? 0.5 : undefined}
      originY={center ? 0.5 : undefined}
      ref={ref}
      scrollFactorX={fixed ? 0 : undefined}
      scrollFactorY={fixed ? 0 : undefined}
      style={{
        color: '#000',
        fontFamily: 'monospace',
        fontSize: '18px',
        backgroundColor: '#fff',
        // @ts-expect-error padding
        padding: { x: 20, y: 10 },
      }}
      text={children}
    />
  );
}
