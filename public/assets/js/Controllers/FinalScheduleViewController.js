rootsApp.controller('FinalScheduleViewController', ['$scope', '$http', function($scope, $http) {
    $scope.hello = 'hello from Final Schedule View controller!';
    console.log($scope.hello);

    $http({
        method: 'GET',
        url: '/getSchedule'
    }).then(function(docs) {
        //$scope.schedule = {};
        $scope.schedule = docs;
        console.log($scope.schedule);

    });
}]);
