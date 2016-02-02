//controller to send quick messages from admin panel
rootsApp.controller('NoticeSendController', ['$scope', '$http', function ($scope, $http) {
    //Send notices with button based on who is selected and what type of message
    //should have a popupS modal confirmation

    $scope.sendQuickMail = function () {
        console.log('I clicked');

        var data = ({
            gardenGroupAFC: this.gardenGroupAFC, //This will become auto-populated
            gardenGroupDWH: this.gardenGroupDWH, //This will become auto-populated
            gardenGroupURF: this.gardenGroupURF,
            gardenGroupYFF: this.gardenGroupYFF,
            gardenGroupYFH: this.gardenGroupYFH,
            gardenGroupYFL: this.gardenGroupYFL,
            gardenGroupYFP: this.gardenGroupYFP,
            gardenGroupYFW: this.gardenGroupYFW,
            signUp: this.signUp

        });

        // Simple POST request example (passing data) :
        $http.post('/sendQuickMail', data).
        success(function (data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
        }).
        error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        popupS.alert({
            content: 'Quick Notice Sent'
        });
        $scope.hello = 'hello from Notice send controller!';
        console.log($scope.hello);
    }

    }]);
