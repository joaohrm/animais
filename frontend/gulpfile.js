var gulp = require('gulp');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var minifyHtml = require('gulp-minify-html');
var rev = require('gulp-rev');
var test = require('karma').Server;
var serve = require('gulp-webserver');

gulp.task('usemin', function () {
    return gulp.src('src/main/*.html')
        .pipe(usemin({
            html: [minifyHtml({empty: true, conditionals:true})],
            js: [uglify(), 'concat', rev()]
        }))
        .pipe(gulp.dest('src/dist'));
});

gulp.task('build', function () {
    gulp.run('usemin');
});

gulp.task('test', function (done) {
    new test({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
      }, function(err){
            console.log(err);
            if(err === 0){
                done();
            } else {
                done();
            }
        }).start();
  });
 
gulp.task('serve', function() {
    gulp.src('./')
    .pipe(serve({
        livereload: true,
        open: true,
        port: 3000
    }));
});