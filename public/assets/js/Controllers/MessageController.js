//controller that sends individual messages from admin view - the email addresses used here should be
//populated by the userDropdownController/UserRepo Factory
rootsApp.controller('MessageController', ['$scope', '$http', 'UserRepoFactory',
    function ($scope, $http, UserRepoFactory) {



    $scope.sendMail = function () {
        console.log('I clicked');

        var data = {
            sendToemail : $scope.sendToemail, //This will become auto-populated
            sendToname : $scope.sendToname, //This will become auto-populated
            sendTomessage : $scope.sendTomessage
        };
        console.log('data for email message:',data);
        // Simple POST request example (passing data) :
        $http.post('/sendNotices', data).
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('email sent!');
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('email not sent!');
        });
        popupS.alert({
            content: 'Message sent'
        });
        //need to clear form on submit
    };
    //Send personal messages from the app
    //should have a popupS modal confirmation
    $scope.hello = 'hello from messagesendcontroller!';
    console.log($scope.hello);

    // For Dropdown:
    UserRepoFactory.getUsers().then(function() {
        $scope.dropUsers = UserRepoFactory.users;
        console.log('dropUsers inside',$scope.dropUsers);
    });
    //$scope.dropUsers = UserRepoFactory.users;
    console.log('dropUsers outside',$scope.dropUsers);
}]);
