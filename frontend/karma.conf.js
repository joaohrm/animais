module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/lodash/dist/lodash.js',
      'bower_components/ng-file-upload/ng-file-upload.js',
      'bower_components/restangular/dist/restangular.js',
      'app.js',
      'src/main/animais/*.js',
      'src/test/animais/*.js'
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['progress', 'dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
