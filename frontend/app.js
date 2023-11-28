var app = angular.module('app', ['ngRoute', 'restangular', 'ngFileUpload']);

app.config(config);

function config($routeProvider, $httpProvider, $locationProvider){

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider
    .when('/', {
        templateUrl: 'src/main/animais/animal.html',
        controller: 'animalController',
        controllerAs: 'vm',
        resolve: {
            
          }
    })
    .when('/admin', {
        templateUrl: 'src/main/admin/admin.html',
        controller: 'adminController',
        controllerAs: 'vm',
        resolve: {
            
          }
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

}