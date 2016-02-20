// message controller
rootsApp.controller('MessageController', ['$scope', '$http', 'UserRepoFactory',
    function ($scope, $http, UserRepoFactory) {
    // function to send mail
    $scope.sendMail = function () {
        // set up data variable from form data
        var data = {
            sendToemail : $scope.sendToemail,
            sendToname : $scope.sendToname,
            sendTomessage : $scope.sendTomessage
        };
        // Simple POST request example (passing data) :
        $http.post('/sendNotices', data).
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        popupS.alert({
            content: 'Message sent'
        });
        //need to clear form on submit
        $scope.sendToemail = '';
        $scope.sendToname = '';
        $scope.sendTomessage = '';
    };
    //Send personal messages from the app
    //should have a popupS modal confirmation

    // For Dropdown:
    UserRepoFactory.getUsers().then(function() {
        $scope.dropUsers = UserRepoFactory.users;
    });
}]);
