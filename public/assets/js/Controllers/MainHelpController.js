//controller that functions on all pages for help screen
rootsApp.controller('MainHelpController', ['$rootScope', '$scope', '$http', '$location', 'AuthService', '$log',
    function($rootScope, $scope, $http, $location, AuthService, $log) {
    $scope.loggedIn = " Sue ";

    // verify logged in status
    $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
        if (AuthService.isLoggedIn() === false) {
            $location.path('/login');
            $log.info('$routeChangeSuccess - MainHelpController');
        }
    });

    $scope.onIconCLick = function(){

        popupS.modal({
            content:'<div class="helpBody">' +
                '<h2 class="helpHeader">Need a reminder?</h2>'+
            '<p>The "Alerts" tab will show you what group has submitted their schedule form. Clear the alert by clicking the alert button.</p> ' +
            '<p>The "Quick Send" tab allows you to select Garden Groups to send specific quick alerts to. Select the recipient or recipients, the type of alert and submit.</p> ' +
            '<p>Add new events to the schedule by filling in the "Add Event" form. These events will be used to create the new form for the garden' +
            'groups to sign up through. <p>' +
            '<p>Create new users who can sign up for scheduled events through the "Add User" tab. Use their email as their username and create a simple password' +
            'that you can share with them. </p> ' +
            '<p>The lower section of the page contains a schedule view. Click the Orange bar with the venue for the event you would like to schedule. ' +
            'See users choices and click on the appropriate button for who you would like to schedule during the selected event. Only one group may be ' +
            'selected for each event time. Once you have chosen the groups for the events at a venue save the schedule. You can noe download, print and share' +
            ' the event schedule.</p> ' +
            '</div>'
        });

    };
    $scope.hello = 'hello!';
    console.log($scope.hello);

    $scope.logout = function() {
        $http
          .get('/api/auth/logout', $scope.user)
          .then(function (data, status, headers, config) {
              console.log('User logged out');
              //$window.sessionStorage.token = data.token;
          }, function (data, status, headers, config) {
              // Erase token if error
              //delete $window.sessionStorage.token;

              // Error message
              $scope.message = 'Error: Trouble logging out';
          });
    }
}]);
