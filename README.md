## Set up Gulp:
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

## Browserify setup

<pre>npm install browserify --save-dev</pre>
<pre>npm install vinyl-source-stream --save-dev</pre>

### Require browserify and vinyl-source-stream in gulpfile.js

<pre>[...]
var browserify = require('browserify');
var source = require('vinyl-source-stream');
[...]</pre>

### Add jsBrowserify chain function to gulp.js:

<pre>gulp.task('jsBrowserify', function() {
  return browserify({ entries: ['./js/\*-interface.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});</pre>

<strong>IMPORTANT NOTE: The path in the enteries array should not include a "\" before the asterisks. In .md an asterisks will comment out everything after, the "\" cancels that action.</strong>


### Include new src to the <scripts> tag on index.html
This will link all of your front end .js files:

<pre>src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"</pre>

#### Test browserify

YouR .html files should now render in a browser.

## Concat Setup

install concat:
<pre>> npm install gulp-concat --save-dev</pre>


<br>----------------------------------
<pre>bower init</pre>
<pre>npm install bower -g</pre>
<pre>npm install gulp --save-dev</pre>
<pre>npm install gulp-concat --save-dev</pre>
<pre>npm install gulp-uglify --save-dev</pre>
<pre>npm install gulp-util --save-dev</pre>
<pre>npm install del --save-dev</pre>
<pre>npm install jshint --save-dev</pre>
<pre>npm install gulp-jshint --save-dev</pre>
