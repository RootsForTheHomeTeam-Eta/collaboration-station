var rootsApp = angular.module('rootsApp', ['ngRoute']);

rootsApp.config(['$routeProvider', '$httpProvider', function($routeProvider){
    $routeProvider.when('/admin', {
        templateUrl: 'views/partials/admin.html',
        controller: 'MainController'
    }).when('/login', {
        templateUrl: 'views/partials/login.html',
        controller: 'LoginController'
    }).when('/user', {
        templateUrl: 'views/partials/userView.html'
    }).otherwise({
        redirectTo: 'home'
    });


}]);


//modal should be removed from partials if possible

