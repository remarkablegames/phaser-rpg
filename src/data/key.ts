const atlas = {
  player: 'player',
} as const;

const image = {
  desert: 'desert',
  spaceman: 'spaceman',
  tuxemon: 'tuxemon',
} as const;

const scene = {
  boot: 'boot',
  main: 'main',
} as const;

const tilemap = {
  desert: 'desert',
  tuxemon: 'tuxemon',
} as const;

export const key = {
  atlas,
  image,
  scene,
  tilemap,
} as const;
