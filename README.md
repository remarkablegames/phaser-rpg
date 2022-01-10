# phaser-rpg

<kbd>phaser-rpg</kbd> is a template for making [Phaser](https://phaser.io/) RPG games.

The template was bootstrapped with [`phaser-template`](https://github.com/remarkablegames/phaser-template).

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)

## Install

Clone the repository:

```sh
git clone https://github.com/remarkablegames/phaser-rpg.git
cd phaser-rpg
```

Install the dependencies:

```sh
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](https://create-react-app.dev/docs/deployment/) for more information.

### `npm run release`

Bumps the `package.json` version with [standard-version](https://github.com/conventional-changelog/standard-version).

## Environment Variables

Environment variables work similarly to [Create React App](https://create-react-app.dev/docs/adding-custom-environment-variables/) except they begin with `WEB_APP_` instead of `REACT_APP_`.

For example:

```sh
# .env
WEB_APP_VERSION=$npm_package_version
WEB_APP_DOMAIN=www.example.com
WEB_APP_FOO=$DOMAIN/foo
```

## Testing

Run tests similar to [Create React App](https://create-react-app.dev/docs/running-tests):

```sh
npm test
```

## Build

Build the production app locally:

```sh
npm run build

# if your app is hosted at a subdirectory
mv build $(node -p "require('./package').name")

# if your app is hosted at the root
cd build
```

Start the server:

```sh
python -m SimpleHTTPServer
```

Stop the server with `Ctrl + C`.

View the app in a new Terminal tab or window:

```sh
open http://localhost:8000
# if your app is hosted at a subdirectory, make sure to open the directory
```

Don't forget to clean up the build directory after you're done:

```sh
# if your app is hosted at a subdirectory
rm -rf $(node -p "require('./package').name")

# if your app is hosted at the root
rm -rf build
```

## License

[MIT](LICENSE)
