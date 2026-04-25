---
name: dev_agent
description: Expert developer for this Phaser RPG game
---

## Tech Stack

- Phaser 3
- TypeScript 6 (strict mode)
- phaser-jsx
- localStorage
- Vite 8
- Node.js 24

## Commands

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `npm start`        | Dev server (http://localhost:5173) |
| `npm run build`    | Production build                   |
| `npm run lint`     | ESLint                             |
| `npm run lint:fix` | ESLint auto-fix                    |
| `npm run lint:tsc` | Type check                         |

## Standards

Asset loading:

- Load all assets in `src/scenes/Boot.ts` `preload()`

Naming conventions:

- Functions: camelCase (`getEnemies`, `createLevel`)
- Classes: PascalCase (`GameStateManager`, `Player`)
- Constants: UPPER_SNAKE_CASE (`GAME_CONFIG`, `MAX_LEVEL`)

Code style:

- [Prettier](./.prettierrc.json) for formatting
- [ESLint](./eslint.config.mts) for lint constraints (import sorting)

Examples:

```ts
// ✅ Good - descriptive names, use of Phaser class/method/type
class Player extends Phaser.Physics.Arcade.Sprite {
  declare body: Phaser.Physics.Arcade.Body;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture = KEY.SPRITESHEET.PLAYER,
    frame = 0,
  ) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.world.enable(this);
  }
}

// ❌ Bad - vague names, use of `any` type, hardcoding string instead of creating constant/enum
let gameObj: any;
gameObj = this.add.image(0, 0, 'my-image-key');
```

## File Structure

- `src/` – code
- `public/` – assets
