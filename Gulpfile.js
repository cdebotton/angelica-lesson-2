'use strict';

var gulp            = require('gulp');
var ServeTask       = require('./tasks/serve');
var StylusTask      = require('./tasks/stylus');
var BrowserifyTask  = require('./tasks/browserify');
var WatchTask       = require('./tasks/watch');
var OpenTask        = require('./tasks/open');

gulp.task('stylus', StylusTask.development);
gulp.task('browserify', BrowserifyTask.development);
gulp.task('serve', ServeTask);
gulp.task('watch', WatchTask);
gulp.task('open', OpenTask);

gulp.task('default', ['stylus', 'browserify', 'watch', 'serve']);

gulp.task('production', [
  'stylus:production',
  'browserify:production',
  'serve:production'
]);
