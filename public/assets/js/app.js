var rootsApp = angular.module('rootsApp', ['ngRoute']);

rootsApp.config(['$routeProvider', '$httpProvider', function($routeProvider){
    $routeProvider.when('/admin', {
        templateUrl: 'views/partials/admin.html',
        controller: 'AdminViewController'
    }).when('/login', {
        templateUrl: 'views/partials/login.html',
        controller: 'LoginController'
    }).when('/logout', {
        controller: 'LogoutController'
    }).when('/user', {
        templateUrl: 'views/partials/userView.html',
        controller: 'UserScheduleFormSubmitController'
    }).when('/scheduleView', {
        templateUrl: 'views/partials/scheduleView.html',
        controller: 'FinalScheduleViewController'
    }).otherwise({
        redirectTo: 'home'
    });


}]);



