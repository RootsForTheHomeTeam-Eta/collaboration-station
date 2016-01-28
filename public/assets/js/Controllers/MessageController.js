//controller that sends individual messages from admin view - the email addresses used here should be
//populated by the userDropdownController/UserRepo Factory
rootsApp.controller('MessageController', function ($scope) {
    //Send personal messages from the app
    //should have a popupS modal confirmation
    $scope.hello = 'hello!';
    console.log($scope.hello);

});