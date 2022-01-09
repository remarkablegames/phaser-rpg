# phaser-template

<kbd>phaser-template</kbd> is a template for making [Phaser 3](https://phaser.io/) games.

The template was bootstrapped with [`web-app-template`](https://github.com/remarkablemark/web-app-template). The game is inspired by the tutorial "[Making your first Phaser 3 game](https://phaser.io/tutorials/making-your-first-phaser-3-game)".

Demo:

- [GitHub Pages](https://remarkablegames.org/phaser-template/)
- [Replit](https://replit.com/talk/share/Phaser-Template/22850)
- [CodeSandbox](https://codesandbox.io/s/phaser-template-4fy4y)

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)

## Install

Clone the repository:

```sh
git clone https://github.com/remarkablegames/phaser-template.git
cd phaser-template
```

Rename the project:

```sh
git grep -l phaser-template | xargs sed -i '' -e 's/phaser-template/my-game/g'
git grep -l 'Phaser Template' | xargs sed -i '' -e 's/Phaser Template/My Game/g'
```

Update the files:

- [ ] `README.md`
- [ ] `package.json`
- [ ] `public/index.html`
- [ ] `public/manifest.json`
- [ ] `src/index.js`

Install the dependencies:

```sh
npm install
```

Initialize a new repository:

```sh
rm -rf .git
git init
```

Make your first commit:

```sh
git add .
git commit -m 'feat: initialize project from phaser-template'
```

> Commit messages follow the [Conventional Commits](https://conventionalcommits.org/) format, which is used during release.

Once you're ready, [push the local repository to GitHub](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/) (or another remote repository):

```sh
git remote add origin <remote-repository-url>
git push origin -u origin master
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

Tests are run just like [Create React App](https://create-react-app.dev/docs/running-tests):

```sh
npm test
```

## Build

You can build the production app locally:

```sh
npm run build

# if your app is hosted at a subdirectory
mv build $(node -p "require('./package').name") # web-app-template

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
rm -rf $(node -p "require('./package').name") # web-app-template

# if your app is hosted at the root
rm -rf build
```

## Layout

Directory structure (dotfiles are omitted):

```sh
tree -I 'build|node_modules'
.
├── LICENSE
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── assets
│   │   ├── dude.png
│   │   ├── index.ts
│   │   ├── platform.png
│   │   ├── sky.png
│   │   └── star.png
│   ├── constants
│   │   └── index.ts
│   ├── index.css
│   ├── index.ts
│   ├── scenes
│   │   ├── Boot.ts
│   │   ├── Main.ts
│   │   └── index.ts
│   ├── sprites
│   │   ├── Player.ts
│   │   ├── Star.ts
│   │   └── index.ts
│   ├── texts
│   │   ├── Score.ts
│   │   └── index.ts
│   └── web-app-env.d.ts
└── tsconfig.json

7 directories, 27 files
```

## Migration

Migrate your project to use [@descriptive/web-scripts](https://www.npmjs.com/package/@descriptive/web-scripts):

```sh
npx web-scripts-migration --phaser
```

## License

[MIT](LICENSE)
