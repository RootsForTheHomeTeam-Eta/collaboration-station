var app = angular.module('rootsApp', ['ngRoute', 'rootsAppControllers']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/admin', {
        templateUrl: 'views/partials/admin.html',
        controller: 'mainCtrl'
    }).when('/login', {
        templateUrl: 'views/partials/login.html',
        controller: 'loginCtrl'
    }).otherwise({
        redirectTo: 'home'
    });
}]);