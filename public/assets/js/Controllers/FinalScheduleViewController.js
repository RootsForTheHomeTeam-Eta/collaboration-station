rootsApp.controller('FinalScheduleViewController', ['$scope', '$http', function($scope, $http) {
    $scope.hello = 'hello from Final Schedule View controller!';
    console.log($scope.hello);

    var schedules = [];

    $http({
        method: 'GET',
        url: '/getSchedule'
    }).then(function(response) {
        schedules.data = response.data;

        //$scope.venueName = response.data.venueName;
        //$scope.eventDate = response.data[i].events[i].eventDate;
        //$scope.gameTime = response.data[i].events[i].gameTime;
        //$scope.arrivalTime = response.data[i].events[i].arrivalTime;
        //$scope.orgName = response.data[i].events[i].orgName;

    });

}]);
