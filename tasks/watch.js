'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var watchify = require('watchify');
var lrserver = require('tiny-lr')();
var refresh = require('gulp-livereload');
var source = require('vinyl-source-stream');

module.exports = function() {
  gulp.watch('./app/**/*.styl', ['stylus']);

  var bundler = watchify('./app/index.js');
  function rebundle() {
    bundler.transform('reactify')
      .bundle()
      .on('error', gutil.log)
      .on('log', gutil.log)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/javascripts/'))
      .pipe(refresh(lrserver));
  }
  bundler.on('update', rebundle);
  rebundle();
};
