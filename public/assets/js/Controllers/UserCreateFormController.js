//controller for creating new users on the database
rootsApp.controller("UserController", ['$scope', '$http', function($scope, $http) {
    $scope.user = {};
    $scope.submitUserForm = function () {
        //form data tied to model
        var user = {
            orgName: $scope.orgName,
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            username: $scope.username,
            password: $scope.password
        };
        $http({
            url: '/api/auth/register',
            method: 'post',
            data: user
        }).then(function () {

        });
        popupS.alert({
            content: 'User Registered, remember to send their password and that their email is their Username'
        });
    };
    //should have a popupS modal confirmation

}]);