// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

// Lint Task
gulp.task('lint', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('less', function() {
    return gulp.src('less/*.less')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('src/libs'))
        .pipe(rename('all.min.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dst/libs'));
});

gulp.task('vendors', function(){
  return gulp.src(
    [
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/jquery/dist/jquery.min.js'
    ])
      .pipe(concat('vendors.js'))
      .pipe(gulp.dest('src/libs'))
      .pipe(rename('vendors.min.js'))
      .pipe(gulp.dest('dst/libs'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('less/*.less', ['less']);
});

// Default Task
gulp.task('default', ['lint', 'less', 'scripts', 'vendors']);
