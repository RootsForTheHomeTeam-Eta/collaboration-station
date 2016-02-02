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
        $log.info($scope.hello);
        //$scope.accounts=[{name:"123"},{name:"124"},{name:"125"}]
        //
        //angular.forEach($scope.accounts,function(value,index){
        //    alert(value.name);
        //})
//need to set property values, but I have an array of objects
//submitting each venue sepearatly would make things simplier
//    OBJECT Contructor maybe
//    function person(first, last, age, eye) {
//        this.firstName = first;
//        this.lastName = last;
//        this.age = age;
//        this.eyeColor = eye;
//    }
//    var myFather = new person("John", "Doe", 50, "blue");
//    var myMother = new person("Sally", "Rally", 48, "green");
        $scope.event = function(name, date , pref ){
            this.venueName = name;
            this.eventDate = date;
            this.preferences = pref;
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

            //var UserSchedule = [];
            //var venuesSubmit = $scope.venues.data;
            //angular.forEach(venuesSubmit, function(value){
            //    var eventsArray = value.events;
            //
            //    angular.forEach(eventsArray, function(value) {
            //        //console.log(value._id);
            //        value.event.eventId = value._id;
            //        //UserSchedule.push(value.event.eventId);
            //        UserSchedule.push(value.event);
            //    });
            //
            //});

             $http({
                 url: '/api/user/submit',
                 method: 'post',
                 data: prefObj
             }).then(function (res) {
                 //$log.info(res.status);
                 $log.info(res);
               //console.log(UserSchedule);
            });

        };

    }]);
    rootsApp.controller('PostCtrl',[ 'messages', function (messages){
        var self = this;
        self.newMessage = 'Hello World!';
        self.addMessage = function(message){
            messages.add(message);
            self.newMessage = '';
        };
    }]);