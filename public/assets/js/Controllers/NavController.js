//controller that with function to tell you what partial you are on
rootsApp.controller('NavController', ['$scope','$location', function($scope, $location) {
    $scope.isPartial = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };

}]);
