//controller to save admin created schedule in the database
rootsApp.controller('SaveController', ['$scope', '$http', function($scope, $http) {
    ////will save current schedule with ng-click saveSchedule()
    //$scope.schedule = {};
    //
    //$scope.saveNewSchedule = function () {
    //    console.log($scope.schedule.finalVenue);
    //    var schedule = {
    //        finalVenue: $scope.schedule.finalVenue,
    //        events: [{
    //            event: {
    //                finalEventDate: $scope.finalEventDate,
    //                finalArrivalTime: $scope.finalArrivalTime,
    //                finalEventTime: $scope.finalEventTime,
    //                finalOrgName: $scope.finalOrgName
    //            }
    //        }]
    //    };
    //    console.log('logging '+ $scope.schedule);
    //    console.log($scope.finalVenue);
    //
    //    $http({
    //        method: 'POST',
    //        url: '/saveSchedule',
    //        data: schedule
    //    }).then(function (schedule) {
    //        console.log(schedule);
    //    });
    //    //popupS.alert({
    //    //    content: 'Schedule Saved'
    //    //});
    //};
}]);
