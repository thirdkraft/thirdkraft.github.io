var basePaths = {
    src: 'dev/',
    dest: 'dist/',
    bower: 'bower_components/'
};
var paths = {
    scripts: {
        src: basePaths.src + 'js/',
        dest: basePaths.dest + 'js/'
    },
    styles: {
        src: basePaths.src + 'sass/',
        dest: basePaths.dest + 'css/'
    }
};

var appFiles = {
    styles: paths.styles.src + '**/*.scss',
    scripts: paths.scripts.src + '**/*.js',
    pages: ['./**/*.php','./**/*.html']
};

var vendorFiles = {
    styles: '',
    scripts: ''
};

/*
    Let the magic begin
*/

var gulp = require('gulp');

var es = require('event-stream');
var gutil = require('gulp-util');

var browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

var normalize = require('node-normalize-scss').includePaths;
var neat = require('node-neat').includePaths;
var bitters = './node_modules/Bitters/app/assets/stylesheets';

// Allows gulp --dev to be run for a more verbose output
var isProduction = true;
var sassStyle = 'compressed';
var sourceMap = false;

if(gutil.env.dev === true) {
    sassStyle = 'expanded';
    sourceMap = true;
    isProduction = false;
}

var changeEvent = function(evt) {
    gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
};

var reportError = function(error) {
    var lineNumber = (error.line) ? 'LINE ' + error.line + ' -- ' : '';
    plugins.notify({
        title: 'Task Failed [' + error.plugin + ']',
        message: lineNumber + 'See console.'
    }).write(error);
    // Pretty error reporting
    var report = '';
    var chalk = gutil.colors.white.bgRed;
    report += chalk('TASK:') + ' [' + error.plugin + ']\n';
    report += chalk('PROB:') + ' ' + error.message + '\n';
    if (error.line) {
        report += chalk('LINE:') + ' ' + error.line + '\n';
    }
    if (error.fileName) {
        report += chalk('FILE:') + ' ' + error.fileName + '\n';
    }
    console.error(report);
    // Prevent the 'watch' task from stopping
    this.emit('end');
}

gulp.task('css', function() {
    var sassFiles = gulp.src(paths.styles.src + 'styles.scss')
    .pipe(plugins.sass({
        includePaths: [normalize, bitters].concat(neat),
        outputStyle: 'compressed'
    }).on('error', reportError));

    return es.merge(gulp.src(vendorFiles.styles), sassFiles)
    .pipe(plugins.concat('styles.min.css'))
    .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(isProduction ? plugins.combineMediaQueries({ log: true }) : gutil.noop())
    .pipe(isProduction ? plugins.cssmin() : gutil.noop())
    .pipe(plugins.size())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', function(){

    gulp.src(vendorFiles.scripts.concat(appFiles.scripts))
        .pipe(plugins.concat('scripts.min.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(isProduction ? plugins.uglify() : gutil.noop())
        .pipe(plugins.size())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('serve', ['css', 'scripts', 'browser-sync'], function(){
    gulp.watch(appFiles.styles, ['css']).on('change', function(evt) {
        changeEvent(evt);
    });
    gulp.watch(appFiles.scripts, ['scripts']).on('change', function(evt) {
        changeEvent(evt);
    });
    gulp.watch(appFiles.pages).on('change', reload);
});

gulp.task('watch', ['css', 'scripts'], function(){
    gulp.watch(appFiles.styles, ['css']).on('change', function(evt) {
        changeEvent(evt);
    });
    gulp.watch(appFiles.scripts, ['scripts']).on('change', function(evt) {
        changeEvent(evt);
    });
    gulp.watch(appFiles.pages).on('change', reload);
});

gulp.task('default', ['css', 'scripts']);