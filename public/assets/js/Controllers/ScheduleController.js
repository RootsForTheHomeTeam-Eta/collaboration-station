//Controller to populate schedule creation bars on admin page
rootsApp.controller('ScheduleController',['$scope','$http', 'VenueEventsFactory', '$log', function($scope, $http, VenueEventsFactory, $log) {

    $scope.venues = VenueEventsFactory.venues;

    VenueEventsFactory.getVenues();

    //will save current schedule with ng-click saveSchedule()
    $scope.formData = {};


    $scope.submitAndSave = function () {


        //this was working below

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

    };

}]);

//this isn't working - error i is undefined

//$scope.venues = VenueEventsFactory.venues;
////will save current schedule with ng-click saveSchedule()
//
//$scope.formData = {};
//
//$scope.schedule = {};
//
//$scope.submitAndSave = function () {
//    var schedule = {
//        venueName: $scope.formData[i].venueName,
//        events: $scope.formData[i].events,
//        orgName: $scope.formData[i].events.orgName
//    };
//    $http({
//        url:'/saveSchedule',
//        method:'post',
//        data: schedule
//    }).then(function() {
//        popupS.alert({
//            content: 'Schedule Saved'
//        });
//    })
//};