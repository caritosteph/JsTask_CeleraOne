module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': 'src/**/*.js'
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        globals: {
          console: true,
          module: true
        }
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'src',
        src: 'index.html',
        dest: 'dist'
      },
    },
    injector: {
        options: {
          ignorePath: ['src','dist']
        },
        dev: {
          files: {
            'src/index.html': ['src/*.js'],
          }
        },
        prod: {
          files: {
            'dist/index.html': ['dist/*.min.js'],
          }
        }
    },
    watch: {
        files: ['<%= jshint.files %>','src/*.html'],
        tasks: ['jshint', 'uglify']
    },
    browserSync: {
      dev: {
          bsFiles: {
              src : [
                  'src/*.html'
              ]
          },
          options: {
              watchTask: true,
              server: {
                baseDir: "./src"
              }
          }
      },
      prod: {
          bsFiles: {
              src : [
                  'dist/*.html'
              ]
          },
          options: {
              watchTask: true,
              server: {
                baseDir: "./dist"
              }
          }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('dev', ['jshint','injector:dev','browserSync:dev','watch']);
  grunt.registerTask('prod', ['jshint','copy','injector:prod','uglify','browserSync:prod','watch']);

};
