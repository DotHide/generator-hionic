'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var fs = require('fs');

module.exports = yeoman.Base.extend({
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
      this.appName = this.appName || path.basename(process.cwd());
      this.appName = _.camelCase(this.appName).capitalize(this.appName);
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
      this.template('_bowerrc', 'bowerrc');
      this.template('_bower.json', 'bower.json');
      this.template('_package.json', 'package.json');
      this.template('_Gruntfile.js', 'Gruntfile.js');
    }
  },

  writing: {
    installIonic: function() {
      this.log(chalk.yellow('Installing ionic blank template. Pls wait ...'));
      var done = this.async();
      var callback = function(error, remote) {
        if (error) {
          done(error);
        }

        remote.directory('.', 'app');
        this.starterCache = remote.cachePath;

        done();
      }.bind(this);

      this.remote('driftyco', 'ionic-starter-blank', 'master', callback, true);
    }
  }
});
