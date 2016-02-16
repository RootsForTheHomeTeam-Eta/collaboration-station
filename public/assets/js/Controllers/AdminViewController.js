//controller for whole admin view
rootsApp.controller('AdminViewController', ['$window','$scope', '$http', '$location', 'AuthService', '$log',
  function($window,$scope, $http, $location, AuthService, $log) {

  // verify logged in status
  $scope.$on('$routeChangeSuccess', function (event, next, current) {
    if (AuthService.isAdmin() === false) {
      // call logout from service
      AuthService.logout()
        .then(function () {
          //$location.path('/login');
          $window.location = '/#/login';
        });
    }
  });

}]);
