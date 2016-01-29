//controller to submit user responses from schedule form
rootsApp.controller('UserScheduleFormSubmitController', [ '$scope','$http', 'VenueEventsFactory', '$log', function ($scope, $http, VenueEventsFactory , $log) {

    $scope.hello = 'hello from the UserGroupController!';
    VenueEventsFactory.getVenues().then(function(result){
        $scope.venues = result;

        var venue = $scope.venues;
        console.log("$scope.venues: ",$scope.venues);

        $scope.submit = function () {
            console.log(venue);
            $http({
                url: '/api/user/submit',
                method: 'post'
            }).then(function (res) {
                $log.info(res.status);
            });
        };
    });
    //$scope.venues = VenueEventsFactory.getVenues();

    $log.info($scope.hello);
    //$http({
    //    url:'/user',
    //    method:'get'
    //}).then(function(res){
    //    $scope.venueEvents = res.data;
    //});

}]);
