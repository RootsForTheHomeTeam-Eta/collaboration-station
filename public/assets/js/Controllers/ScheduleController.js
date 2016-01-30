
//Controller to populate schedule creation bars on admin page
rootsApp.controller('ScheduleController',['$scope','$http', 'VenueEventsFactory', '$log', function($scope, $http, VenueEventsFactory, $log) {

    $scope.venues = VenueEventsFactory.venues;

    VenueEventsFactory.getVenues();

    //will save current schedule with ng-click saveSchedule()
    $scope.formData = {};

    $scope.submitAndSave = function () {
        console.log($scope.formData);

    //    var schedule ={
    //        finalVenue: ,
    //            events: [{
    //                event: {
    //                    finalEventDate: ,
    //                    finalArrivalTime: $scope.finalArrivalTime,
    //                    finalEventTime: $scope.finalEventTime,
    //                    finalOrgName: $scope.finalOrgName
    //                    }
    //                }]
    //
    //    };
    //     $http({
    //         url: '/saveSchedule',
    //         method: 'post'
    //     }).then(function (res) {
    //     $log.info(res.status);
    //    });
    //};


    };
}]);