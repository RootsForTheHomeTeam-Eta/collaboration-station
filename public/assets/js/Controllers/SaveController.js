rootsApp.controller('SaveController', ['$scope', '$http', function($scope, $http) {
    //will save current schedule with ng-click saveSchedule()
    $scope.saveSchedule = function () {
        var schedule = {
            venue: $scope.venueName,
            events: [{
                event: {
                    eventDate: $scope.eventDate,
                    arrivalTime: $scope.arrivalTime,
                    eventTime: $scope.eventTime,
                    orgName: $scope.orgName
                }
            }]
        };
        $http({
            method: 'POST',
            url: '/schedule',
            data: schedule
        }).then(function () {

        });
    };
}]);
