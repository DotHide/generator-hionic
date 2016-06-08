module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    yeoman: {
      app: 'app',
      dist: 'www',
      temp: '.temp'
    },

    server: {
      ip: '0.0.0.0',
      port: '3000'
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%%= yeoman.temp %>',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.temp/<%%= yeoman.styles %>/',
          src: '{,*/}*.css',
          dest: '.temp/<%%= yeoman.styles %>/'
        }]
      }
    },

    ngconstant: {
      options: {
        space: ' ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'ngconstant',
        dest: '<%%= yeoman.app %>/scripts/configuration.js',
        constants: {
          PGYER_API: {
            url_prefix: "http://www.pgyer.com/apiv1/app"
          }
        }
      },
      development: {
        constants: {
          AppServer: {
            baseUrl: '<%%= server.ip %>:<%%= server.port %>'
          }
        }
      },
      production: {
        constants: {
          AppServer: {
            baseUrl: 'api_url' // Replace it to your API url
          }
        }
      }
    },

    shell: {
      'ionic-build': {
        command: 'ionic build ios'
      }
    },

    parallel: {
      ionic: {
        tasks: [{
          stream: true,
          cmd: 'ionic',
          args: ['serve', '-w', 'chrome', '-a']
        }, {
          grunt: true,
          args: ['watch']
        }]
      }
    },

    concurrent: {
      server: [
        'copy:ionic-fonts'
        // 'copy:fa-fonts'
      ]
    },

    watch: {
      index: {
        files: ['<%%= yeoman.app %>/index.html'],
        tasks: ['wiredep', 'injector', 'newer:copy:app']
      },
      views: {
        files: ['<%%= yeoman.app %>/views/**'],
        tasks: ['ngtemplates']
      },
      wiredep: {
        files: ['<%%= yeoman.app %>/lib/*'],
        tasks: ['wiredep']
      },
      scripts: {
        files: ['<%%= yeoman.app %>/scripts/**/*.js'],
        tasks: ['injector', 'ngAnnotate', 'newer:copy:temp', 'newer:jshint:all']
      },
      sass: {
        files: ['<%%= yeoman.app %>/scss/*'],
        tasks: ['sass']
      }
    },

    copy: {
      app: {
        expand: true,
        cwd: '<%%= yeoman.app %>',
        dest: '<%%= yeoman.dist %>',
        src: [
          'images/**',
          'lib/**',
          'fonts/*',
          'index.html'
        ]
      },
      'ionic-fonts': {
        expand: true,
        cwd: '<%%= yeoman.app %>/lib/ionic/release/fonts',
        src: '*',
        dest: '<%%= yeoman.app %>/fonts'
      },
      // 'fa-fonts': {
      //   expand: true,
      //   cwd: '<%%= yeoman.app %>/lib/font-awesome/fonts',
      //   src: '*',
      //   dest: '<%%= yeoman.app %>/fonts'
      // },
      temp: {
        expand: true,
        cwd: '<%%= yeoman.temp %>',
        dest: '<%%= yeoman.dist %>',
        src: [
          '**/*'
        ]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            'images/*',
            '*.html',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '<%%= yeoman.temp %>/images',
          src: 'generated/*',
          dest: '<%%= yeoman.dist %>/images'
        }, {
          expand: true,
          cwd: '<%%= yeoman.temp %>/styles',
          src: '*',
          dest: '<%%= yeoman.dist %>/styles'
        }]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%%= yeoman.app %>/scripts/**/*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/unit/**/*.js']
      }
    },

    wiredep: {
      app: {
        src: ['app/index.html'],
        ignorePath: /\.\.\//
      }
    },

    injector: {
      options: {
        template: '<%%= yeoman.app %>/index.html',
        relative: true,
        addRootSlash: false
      },
      scripts: {
        files: {
          '<%%= yeoman.app %>/index.html': [
            '<%%= yeoman.app %>/scripts/**/*.module.js',
            '<%%= yeoman.app %>/scripts/**/*.js'
          ]
        }
      },
      styles: {
        files: {
          '<%%= yeoman.dist %>/index.html': [
            '<%%= yeoman.dist %>/styles/*.css'
          ]
        }
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      app: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/scripts',
          src: '**/*.js',
          dest: '<%%= yeoman.temp %>/scripts'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.temp %>/concat/scripts',
          src: [
            '*.js'
          ],
          dest: '<%%= yeoman.temp %>/concat/scripts'
        }]
      }
    },

    ngtemplates: {
      app: {
        options: {
          prefix: '<%= appModuleName %>',
          module: '<%= appModuleName %>',
          htmlmin: 'htmlmin.dist.options'
        },
        cwd: '<%%= yeoman.app %>/views',
        src: '**/*.html',
        dest: '<%%= yeoman.app %>/scripts/templates.js'
      }
    },

    sass: {
      app: {
        options: {
          style: 'compact'
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/scss',
          src: ['*.scss'],
          dest: '<%%= yeoman.temp %>/styles',
          ext: '.css'
        }]
      }
    },

    // 代码压缩
    useminPrepare: {
      html: '<%%= yeoman.app %>/index.html',
      options: {
        dest: '<%%= yeoman.dist %>',
        staging: '<%%= yeoman.temp %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglify'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    usemin: {
      html: '<%%= yeoman.dist %>/index.html',
      options: {
        assetsDirs: ['<%%= yeoman.dist %>']
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        }
      }
    },

    // cssmin: {
    //   options: {
    //     noRebase: true
    //   }
    // },

    // concat: {
    //   generated: {
    //     files: [{
    //       dest: '<%%= yeoman.temp %>/concat/scripts/app.js',
    //       src: [
    //         '<%%= yeoman.temp %>/scripts/**/*.js'
    //       ]
    //     }]
    //   }
    // },

    // uglify: {
    //   generated: {
    //     files: [{
    //       dest: '<%%= yeoman.dist %>/scripts/app.js',
    //       src: ['<%%= yeoman.temp %>/concat/scripts/app.js']
    //     }]
    //   }
    // },

  });

  grunt.registerTask('serve', function(target) {
    var ngconstant = target === 'production' ? 'ngconstant:production' :
      'ngconstant:development';
    grunt.task.run([
      'clean',
      'sass:app',
      ngconstant,
      'wiredep',
      'ngtemplates',
      'injector:scripts',
      'ngAnnotate:app',
      'concurrent:server',
      'autoprefixer',
      'newer:copy:app',
      'newer:copy:temp',
      'injector:styles',
      'parallel:ionic'
    ]);
  });

  grunt.registerTask('build', function(target) {
    var ngconstant = target === 'production' ? 'ngconstant:production' :
      'ngconstant:development';
    grunt.task.run([
      'clean',
      'sass:app',
      ngconstant,
      'wiredep',
      'ngtemplates',
      'injector:scripts',
      'useminPrepare',
      'concurrent:server',
      'autoprefixer',
      'concat',
      'ngAnnotate:dist',
      'copy:dist',
      'injector:styles',
      'cssmin',
      'uglify',
      'usemin',
      'shell:ionic-build'
    ]);
  });

};
