// login controller for user and admin sign-in

rootsApp.controller('LoginController', ['$scope', '$location', 'AuthService', '$log',
  function ($scope, $location, AuthService, $log) {
  // login function
  $scope.login = function () {
    // initial values
    $scope.error = false;
    $scope.disabled = true;

    // call login from service
    AuthService.login($scope.loginForm.username, $scope.loginForm.password)
      // handle success
      .then(function () {
        if (AuthService.isAdmin()) {
            // if admin, send to admin page
          $location.path('/admin');
        } else {
            // if user, send to user page
          $location.path('/user');
        }
          // reset validation
        $scope.disabled = false;
          // empty form
        $scope.loginForm = {};
      }, function () {
          // handle error
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
      });
  };
}]);

