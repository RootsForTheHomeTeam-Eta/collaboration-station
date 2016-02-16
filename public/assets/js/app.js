var rootsApp = angular.module('rootsApp', ['ngRoute']);

// app router
rootsApp.config(['$routeProvider', '$httpProvider', function($routeProvider){
    $routeProvider.when('/admin', {
        templateUrl: 'public/views/partials/admin.html',
        controller: 'AdminViewController'
    }).when('/login', {
        templateUrl: 'public/views/partials/login.html',
        controller: 'LoginController'
    }).when('/logout', {
        controller: 'LogoutController'
    }).when('/user', {
        templateUrl: 'public/views/partials/userView.html',
        controller: 'UserScheduleFormSubmitController'
    }).when('/tableview', {
        templateUrl: 'public/views/partials/tableview.html',
        controller: 'FinalScheduleViewController'
    }).otherwise({
        redirectTo: '/login'
    });
}]);



