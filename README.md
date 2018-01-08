# Kindred Front-end Test | João A. P. Sieben.

This Landing page was developed as a test only. It uses:
 * [Yarn](https://yarnpkg.com/pt-BR/), as package manager (but it works with [NPM](https://www.npmjs.com/) too);
 * [React](https://reactjs.org/), to dynamically mount the page, and fetch all the required data;
 * [Babel](http://babeljs.io/), to convert fancy new JS syntax into something simpler, so that any browser can understand it;
 * [PostCSS](http://postcss.org/), to compile/autoprefix the style files;
 * [Webpack](https://webpack.js.org/), to bundle all the files into DEV and PROD versions.

## Installation Instructions

### Requirements
* [NodeJS](https://nodejs.org/en/);
* [GIT Bash](https://git-scm.com/), or any other Linux-like terminal.

After downloading, you need to run the `yarn` command to download all the required packages that are listed in `package.json`. After that, simply run `yarn start` to start the Development version, or `yarn build`, to generate another build that will be placed at the `dist/` folder.

To run the application, you can access the contents of the `dist/` folder. That's the final Production build.

To access the Development version, you need to access the `src/` folder.

The Application will have a Carousel component, with data provided from an API that returns all the information abouit live matches that are available on [Unibet](https://www.unibet.com/) website. You can click on the button **Place a bet** to be redirected to the match page on Unibet's website.

That's all! Thanks for your time.
