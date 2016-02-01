//controller to submit user responses from schedule form
rootsApp.controller('UserScheduleFormSubmitController', [ '$rootScope', '$scope','$http', 'VenueEventsFactory', '$log', 'AuthService', '$location',
    function ($rootScope, $scope, $http, VenueEventsFactory, $log, AuthService, $location) {


    // verify logged in status
    $scope.$on('$routeChangeSuccess', function (event, next, current) {
        if (AuthService.isLoggedIn() === false) {
            $location.path('/login');
        }
        $log.info('$routeChangeSuccess - UserScheduleFormSubmitController');
    });

    $scope.hello = 'hello from the UserScheduleFormSubmitController!';
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
