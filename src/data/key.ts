const image = {
  desert: 'desert',
  spaceman: 'spaceman',
} as const;

const scene = {
  boot: 'boot',
  main: 'main',
} as const;

const tilemap = {
  map: 'map',
} as const;

export const key = {
  image,
  scene,
  tilemap,
} as const;
