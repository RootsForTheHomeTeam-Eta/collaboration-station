// navigation controller
rootsApp.controller('NavController', ['$scope','$location', function($scope, $location) {
    // checks for partial
    $scope.isPartial = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };

}]);
