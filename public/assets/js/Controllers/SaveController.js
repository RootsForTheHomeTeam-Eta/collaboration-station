//controller to save admin created schedule in the database
rootsApp.controller('SaveController', ['$scope', '$http', function($scope, $http) {
    //will save current schedule with ng-click saveSchedule()


    $scope.saveSchedule = function () {

        var schedule = {
            finalVenue: $scope.finalVenue,
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
            console.log('after post');
            console.log(schedule);
        });
        //popupS.alert({
        //    content: 'Schedule Saved'
        //});
    };
}]);
