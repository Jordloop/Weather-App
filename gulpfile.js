//-----REQUIREMENTS----
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});
// ----ENVIRONMENTAL VARIABLE----
var buildProduction = utilities.env.production;

//----BUILD CHAIN-----
gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});
gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});
gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

gulp.task("clean", function(){
  return del(['build', 'tmp']);
});
gulp.task("build", ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bower');
});

//----LINTER-----
gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//----BOWER-FILES----
//Concats front-end JS dependencies to "vendor.min.js"
gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});
//Concats front-end CSS dependencies to "vendor.css"
gulp.task('bowerCSS', function () {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});
//Executed bowerJS taska and bowerCSS task in parallel
gulp.task('bower', ['bowerJS', 'bowerCSS']);

//Starts the development server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });

//Watches for changes in argument1, when changes take place execute argument2
  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);

});
gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});
gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});
