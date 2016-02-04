//controller that sends individual messages from admin view - the email addresses used here should be
//populated by the userDropdownController/UserRepo Factory
rootsApp.controller('MessageController', ['$scope', '$http', function ($scope, $http) {



    $scope.sendMail = function () {
        console.log('I clicked');

        var data = ({
            sendToemail : this.sendToemail, //This will become auto-populated
            sendToname : this.sendToname, //This will become auto-populated
            sendTomessage : this.sendTomessage
        });

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
    };
    //Send personal messages from the app
    //should have a popupS modal confirmation
    $scope.hello = 'hello from messagesendcontroller!';
    console.log($scope.hello);
}]);
