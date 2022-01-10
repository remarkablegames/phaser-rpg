import { tiles } from '../assets';

export enum Image {
  Desert = 'Desert',
  Spaceman = 'Spaceman',
}

export const Layer = {
  Ground: tiles.map.layers[0].name,
} as const;

export enum Scene {
  Boot = 'Boot',
  Main = 'Main',
}

export enum Tilemap {
  Desert = 'Desert',
}

export const Tileset = {
  Desert: tiles.map.tilesets[0].name,
} as const;
