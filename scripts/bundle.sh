#!/usr/bin/env bash

# build bundle
BUNDLE=true npm run build -- --base=./

# zip file
zip -r "dist/$(npm pkg get name | tr -d \")-$(npm pkg get version | tr -d \").zip" dist
echo
find dist -type f -name '*.zip'

# open folder
if [[ $CI != 'true' ]]; then
  open dist
fi
