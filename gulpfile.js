// grab gulp packages
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');

// create a default task to log a message
gulp.task('default', ['nodemon', 'watch-build']);

// create a jshint task to quickly check all current files
gulp.task('jshint', ['jshint-routes', 'jshint-public', 'jshint-db', 'jshint-auth']);

// configure the jshint-server task
gulp.task('jshint-routes', function() {
  return gulp.src('server/routes/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-table-reporter')));
});

// configure the jshint-public task
gulp.task('jshint-public', function() {
  return gulp.src('server/public/assets/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-table-reporter')));
});

// configure the jshint-db task
gulp.task('jshint-db', function() {
  return gulp.src('server/db/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-table-reporter')));
});

// configure the jshint-auth task
gulp.task('jshint-auth', function() {
  return gulp.src('server/auth/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-table-reporter')));
});

// concat all controllers into one controller file
gulp.task('ctrl-build', function() {
    return gulp.src('server/public/assets/js/Controllers/*.js')
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest('public/assets/js'));
});

// concat all factories into one factory file
gulp.task('fact-build', function() {
    return gulp.src('server/public/assets/js/Factories/*.js')
        .pipe(concat('factories.js'))
        .pipe(gulp.dest('public/assets/js'));
});

// call fact-build and ctrl-build tasks
gulp.task('buildDeps', ['ctrl-build','fact-build']);

// configure the nodemon task
gulp.task('nodemon', function() {
  nodemon({ script: './server/app.js',
            ext: 'html js',
            tasks: [''],
            ignore: ['server/public/assets/js/controllers.js',
                     'server/public/assets/js/factories.js']})
    .on('restart', function () {
      console.log('Nodemon Restart!');
    });
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch-jshint', function() {
  gulp.watch('server/**/*.js', ['jshint-routes']);
  gulp.watch('server/public/assets/js/**/*.js', ['jshint-public']);
  gulp.watch('server/db/*.js', ['jshint-db']);
  gulp.watch('server/auth/**/*.js', ['jshint-auth']);
});

// configure which files to watch for builds
gulp.task('watch-build', function() {
    gulp.watch('server/public/assets/js/Controllers/*.js', ['ctrl-build']);
    gulp.watch('server/public/assets/js/Factories/*.js', ['fact-build']);
});