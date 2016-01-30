
//Controller to populate schedule creation bars on admin page
rootsApp.controller('ScheduleController',['$scope','$http', 'VenueEventsFactory', '$log', function($scope, $http, VenueEventsFactory, $log) {

    $scope.venues = VenueEventsFactory.venues;
    VenueEventsFactory.getVenues();

    //VenueEventsFactory.getVenues().then(function(result) {
    //    $scope.venues = result;
    //});

    //will save current schedule with ng-click saveSchedule()
    $scope.schedule = {};

    $scope.saveNewSchedule = function () {

        console.log($scope.schedule.finalVenue);
        var schedule = {
            finalVenue: $scope.schedule.finalVenue,
            events: [{
                event: {
                    finalEventDate: $scope.finalEventDate,
                    finalArrivalTime: $scope.finalArrivalTime,
                    finalEventTime: $scope.finalEventTime,
                    finalOrgName: $scope.finalOrgName
                }
            }]
        };

        $http({
            method: 'POST',
            url: '/saveSchedule',
            data: schedule
        }).then(function (schedule) {

        });
        //popupS.alert({
        //    content: 'Schedule Saved'
        //});
    };
}]);