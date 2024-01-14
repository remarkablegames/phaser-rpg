# phaser-rpg

<kbd>phaser-rpg</kbd> is a template for making [Phaser](https://phaser.io/) RPG games.

Inspired by [`phaser-3-tilemap-blog-posts`](https://github.com/mikewesthad/phaser-3-tilemap-blog-posts/tree/master/examples/post-1) (see [Medium story](https://medium.com/@michaelwesthadley/958fc7e6bbd6)).

Demo:

- [remarkablegames](https://remarkablegames.org/phaser-rpg)

Stack:

- [Phaser](https://phaser.io/)
- [Vite](https://vitejs.dev/)
- [GitHub Pages](https://pages.github.com/)

## Prerequisites

- [nvm](https://github.com/nvm-sh/nvm#readme)

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

## Environment Variables

Set the environment variables:

```sh
less .env
```

Update the **Secrets** in the repository **Settings**.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the game in the development mode.

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.

You will also see any errors in the console.

### `npm run build`

Builds the game for production to the `dist` folder.

It correctly bundles in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your game is ready to be deployed!

## Upload

Open `index.html` and remove the GitHub Corners script.

Build the game artifacts:

```sh
npm run build
```

Replace absolute URLs with relative URLs:

```sh
sed -i '' -e 's|src="/|src="|g' -e 's|href="/|href="|g' dist/index.html
```

Zip the game artifacts (replace `<version>` with the semver):

```sh
zip -r <version>.zip dist
```

Upload the zip archive to the game platform.

## License

[MIT](LICENSE)
