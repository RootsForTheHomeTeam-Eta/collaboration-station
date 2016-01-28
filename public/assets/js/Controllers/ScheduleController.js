rootsApp.controller('ScheduleController',['$scope','$http', 'VenueEventsFactory', '$log', function($scope, $http, VenueEventsFactory, $log) {
    VenueEventsFactory.getVenues()
      .success(function(venues){
          //$scope.$apply(function() {
              $scope.venues = venues;
          //})
      })
      .error(function(data, status, headers, config) {
          $log.warn(data, status, headers(), config);
      });
}]);
