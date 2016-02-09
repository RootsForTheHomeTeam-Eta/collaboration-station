//controller for creating new users on the database
rootsApp.controller("RegisterController", ['$scope', '$http', function($scope, $http) {
    // initialize user variable
    $scope.user = {};
    // function to register
    $scope.registerUser = function () {
        //form data tied to model
        var user = {
            orgName: $scope.orgName,
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            username: $scope.username,
            password: $scope.password
        };
        console.log('user: ',user);
        // send user to db
        $http({
            url: '/api/auth/register',
            method: 'post',
            data: user
        }).then(function () {
            popupS.alert({
                content: 'User Registered.'
            });
        });

    };



}]);