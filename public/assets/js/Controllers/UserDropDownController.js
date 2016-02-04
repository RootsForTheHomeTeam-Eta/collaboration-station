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

    $scope.users = UserRepoFactory.users;
    UserRepoFactory.getUsers();

}]);
