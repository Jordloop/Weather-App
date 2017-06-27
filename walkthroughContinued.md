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
