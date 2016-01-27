rootsApp.controller('UserGroupController', [ '$scope','$http', function ($scope, $http) {
    $scope.hello = 'hello from the UserGroupController!';


    console.log($scope.hello);
    $http({
        url:'/user',
        method:'get'
    }).then(function(response){
        $scope.venueEvents = response.data;
    });


    $scope.submit = function () {
        var venue = $scope.venue;
        console.log(venue);
        $http({
            url: '/user',
            method: 'post'
        }).then(function () {
            console.log(response.status);
        });
    };
}]);
