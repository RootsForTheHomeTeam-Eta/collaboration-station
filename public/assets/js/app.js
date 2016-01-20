var app = angular.module('rootsApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: '/views/partials/index.html'
    }).when('/home', {
        templateUrl: '/views/partials/home.html'
    }).when('/login', {
        templateUrl: '/views/partials/login.html',
        controller: 'loginCtrl'
    });
}]);