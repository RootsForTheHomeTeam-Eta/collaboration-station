var app = angular.module('rootsApp', ['ngRoute', 'rootsAppControllers']);

app.config(['$routeProvider', '$httpProvider', function($routeProvider){
    $routeProvider.when('/admin', {
        templateUrl: 'views/partials/admin.html',
        controller: 'mainCtrl'
    }).when('/login', {
        templateUrl: 'views/partials/login.html',
        controller: 'loginCtrl'
    }).when('/user', {
        templateUrl: 'views/partials/userView.html'
    }).when('/modal', {
        templateUrl: 'views/partials/scheduleModal.html'
    }).otherwise({
        redirectTo: 'home'
    });


}]);


//modal should be removed from partials if possible

