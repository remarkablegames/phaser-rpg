import { Text } from 'phaser-jsx';

import { Depth } from '../constants';

/**
 * Text box that has a "fixed" position on the screen.
 */
export function TextBox() {
  return (
    <Text
      x={16}
      y={16}
      text={['WASD or arrow keys to move'].join('\n')}
      style={{
        color: '#000',
        fontFamily: 'monospace',
        fontSize: '18px ',
        backgroundColor: '#fff',
        // @ts-expect-error padding
        padding: { x: 20, y: 10 },
      }}
      scrollFactorX={0}
      scrollFactorY={0}
      depth={Depth.AboveWorld}
    />
  );
}
