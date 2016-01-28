
//Controller to populate schedule creation bars on admin page
rootsApp.controller('ScheduleController',['$scope','$http', 'VenueEventsFactory', '$log', function($scope, $http, VenueEventsFactory, $log) {


    $scope.venues = VenueEventsFactory.venues;

    VenueEventsFactory.getVenues();

    console.log(VenueEventsFactory.venues);

    console.log($scope.venues);

}]);
