'use strict';
 
var gulp = require('gulp');

var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');
    
 
gulp.task('sass:dev', function () {
  gulp.src(['./scss/**/*.scss'])
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(sourcemaps.write())
  .pipe(gulp.dest('./'))
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(livereload());
});
 

gulp.task('sass:build',function () {
  gulp.src(['./scss/**/*.scss'])
    .pipe(sass())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(minifycss())
    .pipe(gulp.dest('./'));
});

gulp.task('jsconcat:dev', function() {
  return gulp.src(['js/vendor/plugins.js', 'js/scripts/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('js/'))
    .pipe(livereload());
});

gulp.task('jsconcat:build', function() {
  return gulp.src('js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/'));
});

gulp.task('sass:watch', function () {
  livereload.listen();
  gulp.watch(['./scss/**/*.scss','./scss/**/**/*.scss'], ['sass:dev']);
  gulp.watch('js/scripts/*.js', ['jsconcat:dev']);
  /* Trigger a live reload on any Django template changes */
  gulp.watch(['*.php', '**/*.php']).on('change', livereload.changed);
});

gulp.task('dev', ['sass:watch'],function () {
});

gulp.task('build', ['sass:build', 'jsconcat:build'],function () {
});
