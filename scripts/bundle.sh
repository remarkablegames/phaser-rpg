#!/usr/bin/env sh

BUNDLE=true npm run build

# replace absolute URLs with relative URLs
if [[ $(uname) == 'Darwin' ]]; then
  sed -i '' -e 's|src="/|src="|g' -e 's|href="/|href="|g' dist/index.html
else
  sed -i -e 's|src="/|src="|g' -e 's|href="/|href="|g' dist/index.html
fi

# zip file
if [[ $CI != 'true' ]]; then
  zip -r "dist/$(npm pkg get name | tr -d \")-$(npm pkg get version | tr -d \").zip" dist
  echo
  find dist -type f -depth 1 -name '*.zip'
  open dist
fi
