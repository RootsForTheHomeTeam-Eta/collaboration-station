// logout controller for user and admin logout

rootsApp.controller('LogoutController', ['$window', '$scope', '$location', 'AuthService',
    function ($window, $scope, $location, AuthService) {
  // logout function
  $scope.logout = function () {
      // remove user name from header
      $scope.$parent.user = '';
    // call logout from service
    AuthService.logout()
      .then(function () {
        //redirect to login page
        //$location.path('/login');
          $window.location = '/#/login';

      });
  };
}]);
