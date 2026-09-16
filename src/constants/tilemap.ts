export const TILESET_NAME = 'tuxemon-sample-32px-extruded';

export enum TilemapLayer {
  BelowPlayer = 'Below Player',
  World = 'World',
  AbovePlayer = 'Above Player',
  Objects = 'Objects',
}

export const TilemapObject = {
  SpawnPoint: 'Spawn Point',
  Sign: 'Sign',
} as const;
