const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const gulpStylelint = require('gulp-stylelint');
const gulprename = require('gulp-rename');
const gulpjsminify = require('gulp-minify')
const autoprefixer = require('gulp-autoprefixer');

function style () {  
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream())
}

function styleMin () {  
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(csso())
    .pipe(gulprename(function(path) {
        path.basename += ".min"
    }))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream())
}

function jsMinify () {
    return gulp.src('./src/js/**/*.js')
    .pipe(gulpjsminify())
    .pipe(gulp.dest('./assets/js'))
    .pipe(browserSync.stream())
}

function img () {
    return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./assets/img'))
    .pipe(browserSync.stream())
}

function watch () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./src/scss/**/*.scss' , style);
    gulp.watch('./src/scss/**/*.scss' , styleMin);
    gulp.watch('./src/img/*' , img);
    gulp.watch('./src/js/**/*.js' , jsMinify);
    gulp.watch('./*.html').on('change', browserSync.reload);
}

exports.styleMin = styleMin;
exports.jsMinify = jsMinify;
exports.style = style;
exports.img = img;
exports.watch = watch;