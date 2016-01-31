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
    
 
var paths = {
  'scripts':{
    front: {
      sources: [
        './bower_components/matchHeight/dist/jquery.matchHeight.js',
        './bower_components/FitText.js/jquery.fittext.js',
        // './js/vendors/jquery.googlemap.js',
        './js/components/is-mobile.js',
        './js/components/scroll-banner.js',
        './js/components/popup-ajax.js',
        './js/components/bikes-filter.js',
        './js/components/sort-bikes-by-price.js',
        './js/components/init.js'
      ],
      output: {
        folder: './js/',
        mainScriptsFile: 'scripts.js'
      }
    }
  },
  'style': {
    all: './scss/**/*.scss',
    output: './'
  },
  'php': {
    all:[
      './*.php',
      './**/*.php'
    ]
  }
};

gulp.task('sass:dev', function () {
  gulp.src( paths.style.all )
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(sourcemaps.write())
  .pipe(gulp.dest( paths.style.output ))
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(livereload());
});
 

gulp.task('sass:build',function () {
  gulp.src( paths.style.all )
    .pipe(sass())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(minifycss())
    .pipe(gulp.dest( paths.style.output ));
});

gulp.task('jsconcat:dev', function() {
  gulp.src( paths.scripts.front.sources )
    .pipe(concat( paths.scripts.front.output.mainScriptsFile ))
    .pipe(gulp.dest(paths.scripts.front.output.folder))
    .pipe(livereload());
});

gulp.task('jsconcat:build', function() {
  gulp.src( paths.scripts.front.sources )
    .pipe(concat( paths.scripts.front.output.mainScriptsFile ))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.front.output.folder));
});


//-----------   WATCHERS   ---------------------//

// gulp watcher for sass
gulp.task('watch:sass', function () {
  livereload.listen();
  gulp.watch(paths.style.all, ['sass:dev']);
});

// gulp watcher for php
gulp.task('watch:php', function () {
  livereload.listen();
  gulp.watch(paths.php.all).on('change', livereload.changed);
});

// gulp watcher for js
gulp.task('watch:js', function () {
  livereload.listen();
  gulp.watch(paths.scripts.front.sources, ['jsconcat:dev']);
});

// gulp watch sass, php, lint & js
gulp.task('watch', [
  'watch:sass',
  'watch:js',
  'watch:php'
]);

// gulp.task('sass:watch', function () {
//   livereload.listen();
//   gulp.watch(['./scss/**/*.scss','./scss/**/**/*.scss'], ['sass:dev']);
//   gulp.watch('js/scripts/*.js', ['jsconcat:dev']);
//   /* Trigger a live reload on any Django template changes */
//   gulp.watch(['*.php', '**/*.php']).on('change', livereload.changed);
// });

gulp.task('dev', ['watch'],function () {
});

gulp.task('build', ['sass:build', 'jsconcat:build'],function () {
});
