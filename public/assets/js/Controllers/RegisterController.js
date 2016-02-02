//controller for creating new users on the database
rootsApp.controller("RegisterController", ['$scope', '$http', function($scope, $http) {
    $scope.user = {};
    $scope.register = function () {
        //form data tied to model
        var user = {
            orgName: $scope.orgName,
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            username: $scope.username,
            password: $scope.password
        };
        console.log('user: ',user);
        $http({
            url: '/api/auth/register',
            method: 'post',
            data: user
        }).then(function () {

        });
        popupS.alert({
            content: 'User Registered.'
        });
    };
    //should have a popupS modal confirmation

}]);