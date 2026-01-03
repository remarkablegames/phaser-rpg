#!/usr/bin/env bash

# build bundle
BUNDLE=true npm run build -- --base=./

# compress directory into single archive
if [[ $CI != 'true' ]]; then
  NAME=$(npm pkg get name | tr -d \")
  VERSION=$(npm pkg get version | tr -d \")
  zip -r "dist/$NAME-$VERSION.zip" dist
  echo
  find dist -type f -name '*.zip'
  open dist
fi
