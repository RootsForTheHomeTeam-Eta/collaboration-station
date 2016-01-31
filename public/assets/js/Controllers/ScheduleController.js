//Controller to populate schedule creation bars on admin page
rootsApp.controller('ScheduleController',['$scope','$http', 'VenueEventsFactory', '$log', function($scope, $http, VenueEventsFactory, $log) {

    $scope.venues = VenueEventsFactory.venues;

    VenueEventsFactory.getVenues();

    //VenueEventsFactory.getVenues().then(function(result) {
    //    $scope.venues = result;
    //});

    //will save current schedule with ng-click saveSchedule()
    $scope.formData = {};


    //var schedule = {
    //    finalVenue: $scope.formData[i].venueName,
    //    events: [{
    //        event: {
    //            finalEventDate: $scope.formData[i].events[n].eventDate,
    //            finalArrivalTime: $scope.formData[i].events[n].arrivalTime,
    //            finalEventTime: $scope.formData[i].events[n].gameTime,
    //            finalOrgName: $scope.formData[i].events[n].orgName
    //        }
    //    }]
    //};

    $scope.submitAndSave = function () {

        var $schedules = [];

        for (i in $scope.formData) {

            var $schedule = {
                venueName: $scope.formData[i].venueName,
                events: $scope.formData[i].events
            };
            $schedules.push($schedule);
        }
        console.log($schedules);
        console.log("save button clicked");

    //    $http({
    //        url: '/api/user/submit',
    //        method: 'post',
    //        data: $schedules;
    //}).then(function (res) {
    //        $log.info(res.status);
    //    });

    };

}]);