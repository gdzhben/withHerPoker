const gulp = require('gulp');

const jasmine = require('gulp-jasmine');
const clean = require('gulp-clean');
const jasmineBrowser = require('gulp-jasmine-browser');


const paths = {
    build: {
        root: 'build',
        jsFiles: 'build/**/*.js',
        jsMapFiles: 'build/**/*.js.map',
        specJsFiles: 'build/**/*.spec.js',
        all: 'build/**/*'
    },
    src: {
        root: 'src',
        jsFiles: 'src/**/*.js',
        specJsFiles: 'src/**/*.spec.js',
        all: 'src/**/*'
    }
}

gulp.task('test', function () {
    return gulp.src(paths.build.specJsFiles)
        .pipe(jasmine());
});

gulp.task('clean', function () {
    return gulp.src(paths.build.root, { read: false })
        .pipe(clean());
});

gulp.task('cleanjs', function () {
    return gulp.src([
        paths.build.jsFiles,
        paths.build.jsMapFiles], { read: false })
        .pipe(clean());
});