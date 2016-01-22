var app = angular.module('rootsApp', ['ngRoute', 'rootsAppControllers', 'rootsAppFactories', 'angular-jwt']);

app.config(['$routeProvider', '$httpProvider', 'jwtInterceptorProvider', function($routeProvider, $httpProvider, jwtInterceptorProvider){
    $routeProvider.when('/admin', {
        templateUrl: 'views/partials/admin.html',
        controller: 'mainCtrl'
    }).when('/login', {
        templateUrl: 'views/partials/login.html',
        controller: 'loginCtrl'
    }).when('/user', {
        templateUrl: 'views/partials/userView.html'
    }).otherwise({
        redirectTo: 'home'
    });

    jwtInterceptorProvider.tokenGetter = ['myService', function(myService) {
        myService.doSomething();
        return localStorage.getItem('id_token');
    }];

    $httpProvider.interceptors.push('authInterceptor');

}]);