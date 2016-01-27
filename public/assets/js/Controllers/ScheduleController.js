rootsApp.controller('ScheduleController',['$scope','$http', 'VenueEventsFactory', function($scope, $http, VenueEventsFactory) {
    VenueEventsFactory.getVenues().success(function(data){
        $scope.venues=data;
    });
}]);
