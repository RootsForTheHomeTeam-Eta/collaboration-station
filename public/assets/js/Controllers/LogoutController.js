// logout controller for user and admin logout

rootsApp.controller('LogoutController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {

  $scope.logout = function () {

    console.log(AuthService.getUserStatus());

    // call logout from service
    AuthService.logout()
      .then(function () {
        $location.path('/login');
      });
  };
}]);
