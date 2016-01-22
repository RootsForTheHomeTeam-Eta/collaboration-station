var rootsAppControllers = angular.module('rootsAppControllers', []);
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
  };
});


rootsAppControllers.controller('mainCtrl', function ($scope) {
  $scope.hello = 'hello!';
  console.log($scope.hello);
});


//controller for tabs

rootsAppControllers.controller('tabController', function ($scope){
  $scope.currentTab = null;
  //setting these functions as part of the scope makes the function available
  //to process in-line via ng-click
  //onTabClick sets the current tab to the id of the tab that was clicked
  $scope.onTabClick = function(id) {
    $scope.currentTab = id;
  };
  //isActive sets the currentTab to active so that
  //the appropriate class is assigned via ng-class
  //ng-show reads if the is-active function is true and
  //only shows when it is.
  $scope.isActive = function(id) {
    return $scope.currentTab === id;
  };
});