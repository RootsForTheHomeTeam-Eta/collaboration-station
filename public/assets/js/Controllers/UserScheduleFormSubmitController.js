//controller to submit user responses from schedule form
        rootsApp.controller('UserScheduleFormSubmitController', [ '$rootScope', '$scope','$http', 'VenueEventsFactory', '$log', 'AuthService', '$location',
          function ($rootScope, $scope, $http, VenueEventsFactory, $log, AuthService, $location) {


        // verify logged in status
        $scope.$on('$routeChangeSuccess', function (event, next, current) {
          if (AuthService.isLoggedIn() === false || AuthService.isAdmin() === true) {
            // call logout from service
            AuthService.logout()
              .then(function () {
                $location.path('/login');
              });
          }
          $log.info('$routeChangeSuccess - UserScheduleFormSubmitController');
        });

        $scope.venues = VenueEventsFactory.venues;
        VenueEventsFactory.getVenues();

        $scope.notification = {};
        $scope.notification.orgName = AuthService.user.orgName;
        $log.info($scope.notification);

        $scope.notificationSubmit = function() {
            $http({
                url: '/notification/submitNotification',
                method: 'post',
                data: $scope.notification
            }).then(function (res) {
                //$log.info(res.status);
                $log.info(res);
                //console.log(UserSchedule);
            });
        };

        //$scope.testy = new $scope.event("Twins", "07/05/2990", "true");
        $scope.submit = function () {
            var prefObj = {};
            var user = AuthService.user;
            prefObj.orgName = user.orgName;
            var UserSchedule = [];
            prefObj.events = UserSchedule;
            var venuesSubmit = $scope.venues.data;
            angular.forEach(venuesSubmit, function(value){
                var eventsArray = value.events;
                var venueId = value._id;
                angular.forEach(eventsArray, function(value) {
                    //console.log(value._id);
                    value.event.eventId = value._id;
                    //UserSchedule.push(value.event.eventId);
                    UserSchedule.push({ "venue_id": venueId,
                                        "event_id": value._id,
                                        "preference": value.event.preferences});
                });

            });
            $log.warn(prefObj);

            $http({
                 url: '/api/user/submit',
                 method: 'post',
                 data: prefObj
             }).then(function (res) {
                $log.info(res);
                $scope.notificationSubmit();
                popupS.alert({
                    content: 'Preferences saved'
                });

            });

        };

    }]);


