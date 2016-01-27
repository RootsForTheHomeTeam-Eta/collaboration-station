rootsApp.controller('UserGroupController', [ '$scope','$http', '$log', function ($scope, $http, $log) {
    $scope.hello = 'hello from the UserGroupController!';


    $log.info($scope.hello);
    //$http({
    //    url:'/user',
    //    method:'get'
    //}).then(function(res){
    //    $scope.venueEvents = res.data;
    //});


    $scope.submit = function () {
        var venue = $scope.venue;
        console.log(venue);
        $http({
            url: '/api/user/submit',
            method: 'post'
        }).then(function (res) {
            $log.info(res.status);
        });
    };
}]);
