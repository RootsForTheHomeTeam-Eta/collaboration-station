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
        });
        // initialize venues variable
        $scope.venues = VenueEventsFactory.venues;
        VenueEventsFactory.getVenues();
        // initialize notification variable
        $scope.notification = {};
        $scope.notification.orgName = AuthService.user.orgName;
        // initialize orgName variable
        $scope.orgName = AuthService.user.orgName;

        //this function loops through the org array and checks to see if any of the objects have a matching orgName
        $scope.verify = function(orgArray){
            //initialize verifyOrg variable
            var verifyOrg = [];
              angular.forEach(orgArray, function(value){
                  if ( $scope.orgName == value.orgName){
                        verifyOrg.push(value.orgName)
                  }
              });
            if (verifyOrg.length == 0){
                return true;
            } else {
                return false;
            }
        };
        // function to reset scope variables
        $scope.reset = function(venueId, eventId, orgArray){
            var venueId = venueId;
            var eventId = eventId;
            var orgArray = orgArray;
            var resetObj = {};

            resetObj.venue_id = venueId;
            resetObj.event_id = eventId;

            if(orgArray.length === 0){
              console.log('nothing in org array');
            }else if(orgArray.length > 0){
              angular.forEach(orgArray, function(value){
                  if ( $scope.orgName == value.orgName){
                      resetObj.pref_id = value._id;
                      console.log(resetObj);
                  }
              });
            }
            // resets info on db
            $http({
                url: '/api/user/reset' ,
                method: 'put',
                data: resetObj
            }).then(function () {
                // upon successful call to db, repopulate venue object
                VenueEventsFactory.getVenues();
            });
        };

        //this function add a notification to the notifications collection on pref submit
        $scope.notificationSubmit = function() {
            $http({
                url: '/notification/submitNotification',
                method: 'post',
                data: $scope.notification
            }).then(function (res) {
                // uncomment for debugging
                //$log.info(res);
            });
        };
        // this function submits preferences for the user
        $scope.submit = function (venueId, eventId,pref) {

            var venueId = venueId;
            var eventId = eventId;
            var pref = pref;

            var prefObj = {};
            var user = AuthService.user;

            prefObj.orgName = user.orgName;
            prefObj.venue_id = venueId;
            prefObj.event_id = eventId;
            prefObj.preference = pref;

            $http({
                 url: '/api/user/submit',
                 method: 'post',
                 data: prefObj
             }).then(function () {
                VenueEventsFactory.getVenues();
                $scope.notificationSubmit();
                popupS.alert({
                    content: 'Your preferences have been submitted'
                });
            });

        };

    }]);


