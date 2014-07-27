'use strict';

var gulp        = require('gulp');
var refresh     = require('gulp-livereload');
var lrserver    = require('tiny-lr')();
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');

exports.development = function() {
  browserify({ debug: true })
    .require(require.resolve('../app/index.js'), { entry: true })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/javascripts/'))
    .pipe(refresh(lrserver));
};
