'use strict';

var fs = require('fs');
var path = require('path');
var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var _ = require('lodash');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
    this.log(yosay('Welcome to ' + chalk.red('generator-hionic') + '!'));

    // Options
    this.argument('appName', {
      type: String,
      required: false
    });

    this.option('appId', {
      type: String,
      required: false
    });

    this.option('appModuleName', {
      type: String,
      required: false
    });

  },

  configuring: {
    configVars: function() {
      this.log(chalk.yellow('Starting configuring ..'));
      this.appName = this.appName || path.basename(process.cwd());
      this.appName = _.camelCase(this.appName);
      this.log(chalk.yellow(this.appName + ' configured!'));
      this.appModuleName = this.options.appModuleName || _.lowerCase(this.appName);
      this.appId = this.options.appId || 'com.ionic.' + this.appName;
      this.appPath = 'app';
    },

    configEnv: function() {
      var invisibleFiles = ['Thumbs.db', '.DS_Store'];
      _.forEach(invisibleFiles, function(filename) {
        var file = path.join(process.cwd(), filename)
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });

      this.sourceRoot(path.join(__dirname, '../templates/'));
      this.directory('statics', '.', true);
    },

    pkgFiles: function() {
      this.template('packages/_bowerrc', '.bowerrc');
      this.template('packages/_bower.json', 'bower.json');
      this.template('packages/_package.json', 'package.json');
      this.template('packages/_Gruntfile.js', 'Gruntfile.js');
      this.template('packages/_config.xml', 'config.xml');
    }
  },

  writing: {
    installIonic: function() {
      this.log(chalk.yellow('Installing ionic blank template. Pls wait ...'));

      this.directory('app', 'app', true);
      mkdirp.sync(path.join(this.destinationPath(), 'app/images'));
      mkdirp.sync(path.join(this.destinationPath(), 'app/views'));

      this.fs.copyTpl(
        this.templatePath('app/index.html'),
        this.destinationPath('app/index.html'), { "appName": this.appName }
      );
    },

    hooks: function() {
      this.directory('hooks', 'hooks', true);
    },

    packages: function() {
      this.installDependencies();
    }
  }
});
