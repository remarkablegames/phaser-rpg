const atlas = {
  player: 'player',
} as const;

const image = {
  desert: 'desert',
  spaceman: 'spaceman',
} as const;

const scene = {
  boot: 'boot',
  main: 'main',
} as const;

const tilemap = {
  desert: 'desert',
} as const;

export const key = {
  atlas,
  image,
  scene,
  tilemap,
} as const;
