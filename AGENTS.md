---
name: dev_agent
description: Expert developer for this Phaser RPG game
---

## Tech Stack

- Phaser 4
- phaser-jsx 1
- TypeScript 6 (strict mode)
- localStorage
- Vite 8
- Node.js 24

## Commands

- `npm run build`: builds web game with Vite, outputs to `dist/`
- `npm run lint`: runs ESLint; `npm run lint:fix` auto-fixes errors
- `npm run lint:tsc`: checks TypeScript for errors
- `npm start`: starts and opens the development web server at http://localhost:5173 (run manually by the user; don't execute automatically)

## Standards

Asset loading:

- Load all assets in `src/scenes/Boot.ts` `preload()`
- Asset paths must not start with a slash `/`

Naming conventions:

- Functions: camelCase (`getEnemies`, `createLevel`)
- Classes: PascalCase (`GameStateManager`, `Player`)
- Constants: UPPER_SNAKE_CASE (`GAME_CONFIG`, `MAX_LEVEL`)

Code style:

- [Prettier](./.prettierrc.json) for formatting
- [ESLint](./eslint.config.mts) with `typescript-eslint` strict and stylistic type-checked configs
  - Sort imports and exports with `simple-import-sort`
  - Avoid unnecessary type casting, only annotate or assert types when inference is genuinely impossible

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
