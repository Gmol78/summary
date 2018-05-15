var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    del = require('del'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlbeautify = require('gulp-html-beautify');

gulp.task('sass', function () {
    return gulp.src('dev/sass/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('pages', function () {
    return gulp.src('dev/pages/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('htmlbeautify', function() {
    var options = {
        indentSize: 2,
        unformatted: [
            'abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite',
            'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math',
            'meter', 'noscript',
            'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small',
            'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text',
            'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'
        ]
    };
    gulp.src('dist/*.html')
        .pipe(htmlbeautify(options))
        .pipe(gulp.dest('dist'))
});

gulp.task('jsconcat', function () {
    return gulp.src('dev/components/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('jsbuild', function () {
    return gulp.src('dev/js/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('phpbuild', function () {
    return gulp.src('dev/pages/*.php')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('pdfbuild', function () {
    return gulp.src('dev/pages/*.pdf')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('imgbuild', function () {
    return gulp.src('dev/components/**/*.+(jpg|png|svg)')
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('clean', function () {
    return del.sync('dist')
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'dist'
            },
            notify: false
        });
    });


gulp.task('build', function (callback) {
    runSequence('clean', ['pages', 'sass', 'jsconcat', 'jsbuild', 'phpbuild', 'pdfbuild', 'imgbuild'], 'htmlbeautify', callback);
});

gulp.task('watch', ['browser-sync', 'build'], function () {
    gulp.watch('dev/**/*.pug',['build']);
    gulp.watch('dev/**/*.sass', ['build']);
    gulp.watch('dev/**/*.js', ['build']);
});
