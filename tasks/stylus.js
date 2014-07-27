var gulp      = require('gulp');
var stylus    = require('gulp-stylus');
var rename    = require('gulp-rename');
var plumber   = require('gulp-plumber');
var normalize = require('stylus-normalize/stylus-normalize');
var nib       = require('nib');
var lrserver    = require('tiny-lr')();
var livereload  = require('gulp-livereload');

exports.development = function() {
  gulp.src('./app/styles/index.styl')
    .pipe(stylus({ use: [nib(), normalize()], debug: true }))
    .pipe(plumber())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('./public/stylesheets/'))
    .pipe(livereload(lrserver));
};
