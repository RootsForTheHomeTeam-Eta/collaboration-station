//controller to send quick messages from admin panel
rootsApp.controller('NoticeSendController', ['$scope', '$http', 'UserRepoFactory', '$log',
    function ($scope, $http, UserRepoFactory, $log) {
    //Send notices with button based on who is selected and what type of message
    //should have a popupS modal confirmation
        // get users from factory
        $scope.noticeUsers = UserRepoFactory.users;
        UserRepoFactory.getUsers();

    $log.warn($scope.users);
    $scope.sendQuickMail = function (users, message) {
        // array of recipient emails to send to
        var recipients = [];
        // check if user was checked
        users.forEach(function(elem) {
            if (elem.checked === true) {
                recipients.push(elem.username);
            }
        });
        // data object to pass to email route
        var emailData = {
            recipients: recipients,
            message: message
        };

        // Simple POST request example (passing data) :
        $http({
            url: '/api/sendQuickMail',
            method: 'post',
            data: emailData
        }).
        //$http.post('/api/sendQuickMail').
        success(function (data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
        }).
        error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            // log data on error
            $log.error(data, status, headers, config);
        });
        popupS.alert({
            content: 'Quick Notice Sent'
        });
        popupS.alert({
            content: 'Message Sent!'
        });
    }

    }]);
