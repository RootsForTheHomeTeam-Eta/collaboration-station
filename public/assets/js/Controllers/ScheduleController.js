rootsApp.controller('ScheduleController',['$scope','$http', 'VenueEventsFactory', 'SharedVenues', '$log', function($scope, $http, VenueEventsFactory, SharedVenues, $log) {
    VenueEventsFactory.getVenues();
    $scope.venues = SharedVenues.getVenues();
    $log.info($scope.venues);
}]);
