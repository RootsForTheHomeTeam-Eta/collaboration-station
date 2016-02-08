//controller that functions on all pages for help screen
rootsApp.controller('AdminViewController', ['$rootScope', '$scope', '$http', '$location', 'AuthService', '$log',
  function($rootScope, $scope, $http, $location, AuthService, $log) {
  //$route.reload();
  // verify logged in status
  $scope.$on('$routeChangeSuccess', function (event, next, current) {
    if (AuthService.isAdmin() === false) {
      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });
    }
    $log.info('$routeChangeSuccess - AdminViewController');
    console.log('AdminViewController $routeChangeStart', AuthService.isAdmin());
  });

}]);

//controller that adds events from admin page under add event tab
rootsApp.controller("FormEventController", ['$scope', '$http', 'VenueEventsFactory', function($scope, $http, VenueEventsFactory) {
    $scope.event = {};
  //form data tied to model where possible
    $scope.submitEventForm = function () {
      var event = {
        venueName: $scope.venueName,
        eventDate: $scope.eventDate,
        arrivalTime: $scope.arrivalTime,
        gameTime: $scope.gameTime,
        submitBy: $scope.submitBy
      };
      $http({
        url: '/api/event/addEvent',
        method: 'post',
        data: event
      }).then(function () {
        VenueEventsFactory.getVenues();
        popupS.alert({
          content: 'Event Added'
        });
      });
      //$http({
      //  url: '/api/event/getEvents',
      //  method: 'get'
      //});

    };
  //should have a popupS modal confirmation

}]);
// login controller for user and admin sign-in

rootsApp.controller('LoginController', ['$scope', '$location', 'AuthService', '$log',
  function ($scope, $location, AuthService, $log) {

  // log user status
  console.log(AuthService.getUserStatus());

  $scope.login = function () {
    // initial values
    $scope.error = false;
    $scope.disabled = true;

    // call login from service
    AuthService.login($scope.loginForm.username, $scope.loginForm.password)
      // handle success
      .then(function () {
        if (AuthService.isAdmin()) {
          $location.path('/admin');
        } else {
          $location.path('/user');
        }
        $scope.disabled = false;
        $scope.loginForm = {};
      })
      // handle error
      .catch(function () {
        $scope.error = true;
        $scope.errorMessage = "Invalid username and/or password";
        $scope.disabled = false;
        $scope.loginForm = {};
      });
  };
}]);


// logout controller for user and admin logout

rootsApp.controller('LogoutController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {

  $scope.logout = function () {

    console.log(AuthService.getUserStatus());

    // call logout from service
    AuthService.logout()
      .then(function () {
        $location.path('/login');
      });
  };
}]);

//controller that functions on all pages for help screen
rootsApp.controller('MainHelpController', ['$rootScope', '$scope', '$http', '$location', 'AuthService', '$log',
    function($rootScope, $scope, $http, $location, AuthService, $log) {

    // verify logged in status
    $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
        if (AuthService.isLoggedIn() === false) {
            $location.path('/login');
            $log.info('$routeChangeSuccess - MainHelpController');
        }
    });

    $scope.onIconCLick = function(){
        popupS.modal({
            content:'<div><h2>' +
            '<p>The Alerts tab will show you what group has submitted their schedule form Clear the alert by clicking the alert button.</p> ' +
            '<p>The Quick Send tab allows you to select Garden Groups to send specific quick alerts to Select the recipient or recipients, the type of alert and submit.</p> ' +
            '<p>Add new events to the schedule by filling in the "Add Event" form. These events will be used to create the new form for the garden' +
            'groups to sign up through. <p>' +
            '<p>Create new users who can sign up for scheduled events through the Add User tab. Use their email as their username and create a simple password' +
            'that you can share with them. </p> ' +
            '<p>The lower section of the page contains a schedule view. See users choices and click on the appropriate button for who you would like ' +
            'to schedule during each event. Once you have chosen the groups for the events at a venue you can download, save and print' +
            ' the event schedule.</p> ' +
            '</h2></div>'
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

//controller that populates admin created schedule after groups are chosen for specific time slots
rootsApp.controller('ModalController', ['$scope', '$http', function($scope, $http) {
    $scope.generateSchedule= function(){
        $http({
            method: 'GET',
            url: '/api/event/getEvents'
            //all info from venues is available via this request
        }).then(function(res){
            //$scope.venueName = res.data.venueName;
            //$scope.eventDate = res.data.events.eventDate;
            //$scope.arrivalTime = res.data.arrivalTime;
            //$scope.eventTime= res.data.gameTime;
            $scope.test= 'Twins Stadium';
            //console.log($scope.test);
            //****************\\
            console.log($scope.test);
            console.log('I clicked');
            //var test = $scope.test;

            //pull event data from the database to set variables for schedule creation

            popupS.modal({
                content: '<div ng-controller="ModalController">' +
                '<div  class = "venueContainer"> ' +
                '<div class="modalWidth"> ' +
                '<div class = "modalHeader orange row container-fluid">'+ $scope.test +'</div>' +
                '<div class = "venueHeader yellow row container-fluid"> ' +
                '<div class = "col-md-1 modalTitle">Date:</div> ' +
                '<div class = "col-md-1"></div> ' +
                '<div class = "col-md-2 modalTitle">Arrival Time:</div> ' +
                '<div class = "col-md-2"></div> ' +
                '<div class = "col-md-2 modalTitle">Event Time:</div> ' +
                '<div class = "col-md-1"></div> ' +
                '<div class = "col-md-2 modalTitle">Group</div> ' +
                '</div> <div class = "venueOptions row container-fluid"> ' +
                '<div class = "col-md-1 scheduleLabel">Sat, 03/22</div> ' +
                '<div class = "col-md-1"></div> ' +
                '<div class = "col-md-2 scheduleLabel">10:00 AM</div> ' +
                '<div class = "col-md-2"></div> ' +
                '<div class = "col-md-2 scheduleLabel">1:00 PM</div> ' +
                '<div class = "col-md-1"></div> ' +
                '<div class = "col-md-2"><button type="button" class="modalButton green">URG</button></div> </div> ' +
                '<div class = "venueOptions row container-fluid"> ' +
                '<div class = "col-md-1 scheduleLabel">Sun, 03/23</div> ' +
                '<div class = "col-md-1"></div> ' +
                '<div class = "col-md-2 scheduleLabel">12:00 AM</div> ' +
                '<div class = "col-md-2"></div> ' +
                '<div class = "col-md-2 scheduleLabel">3:00 PM</div> ' +
                '<div class = "col-md-1"></div> ' +
                '<div class = "col-md-2"><button type="button" class="modalButton green">YFH</button></div> ' +
                '</div> </div> </div> </div>'

            });

        });
    };
    //will clear schedules with ng-click="clearSchedule()" will ask for
    //confirmation
    $scope.hello = 'hello!';
    console.log($scope.hello);
}]);

//controller that with function to tell you what partial you are on
//currently unsed
rootsApp.controller('NavController', ['$scope','$location', function($scope, $location) {
    $scope.isPartial = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };

}]);

//controller to populate alerts based on user form submission
rootsApp.controller('NoticeAlertController', function ($scope) {
    //alert should appear when activity is made on
    //form submission
    $scope.hello = 'hello!';
    console.log($scope.hello);

});

//controller to send quick messages from admin panel
rootsApp.controller('NoticeSendController', function ($scope) {
    //Send notices with button based on who is selected and what type of message
    //should have a popupS modal confirmation
    $scope.hello = 'hello!';
    console.log($scope.hello);

});

//controller to search database and find most recent admin saved schedule
rootsApp.controller('PrevController', ['$scope', '$http', function($scope, $http) {
    //will view previous schedule with ng-click viewPreviousSchedule()
    $scope.viewPreviousSchedule= function() {


        $scope.hello = 'hello!';
        console.log($scope.hello);
    };
}]);

//controller for creating new users on the database
rootsApp.controller("RegisterController", ['$scope', '$http', function($scope, $http) {
    $scope.user = {};
    $scope.register = function () {
        //form data tied to model
        var user = {
            orgName: $scope.orgName,
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            username: $scope.username,
            password: $scope.password
        };
        console.log('user: ',user);
        $http({
            url: '/api/auth/register',
            method: 'post',
            data: user
        }).then(function () {

        });
        popupS.alert({
            content: 'User Registered, remember to send their password and that their email is their Username'
        });
    };
    //should have a popupS modal confirmation

}]);
//controller to save admin created schedule in the database
rootsApp.controller('SaveController', ['$scope', '$http', function($scope, $http) {
    //will save current schedule with ng-click saveSchedule()

    var schedule = {
        finalVenue: $scope.finalVenueName,
        events: [{
            event: {
                finalEventDate: $scope.finalEventDate,
                finalArrivalTime: $scope.finalArrivalTime,
                finalEventTime: $scope.finalEventTime,
                finalOrgName: $scope.finalOrgName
            }
        }]
    };

    $scope.saveSchedule = function () {


        $http({
            method: 'POST',
            url: '/saveSchedule',
            data: schedule
        }).then(function (schedule) {
            console.log('after post');
            console.log(schedule);
        });
        //popupS.alert({
        //    content: 'Schedule Saved'
        //});
    };
}]);


//Controller to populate schedule creation bars on admin page
rootsApp.controller('ScheduleController',['$scope','$http', 'VenueEventsFactory', '$log', function($scope, $http, VenueEventsFactory, $log) {


    //$scope.venues = VenueEventsFactory.venues;
    VenueEventsFactory.getVenues().then(function(result) {
        $scope.venues = result;
    });

}]);
//controller for tabs

rootsApp.controller('TabController', function ($scope){
    $scope.currentTab = null;
    //setting these functions as part of the scope makes the function available
    //to process in-line via ng-click
    //onTabClick sets the current tab to the id of the tab that was clicked
    $scope.onTabClick = function(id) {
        $scope.currentTab = id;
    };
    //isActive sets the currentTab to active so that
    //the appropriate class is assigned via ng-class
    //ng-show reads if the is-active function is true and
    //only shows when it is.
    $scope.isActive = function(id) {
        return $scope.currentTab === id;
    };
});

//controller to auto-populate user emails on send forms
rootsApp.controller("UserDropController", ['$scope', 'UserRepoFactory', function($scope, UserRepoFactory) {
    var onFetchError = function (message) {
        $scope.error = "Error Fetching Users. Message:" + message;
    };
    var onFetchCompleted = function (data) {
        $scope.users = data;
    };
    var getContactEmails = function () {
        UserRepoFactory.get().then(onFetchCompleted, onFetchError);
    };

    getContactEmails();

}]);

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

    $scope.hello = 'hello from the UserScheduleFormSubmitController!';
    VenueEventsFactory.getVenues().then(function(result){
        $scope.venues = result;

        var venue = $scope.venues;
        console.log("$scope.venues: ",$scope.venues);

        $scope.submit = function () {
            console.log(venue);
            $http({
                url: '/api/user/submit',
                method: 'post'
            }).then(function (res) {
                $log.info(res.status);
            });
        };
    });
    //$scope.venues = VenueEventsFactory.getVenues();

    $log.info($scope.hello);
    //$http({
    //    url:'/user',
    //    method:'get'
    //}).then(function(res){
    //    $scope.venueEvents = res.data;
    //});

}]);
