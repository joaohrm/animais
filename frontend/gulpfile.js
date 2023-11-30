var gulp = require('gulp');
var sync = require("browser-sync").create();
var netlify = require('gulp-netlify');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var minifyHtml = require('gulp-minify-html');
var rev = require('gulp-rev');
var test = require('karma').Server;
var cp = require('child_process');
var serve = require('gulp-webserver');


/*gulp.task('usemin', function () {
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

  gulp.task('start', function () {
    cp.exec('http-server -c-1 -p 13000', err => err);
  });
    //exec('http-server -c-1 -p 13000');
 
gulp.task('serve', function() {
    gulp.src('./')	// <-- your app folder
    .pipe(serve({
        livereload: true,
        open: true,
        port: 13000	// set a port to avoid conflicts with other local apps
    }));
});  */

function browserSync(cb) {
    sync.init({
        server: {
            baseDir: "./"
        }
    });
}


gulp.task('deploy', function () {
  gulp.src('./')
    .pipe(netlify({
      site_id: "306dfefe-5ed3-463e-835a-64430fc70bb9",
      access_token: "nfp_BExswcnmEp721Fna19cFPdsoPkgyejxpf72b"
    }))
})

exports.sync = browserSync;