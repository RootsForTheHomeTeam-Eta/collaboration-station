// login controller for user and admin sign-in

rootsApp.controller('LoginController', ['$scope', '$location', 'AuthService', '$log',
  function ($scope, $location, AuthService, $log) {

  // log user status
  console.log(AuthService.getUserStatus());

  $scope.login = function () {
    // initial values
    $scope.error = false;
    $scope.disabled = true;

    // call login from service
    AuthService.login($scope.loginForm.username, $scope.loginForm.password)
      // handle success
      .then(function () {
        if (AuthService.isAdmin()) {
          $location.path('/admin');
        } else {
          $location.path('/user');
        }
        $scope.disabled = false;
        $scope.loginForm = {};
      })
      // handle error
      .catch(function () {
        $scope.error = true;
        $scope.errorMessage = "Invalid username and/or password";
        $scope.disabled = false;
        $scope.loginForm = {};
      });
  };
}]);

