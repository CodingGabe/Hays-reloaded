// I gots sass being compiled, then minified and saved live, and also live reloading with browser synce
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('workflow', function () {
	gulp.src('./src/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(cssnano())
		.pipe(sourcemaps.write('./'))
		.pipe(browserSync.stream())

	.pipe(gulp.dest('./dist/css/'))
});

// browser sync watches any change to the html and sass injection and auto loads the local browser
gulp.task('serve', ['workflow'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch('./src/sass/**/*.scss', ['workflow']);
    gulp.watch('/*.html').on('change', browserSync.reload);
});


gulp.task('default', ['workflow','serve']);
