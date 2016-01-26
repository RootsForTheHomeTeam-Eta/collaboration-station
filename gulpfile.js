/* File: gulpfile.js */

// grab gulp packages
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

// create a default task to log a message
gulp.task('default', ['nodemon']);

// create a jshint task to quickly check all current files
gulp.task('jshint', ['jshint-server', 'jshint-public', 'jshint-db', 'jshint-auth']);

// configure the jshint-server task
gulp.task('jshint-server', function() {
  return gulp.src('server/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-table-reporter')));
});

// configure the jshint-public task
gulp.task('jshint-public', function() {
  return gulp.src('public/assets/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-table-reporter')));
});

// configure the jshint-db task
gulp.task('jshint-db', function() {
  return gulp.src('db/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-table-reporter')));
});

// configure the jshint-auth task
gulp.task('jshint-auth', function() {
  return gulp.src('auth/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-table-reporter')));
});

// configure the nodemon task
gulp.task('nodemon', function() {
  nodemon({ script: './server/app.js',
            ext: 'html js',
            tasks: ['jshint'] })
    .on('restart', function () {
      console.log('Nodemon Restart!');
    });
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('server/**/*.js', ['jshint-server']);
  gulp.watch('public/assets/js/**/*.js', ['jshint-public']);
  gulp.watch('db/*.js', ['jshint-db']);
  gulp.watch('auth/**/*.js', ['jshint-auth']);
});