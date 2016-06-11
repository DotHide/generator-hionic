'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-hionic:app', function() {
  beforeEach(function() {
    this.hionic = helpers
      .run(require.resolve('../app'));
  });

  describe('create project structure', function() {
    beforeEach(function(done) {
      this.hionic.on('end', done);
    });

    it('Package files', function() {
      assert.file([
        'bower.json',
        'config.xml',
        'Gruntfile.js',
        'package.json'
      ]);
    });

    it('App folder', function() {
      assert.file([
        'app/index.html',
        'app/scripts/app.module.js',
        'app/scss/styles.scss'
      ]);
    });
  });

  describe('option: --appName', function() {
    beforeEach(function(done) {
      this.hionic
        .withArguments(['appName'])
        .on('end', done);
    });

    it('generates appName in project files', function() {
      assert.fileContent(
        'app/scripts/app.module.js',
        /module\('appName'/
      );

      assert.fileContent(
        'app/index.html',
        /ng-app="appName"/
      );
    });
  });

});
