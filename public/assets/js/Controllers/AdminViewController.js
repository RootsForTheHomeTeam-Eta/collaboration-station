//controller that functions on all pages for help screen
rootsApp.controller('AdminViewController', ['$rootScope', '$scope', '$http', '$location', 'AuthService', '$log',
  function($rootScope, $scope, $http, $location, AuthService, $log) {
  //$route.reload();
  // verify logged in status
  //$scope.$on('$routeChangeSuccess', function (event, next, current) {
  //  if (AuthService.isAdmin() === false) {
  //    // call logout from service
  //    AuthService.logout()
  //      .then(function () {
  //        $location.path('/login');
  //      });
  //  }
  //  $log.info('$routeChangeSuccess - AdminViewController');
  //  console.log('AdminViewController $routeChangeStart', AuthService.isAdmin());
  //});

}]);
