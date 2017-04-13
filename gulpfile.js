const gulp = require('gulp');

const jasmine = require('gulp-jasmine');
const clean = require('gulp-clean');
const jasmineBrowser = require('gulp-jasmine-browser');
const istanbul = require('gulp-istanbul');
const remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
var open = require('gulp-open');

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
    },
    coverage: {
        root: 'coverage',
        jsonFile: 'coverage/coverage-final.json',
        mapJson: 'coverage/coverage-map.json',
        mapHtmlReport: 'coverage/html-report',
        indexFile: 'coverage/html-report/index.html'
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

gulp.task('clean-coverage', function () {
    return gulp.src(paths.coverage.root, { read: false })
        .pipe(clean());
});

gulp.task('pre-coverage', ['clean-coverage'], function () {
    return gulp.src([paths.build.jsFiles, '!' + paths.build.specJsFiles])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task('covering', ['pre-coverage'], function () {
    return gulp.src(paths.build.specJsFiles)
        .pipe(jasmine())
        .pipe(istanbul.writeReports());
});

gulp.task('coverage', ['covering'], function () {
    return gulp.src(paths.coverage.jsonFile)
        .pipe(remapIstanbul({
            reports: {
                'json': paths.coverage.mapJson,
                'html': paths.coverage.mapHtmlReport
            }
        }));
});

gulp.task('open-coverage-report', function () {
    gulp.src(paths.coverage.indexFile)
        .pipe(open());
});
