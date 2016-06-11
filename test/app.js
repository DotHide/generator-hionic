'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-hionic:app', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts({ someAnswer: true })
      .on('end', done);
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
