'use strict';

var gulp          = require('gulp');
// var nodemon       = require('gulp-nodemon');
// var lrserver      = require('tiny-lr')();
// var compileJS     = require('./browserify');
// var refresh       = require('gulp-livereload');
// var Buffers       = require('../buffers');

module.exports = function () {
  require('../index');
  // nodemon({
  //   script: './index.js',
  //   ext: 'js html',
  //   env: { NODE_ENV: 'development' },
  //   stdout: false,
  //   ignore: ['public/**', 'Gulpfile.js', 'node_modules/**', 'bower_components/**', 'tasks/**/*.js'],
  //   nodeArgs: ['--debug']
  // })
  //   .on('change', function(changed) {
  //     compileJS.development();
  //   })
  //   .on('readable', function() {
  //     this.stdout.on('data', function(data) {
  //       var str = data.toString('utf-8', 0, 35);
  //       var cpr = Buffers.READY.toString('utf-8', 0, 35);
  //       if (data.toString() === Buffers.READY.toString()) {
  //         gulp.src('./app/index.js')
  //           .pipe(refresh(lrserver));
  //       }
  //     });
  //   })
  //   .on('start', function(changed) {
  //     console.log('Change observed, server restarted', changed);
  //   });
};

// exports.production = function() {
//   require('../index');
// };
