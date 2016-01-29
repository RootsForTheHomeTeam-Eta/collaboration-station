//controller to submit user responses from schedule form
rootsApp.controller('UserScheduleFormSubmitController', [ '$scope','$http', 'VenueEventsFactory', '$log', function ($scope, $http, VenueEventsFactory , $log) {

    $scope.hello = 'hello from the UserGroupController!';
    $scope.venues = VenueEventsFactory.venues;
    VenueEventsFactory.getVenues();

    $log.info($scope.hello);
    //$http({
    //    url:'/user',
    //    method:'get'
    //}).then(function(res){
    //    $scope.venueEvents = res.data;
    //});


    $scope.submit = function () {
        var venue = $scope.venues.venue.venue;
        console.log(venue);
        $http({
            url: '/api/user/submit',
            method: 'post'
        }).then(function (res) {
            $log.info(res.status);
        });
    };
}]);
