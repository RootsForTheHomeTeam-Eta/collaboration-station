// logout controller for user and admin logout

rootsApp.controller('LogoutController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
  // logout function
  $scope.logout = function () {
    // call logout from service
    AuthService.logout()
      .then(function () {
        //redirect to login page
        $location.path('/login');
      });
  };
}]);
