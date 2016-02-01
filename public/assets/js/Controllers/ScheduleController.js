//Controller to populate schedule creation bars on admin page
rootsApp.controller('ScheduleController',['$scope','$http', 'VenueEventsFactory', '$log', function($scope, $http, VenueEventsFactory, $log) {

    $scope.venues = VenueEventsFactory.venues;

    VenueEventsFactory.getVenues();

    //this object is filled by the scope setting we did in the html so that we could deal with the
    //loops easier
    $scope.formData = {};


    $scope.submitAndSave = function () {
        $http({
            url: '/saveSchedule',
            method: 'post',
            data: $scope.formData
        }).then(function (res) {
            popupS.alert({
                content: 'Schedule Saved'
            });
            $log.info(res.status);
        });
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

//this was working below

//var $schedules = [];
//
//for (i in $scope.formData) {
//
//    var $schedule = {
//        venueName: $scope.formData[i].venueName,
//        events: $scope.formData[i].events,
//    };
//    $schedules.push($schedule);
//}
//console.log($schedules);
//console.log("save button clicked");
//
//};