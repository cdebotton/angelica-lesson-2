'use strict';

var express     = require('express');
var url         = require('url');
var gulp        = require('gulp');
var app         = express();
var serveStatic = require('serve-static');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');
var ReactAsync  = require('react-async');
var livereload  = require('connect-livereload');
var lrserver    = require('tiny-lr')();
var refresh     = require('gulp-livereload');
var lrport      = 35729;
var serverport  = 3000;
var Buffers     = require('./buffers');
var env         = process.env.NODE_ENV === 'production' ?
                    'production' :
                    'development';

// require('node-jsx').install();
// var client = require('./app');

app.set('views', './app/views')
   .set('view engine', 'jade')
   .use(livereload({ port: lrport }))
   .use(serveStatic('./public'))
   .use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .use(cookieParser())
   .use(function(req, res, next) {
     res.render('index');
   })
   // .use(function(req, res, next) {
   //   var path = url.parse(req.path).pathname;
   //   var App = client({path: path});
   //   ReactAsync.renderComponentToStringWithAsyncState(App, function(err, html) {
   //     if (err) next(err);
   //     res.send('<!doctype html>\n'+html);
   //   });
   // })
   .listen(serverport, function() {
     if (env === 'development') {
       process.stdout.write(Buffers.READY);
     }
   });
