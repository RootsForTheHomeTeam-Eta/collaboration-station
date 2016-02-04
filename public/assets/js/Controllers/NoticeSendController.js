//controller to send quick messages from admin panel
rootsApp.controller('NoticeSendController', ['$scope', '$http', 'UserRepoFactory', '$log',
    function ($scope, $http, UserRepoFactory, $log) {
    //Send notices with button based on who is selected and what type of message
    //should have a popupS modal confirmation

    // Pull in
    //    var onFetchError = function (message) {
    //        $scope.error = "Error Fetching Users. Message:" + message;
    //    };
    //    var onFetchCompleted = function (data) {
    //        $scope.users = data;
    //    };
    //    var getUsers = function () {
    //        //UserRepoFactory.get().then(onFetchCompleted, onFetchError);
    //        return UserRepoFactory.get;
    //    };
        $scope.users = UserRepoFactory.users;
        UserRepoFactory.getUsers();

        $scope.quickSendForm = {};

    $log.warn($scope.users);
    $scope.sendQuickMail = function (users, message) {
        console.log('I clicked');
        $log.warn('NoticeSendController users',users);
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
        }
        $log.warn('emailData: ',emailData);
        $log.warn('recipients: ', recipients);
        $log.warn('$scope.quickSendForm: ',$scope.quickSendForm);
        //var data = ({
        //    gardenGroupAFC: this.gardenGroupAFC, //This will become auto-populated
        //    gardenGroupDWH: this.gardenGroupDWH, //This will become auto-populated
        //    gardenGroupURF: this.gardenGroupURF,
        //    gardenGroupYFF: this.gardenGroupYFF,
        //    gardenGroupYFH: this.gardenGroupYFH,
        //    gardenGroupYFL: this.gardenGroupYFL,
        //    gardenGroupYFP: this.gardenGroupYFP,
        //    gardenGroupYFW: this.gardenGroupYFW,
        //    signUp: this.signUp
        //
        //});

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

            console.log('whoosh');
        }).
        error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $log.error(data, status, headers, config);
        });
        popupS.alert({
            content: 'Quick Notice Sent'
        });
        $scope.hello = 'hello from Notice send controller!';
        console.log($scope.hello);
    }

    }]);
