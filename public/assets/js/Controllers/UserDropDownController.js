//controller to auto-populate user emails on send forms
rootsApp.controller("UserDropDownController", ['$scope', 'UserRepoFactory', function($scope, UserRepoFactory) {
    //var onFetchError = function (message) {
    //    $scope.error = "Error Fetching Users. Message:" + message;
    //};
    //var onFetchCompleted = function (data) {
    //    $scope.users = data;
    //};
    //var getContactEmails = function () {
    //    UserRepoFactory.get().then(onFetchCompleted, onFetchError);
    //};
    //
    //getContactEmails();
    //$scope.dropUsers = {};
    UserRepoFactory.getUsers().then(function() {
        $scope.dropUsers = UserRepoFactory.users;
        console.log('dropUsers inside',$scope.dropUsers);
    });
    //$scope.dropUsers = UserRepoFactory.users;
    console.log('dropUsers outside',$scope.dropUsers);
}]);
