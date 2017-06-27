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

# gulp-uglify (minification) Setup
















<br>----------------------------------
<pre>bower init</pre>
<pre>npm install bower -g</pre>
<pre>npm install gulp --save-dev</pre>
<pre>npm install gulp-uglify --save-dev</pre>
<pre>npm install gulp-util --save-dev</pre>
<pre>npm install del --save-dev</pre>
<pre>npm install jshint --save-dev</pre>
<pre>npm install gulp-jshint --save-dev</pre>
