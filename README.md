# Set up Gulp:
<pre>npm init</pre>
<pre>npm install gulp --save-dev</pre>
<pre>npm install gulp -g

//if you get permission errors use:
sudo npm install gulp -g</pre>

###  Require gulp in gulpfile.js
<pre>var gulp = require('gulp');

[...]</pre>

#### Test gulp
Add test task to gulpfile.js
<pre>
[...]

gulp.task('myTask', function(){
  console.log('hello gulp');
});
</pre>
Run command to test myTask:
<pre>> gulp myTask</pre>

return:
<pre>> hello gulp</pre>

Remove myTask from gulpfile.js
# Browserify setup

<pre>npm install browserify --save-dev</pre>
<pre>npm install vinyl-source-stream --save-dev</pre>

### Require browserify and vinyl-source-stream in gulpfile.js

<pre>[...]
var browserify = require('browserify');
var source = require('vinyl-source-stream');
[...]</pre>

### Add jsBrowserify chain function to gulp.js:

<pre>gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});</pre>

Note: This task has 'concatInterface' as a dependency. We haven't added that task yet so this cannot run.


### Include new src to the <scripts> tag on index.html
This will link all of your front end .js files:

<pre>src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"</pre>

#### Test browserify

Your .html files should now render in a browser.

## Concat Setup

### Install gulp-concat:

<pre>> npm install gulp-concat --save-dev</pre>

### Require gulp-concat and create gulp-concat task

<pre>
var concat = require('gulp-concat');

//place before browserify task
gulp.task('concatInterface', function() {
  return gulp.src(['./js/\*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});</pre>

<strong>IMPORTANT NOTE: The path in the enteries array should not include a \ before the asterisks. In .md an asterisks will comment out everything after, the \ cancels that action.</strong>

### Because of dependencies when we run the jsBrowserify task, it will run the concatInterface task

<pre>> gulp jsBrowserify</pre>

# minification Setup

<pre>> npm install gulp-uglify --save-dev</pre>

### Include gulp-uglify require in gulpfile.js

<pre>var uglify = require('gulp-uglify');</pre>

### Include minifyScripts task in gulpfile.js

jsBrowserify is a dependency of minifyScripts. Place below jsBrowserify task.

<pre>gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});</pre>

## Build task

Place this snippet at the end of the file.

<pre>gulp.task("build", ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
});</pre>

The 'build' task contains 'clean' task as a dependency. Therefor, this will not run until we add the 'clean' task

## Environmental  Variables

<pre>> npm install gulp-util --save-dev</pre>

Require gulp-util in gulpfile.js
<pre>var utilities = require('gulp-util');</pre>

Create an environmental variable
<pre>var buildProduction = utilities.env.production;</pre>


## Clean Tasks

### Install del package

<pre>> npm install del --save-dev</pre>

### Require del

<pre>var del = require('del');</pre>

### Add 'clean' task to gulpfile.js

<pre>gulp.task("clean", function(){
  return del(['build', 'tmp']);
});
</pre>

#### Now that gulpfile.js has a 'clean' task, we are able to test that...
* the 'build' task is functioning properly
* the environmental variable is functioning properly

Using the following command will run a production build
<pre>> gulp build --production</pre>

The following command will make a development build
<pre>> gulp build</pre>

## dev build and production builds must pass
* If your build or --production build is not working fix it before moving on.

# Linting with JSHint

### Install packages
<pre>> npm install jshint --save-dev</pre>
<pre>> npm install gulp-jshint --save-dev</pre>

## Require jshint in gulpfile.js

<pre>var jshint = require('gulp-jshint');</pre>

# Add jshint task

Because this is not part of our chain of build tasks, put this at the bottom of the file.

<pre>gulp.task('jshint', function(){
  return gulp.src(['js/\*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});</pre>

<strong>IMPORTANT NOTE: The path in the enteries array should not include a \ before the asterisks. In .md an asterisks will comment out everything after, the \ cancels that action.</strong>

#### Test jshint

The following command will start the linting process

<pre>> gulp jshint</pre>

--------------------------------------------------------------------------------
# Bower Setup

### Install/Init Package

Install:
<pre>> npm install bower -g
//Mac users
 sudo npm install bower -g</pre>

Init:
<pre>> bower init</pre>

### Run bower build...
When you make changes front end documents

# Bower jQuery Setup

<pre>> bower install jquery --save-dev</pre>

## Change path in index.html's <sctipt> tags

<pre>src="bower_components/jquery/dist/jquery.min.js"</pre>

# Install bootstrap Package

<pre>> bower install bootstrap --save</pre>

### The following are all the links/script tags you should have in index.html at this point

<pre>    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="build/js/app.js"></script>  </head>
</pre>

# Install Moment.js

Moment.js can easily work with dates and times in various formats in our apps.
<pre>> bower install moment --save</pre>

### Place script link above app.js file

<pre>src="bower_components/moment/min/moment.min.js"</pre>

# Bower packages in gulpfile

<pre>> npm install bower-files --save-dev</pre>

### Add bowerJS task

<pre>gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});</pre>

This task pulls together all JS files, and outputs one concatenated, minified file to link in our index.html

### Each time a new JS front-end dependence, the command will need to be used:

<pre>gulp bowerJs</pre>

#### Add bowerCSS task

<pre>gulp.task('bowerCSS', function () {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});</pre>

This task does the same thing as the bowerJS task, but gathers CSS files, not JS files

### These should each be a property of a <script> element
<pre>//link element
rel="stylesheet" href="build/css/vendor.css"
//script elements
src="build/js/vendor.min.js"
type="text/javascript" src="build/js/app.js"</pre>

### Require Package

<pre>var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});</pre>

### Combine these two bower tasks into one task in gulpfile.js

When we call the 'bower' task it will execute the two dependencies

<pre>gulp.task('bower', ['bowerJS', 'bowerCSS']);</pre>

### Add 'bower' task to build task

Update 'build' task so that it runs 'bower' task to that it runs in parallel to the other tasks

<pre>gulp.task('build', ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bower');
});</pre>

# Using Development Servers with BrowserSync

### Installing Package

<pre>> npm install browser-sync --save-dev</pre>

### Add require to gulpfile.js

<pre>var browserSync = require('browser-sync').create();</pre>

### Add task to start development server using 'serve' task

<pre>gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
});</pre>

### Reloading with BrowserSync and Gulp

* When we call gulp.watch() we pass in 2 arguments. The first is an array of file names that we want gulp to keep an eye on. The second argument is an array of tasks to run whenever any of the aforementioned files change.

<pre>  gulp.watch(['js/\*.js'], ['jsBuild']);
});</pre>

<strong>IMPORTANT NOTE: The path in the enteries array should not include a \ before the asterisks. In .md an asterisks will comment out everything after, the \ cancels that action.</strong>

### Add 'jsBuild' task with dependency chain

<pre>
gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});</pre>

### Update 'serve' task

<pre>gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });

  gulp.watch(['js/\*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);

});</pre>

<strong>IMPORTANT NOTE: The path in the enteries array should not include a \ before the asterisks. In .md an asterisks will comment out everything after, the \ cancels that action.</strong>

### Add 'browserBuild' task

<pre>gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});
</pre>

Note: As you structure your gulpfile, it's very important to be aware of task dependencies. By default, gulp runs all tasks simultaneously. So you must use dependency arrays to specify if a task must be completed before another one.

<pre></pre>
