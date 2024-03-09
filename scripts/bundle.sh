#!/usr/bin/env sh

BUNDLE=true npm run build -- --base=./

# zip file
if [[ $CI != 'true' ]]; then
  zip -r "dist/$(npm pkg get name | tr -d \")-$(npm pkg get version | tr -d \").zip" dist
  echo
  find dist -type f -depth 1 -name '*.zip'
  open dist
fi
