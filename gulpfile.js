const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const del = require('del');
const browserSync = require('browser-sync');
const wait = require('gulp-wait');

//sass array
const cssLinkArray = ['./dev/scss/main.scss'];
// js array
const javaScriptLinkArray = ['./dev/js/main.js'];

//css function
function styles() {
  return gulp
    .src(cssLinkArray)
    .pipe(wait(300))
    .pipe(sass())
    .pipe(concat('styles.min.css'))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
}

//JavaScript function
function scripts() {
  return gulp
    .src(javaScriptLinkArray)
    .pipe(wait(300))
    .pipe(concat('styles.min.js'))
    .pipe(
      terser({
        mangle: false,
      })
    )
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
}

gulp.watch('./dev/scss/**/*.scss', styles);
gulp.watch('./dev/js/**/*.js', scripts);
gulp.watch('./*.html').on('change', browserSync.reload);

function clean() {
  return del(['public/css', 'public/js']);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);

gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
