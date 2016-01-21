var rootsAppControllers = angular.module('rootsAppControllers', [])
// login controller

rootsAppControllers.controller('loginCtrl', function ($scope, $http, $window) {
  //$scope.user = {username: req.body.username, password: req.body.password};
  //$scope.message = req.body.message;
  $scope.submit = function() {
    $http
      .post('/login', $scope.user)
      .then(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
      }, function (data, status, headers, config) {
        // Erase token if error
        delete $window.sessionStorage.token;

        // Error message
        $scope.message = 'Error: Invalid username or password';
    });
  }
});


rootsAppControllers.controller('mainCtrl', function ($scope) {
  $scope.hello = 'hello!';
  console.log($scope.hello);
});