// Controller for final schedule view
rootsApp.controller('FinalScheduleViewController', ['$scope', '$http', function($scope, $http) {
    // returns schedule document from db
    $http({
        method: 'GET',
        url: '/getSchedule'
    }).then(function(docs) {
        //$scope.schedule = {};
        $scope.schedule = docs;
        console.log($scope.schedule);

    });
}]);
