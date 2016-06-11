# Generator for Ionic framework 

[![NPM version][npm-image]][https://www.npmjs.com/package/generator-hionic] [![Build Status][travis-image]][https://travis-ci.org/DotHide/generator-hionic]

> Create an Ionic project with Grunt using Yeoman

## Usage

First, install [Yeoman](http://yeoman.io) and generator-hionic using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-hionic
```

1) Choose a directory and `cd` into it

```
$ mkdir <my-app-name> && cd $_
```

2) Run `yo hionic` command and you can also use some options

```bash
yo hionic [appName] --appId "com.company.myapp" --appModuleName "myapp"
```

3) When finish yo installation run `grunt serve` to start app.

4) Build App, run `grunt build` to build **ios** (Android not support right now).
You also can run `grunt build:production` to build production version app. However, you must set production constants in Gruntfile at first.

## Structure
Project structure is following:

```
├── app/
│   ├── images/             - Project images
│   ├── lib/                - Libraries managed by Bower
│   ├── scripts/            - Custom AngularJS Scripts
│   ├── scss/               - Sass Stylesheets
│   ├── views/              - HTML views
│   ├── index.html          - Main Ionic app entry point
├── hooks/                  - Cordova lifecycle hooks
├── test/                   - Unit tests
│   ├── spec/
├── .gitignore              - Git ignore file
├── .bowerrc                - Bower rc file
├── bower.json              - Lists front-end dependencies
├── Gruntfile.js            - Configuration of all Grunt tasks
├── package.json            - Dev dependencies and required Cordova plugins
├── config.xml              - Global Cordova configuration
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Martin_nett]()


[npm-image]: https://badge.fury.io/js/generator-hionic.svg
[npm-url]: https://npmjs.org/package/generator-hionic
[travis-image]: https://travis-ci.org/DotHide/generator-hionic.svg?branch=master
[travis-url]: https://travis-ci.org/DotHide/generator-hionic
[daviddm-image]: https://david-dm.org/DotHide/generator-hionic.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/DotHide/generator-hionic
[coveralls-image]: https://coveralls.io/repos/DotHide/generator-hionic/badge.svg
[coveralls-url]: https://coveralls.io/r/DotHide/generator-hionic
