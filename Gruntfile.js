/* eslint import/no-extraneous-dependencies: 0 */

module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    clean: ["dist"],
    copy: {
      srcToDist: {
        cwd: 'src',
        expand: true,
        src: ['plugin.json', '**/*.html', '!**/*.js', '**/*.css'],
        dest: 'dist'
      },
      pluginDef: {
        expand: true,
        src: [ 'LICENSE', 'README.md', 'CHANGELOG.md' ],
        dest: 'dist',
      },

      imgToDist: {
        cwd: 'src',
        expand: true,
        src: ['img/*'],
        dest: 'dist/'
      },
      
      leaflet: { 
        cwd: 'node_modules/leaflet/dist/',
        expand: true,
        src: ['**/*'], 
        dest: 'dist/vendor/leaflet'
      },
      
      highchartsCss: { 
        cwd: 'node_modules/highcharts/css/',
        expand: true,
        src: ['highcharts.css'], 
        dest: 'dist/vendor/highcharts'
      }
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['env'],
        plugins: ['transform-es2015-modules-systemjs', 'transform-es2015-for-of'],
      },
      dist: {
        files: [
          {
            cwd: 'src',
            expand: true,
            src: ['**/*.js'],
            dest: 'dist',
            ext: '.js'
          },
          { 
            cwd: 'node_modules/highcharts/',
            expand: true,
            src: ['highstock.js'],
            dest: 'dist/vendor/highcharts'
          }
        ]
      },
    },

  });

  grunt.registerTask('default', ['clean', 'copy:srcToDist', 'copy:pluginDef', 'copy:imgToDist', 'copy:leaflet', 'copy:highchartsCss', 'babel']);
};
