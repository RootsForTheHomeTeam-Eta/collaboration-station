//controller for whole admin view
rootsApp.controller('AdminViewController', ['$window','$scope', '$http', '$location', 'AuthService', '$log',
  function($window,$scope, $http, $location, AuthService, $log) {

  // verify logged in status
  $scope.$on('$routeChangeSuccess', function (event, next, current) {
    if (AuthService.isAdmin() === false) {
      // call logout from service
      AuthService.logout()
        .then(function () {
          //$location.path('/login');
          $window.location = '/#/login';
        });
    }
  });

}]);

// Controller for final schedule view
rootsApp.controller('FinalScheduleViewController', ['$scope', '$http', function($scope, $http) {
    // returns schedule document from db
    $http({
        method: 'GET',
        url: '/getSchedule'
    }).then(function(docs) {
        //$scope.schedule = {};
        $scope.schedule = docs;
    });

    $scope.printSchedule = function(){

        // need an id on the schedule html, 'printArea' was used on Stack Overflow
        var schedule = document.getElementById('printArea').innerHTML;
        // the first two arguments to $window.open are a URL and a name.
        //these were left blank but I imagine we could put it in later
        var scheduleWindow = $window.open('', '', 'width=800', 'height=600');
        scheduleWindow.document.write(schedule);
        scheduleWindow.print();
    };
}]);

//controller that adds events from admin page under add event tab
rootsApp.controller("FormEventController", ['$scope', '$http', 'VenueEventsFactory', function($scope, $http, VenueEventsFactory) {
    // instantiates event variable
    $scope.event = {};
    //function to reset form fields
    $scope.eventReset = function() {
        $scope.venueName = '';
        $scope.eventDate = '';
        $scope.arrivalTime = '';
        $scope.gameTime = '';
        $scope.submitBy = '';
      };
    // submits form data to db
    $scope.submitEventForm = function () {
        // variable of form entries
      var event = {
        venueName: $scope.venueName,
        eventDate: $scope.eventDate,
        arrivalTime: $scope.arrivalTime,
        gameTime: $scope.gameTime,
        submitBy: $scope.submitBy
      };
        // call to populate db with data
      $http({
        url: '/api/event/addEvent',
        method: 'post',
        data: event
      }).then(function () {
          // show new data on page
        VenueEventsFactory.getVenues();
          // popup for success
        popupS.alert({
          content: 'Your new event has been added!'
        });
        $scope.venueName = '';
        $scope.eventDate = '';
        $scope.arrivalTime = '';
        $scope.gameTime = '';
        $scope.submitBy = '';
      });
    };
}]);
// login controller for user and admin sign-in

rootsApp.controller('LoginController', ['$scope', '$location', 'AuthService', '$log',
  function ($scope, $location, AuthService, $log) {
  // login function
  $scope.login = function () {


    // initial values
    $scope.error = false;
    $scope.disabled = true;

    // call login from service
    AuthService.login($scope.loginForm.username, $scope.loginForm.password)
      // handle success
      .then(function () {
        if (AuthService.isAdmin()) {
            // if admin, send to admin page
          $location.path('/admin');
        } else {
            // if user, send to user page
          $location.path('/user');
        }
          // reset validation
        $scope.disabled = false;
          // empty form
        $scope.loginForm = {};
      }, function () {
          if(AuthService.flash){
              $scope.error = true;
              $scope.errorMessage = AuthService.flash;
          }
          // handle error
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
      });
  };
}]);


// logout controller for user and admin logout

rootsApp.controller('LogoutController', ['$window', '$scope', '$location', 'AuthService',
    function ($window, $scope, $location, AuthService) {
  // logout function
  $scope.logout = function () {
      // remove user name from header
      $scope.$parent.user = '';
    // call logout from service
    AuthService.logout()
      .then(function () {
        //redirect to login page
        //$location.path('/login');
          $window.location = '/#/login';

      });
  };
}]);

//controller that functions on all pages for help screen
rootsApp.controller('MainHelpController', ['$window','$rootScope', '$scope', '$http', '$location', 'AuthService', '$log',
    function($window,$rootScope, $scope, $http, $location, AuthService, $log) {
    //// verify logged in status
    $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
        if (AuthService.isLoggedIn() === false) {
            $location.path('/login');
            //$window.location = '/#/login';
        }
    });
        $scope.user = AuthService.getUserStatus();
        $scope.onIconCLick = function(){

            popupS.modal({
                content:'<div class="helpBody">' +
                '<h2 class="helpHeader">Need Some Help?</h2>'+
                '<p>The "Alerts" tab will show you what group has submitted their schedule form. Clear the alert by clicking the alert button.</p> ' +
                '<p>The "Quick Send" tab allows you to select Garden Groups to send specific quick alerts to. Select the recipient or recipients, the type of alert and submit.</p> ' +
                '<p>Add new events to the schedule by filling in the "Add Event" form. These events will be used to create the new form for the garden' +
                'groups to sign up through. <p>' +
                '<p>Create new users who can sign up for scheduled events through the "Add User" tab. Use their email as their username and create a simple password' +
                'that you can share with them. </p> ' +
                '<p>The lower section of the page contains a schedule view. Click the Orange bar with the venue for the event you would like to schedule. ' +
                'See users choices and click on the appropriate button for who you would like to schedule during the selected event. Only one group may be ' +
                'selected for each event time. Once you have chosen the groups for the events at a venue save the schedule. Once saved, ' +
                'press the view schedule button to see the created schedule. You can print via the print button or your browsers print option, you can also share the ' +
                'link to share the event schedule.</p> ' +
                '</div>'
            });

        };
}]);




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

// navigation controller
rootsApp.controller('NavController', ['$scope','$location', function($scope, $location) {
    // checks for partial
    $scope.isPartial = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };

}]);

//controller to populate alerts based on user form submission
rootsApp.controller('NoticeAlertController',['$scope','User2AdminFactory', function ($scope, User2AdminFactory) {
    //alert should appear when activity is made on
    //form submission

    $scope.deleteNotifications = function(param){
        User2AdminFactory.deleteNotifications(param);
        User2AdminFactory.getNotifications();
    };

    // gets notifications from factory
    $scope.notifications = User2AdminFactory.notifications;
    User2AdminFactory.getNotifications();
}]);

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

//controller to search database and find most recent admin saved schedule
rootsApp.controller('PrevController', ['$scope', '$http', function($scope, $http) {
    //will view previous schedule with ng-click viewPreviousSchedule()
    $scope.viewPreviousSchedule= function() {


        //$scope.hello = 'hello! from prev controller';
        //console.log($scope.hello);
    };
}]);

// $window is an Angular service and needs to be put in the angular config

rootsApp.controller('PrintScheduleController', ['$scope', '$window', function($scope, $window){
    console.log('Printing from PrintScheduleController.js');
    $scope.printSchedule = function(){

        // need an id on the schedule html, 'printArea' was used on Stack Overflow
        var schedule = document.getElementById('printArea').innerHTML;
        // the first two arguments to $window.open are a URL and a name.
        //these were left blank but I imagine we could put it in later
        var scheduleWindow = $window.open('', '', 'width=800', 'height=600');
        scheduleWindow.document.write(schedule);
        scheduleWindow.print();
    };

}]);
//controller for creating new users on the database
rootsApp.controller("RegisterController", ['$scope', '$http', function($scope, $http) {
    // initialize user variable
    $scope.user = {};
    // function to register
    $scope.registerUser = function () {
        //form data tied to model
        var user = {
            orgName: $scope.orgName,
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            username: $scope.username,
            password: $scope.password
        };
        console.log('user: ',user);
        // send user to db
        $http({
            url: '/api/auth/register',
            method: 'post',
            data: user
        }).then(function () {
            popupS.alert({
                content: 'User Registered.'
            });
        });

    };



}]);
//Controller to populate schedule creation bars on admin page
rootsApp.controller('ScheduleController',['$scope','$http', 'VenueEventsFactory', '$log',
    function($scope, $http, VenueEventsFactory, $log) {

    $scope.venues = VenueEventsFactory.venues;

    VenueEventsFactory.getVenues();

    $scope.formData= {};

    //this object is filled by the scope setting we did in the html so that we could deal with the
    //loops easier

    $scope.submitAndSave = function () {

        $http({
            url: '/saveSchedule',
            method: 'post',
            data: $scope.formData
        }).then(function (res) {
            popupS.alert({
                content: 'Schedule Saved'
            });
            $log.info(res.status);
        //    console.log('clicked');
        //    console.log($scope.formData);
        });
    };
//this deletes a venue document from th DB collection
        $scope.deleteVenue = function(param){

        console.log('delete clicked');

            if(popupS.confirm({
                content: 'Are you sure you want to delete this venue?',
                onSubmit: function() {
                    VenueEventsFactory.deleteVenue(param);
                    VenueEventsFactory.getVenues();
                }
            }));

            };


//this deletes a event from the DB
        $scope.deleteEvent = function(param1,param2){
            param = {};
            param.venue = param1;
            param.event = param2;
            console.log(param);

            if (popupS.confirm({
                    content: 'Are you sure you want to delete this event?',
                    onSubmit: function() {
                        VenueEventsFactory.deleteEvent(param);
                        VenueEventsFactory.getVenues();
                    }
                }));

        };

        //    if (confirm("Are you sure you want to Delete this Event?") == true) {
        //        VenueEventsFactory.deleteEvent(param);
        //        VenueEventsFactory.getVenues();
        //    }
        //
        //
        //};



        var arrayOrgs = ["Appetite for Change", "Dream of Wild Health", "Youth Farm Frogtown", "Urban Roots", "Youth Farm Hawthorn", "Youth Farm Lyndale", "Youth Farm Powderhorn", "Youth Farm W.Side"];
    $scope.$arrayOrgs = arrayOrgs;


    $scope.getOrgPreference = function($orgName, $currEventOrgArray) {

         ///loop through each organization that has replied to the event so far.
        for (var i = 0; i <= $currEventOrgArray.length -1; i++ ) {

            // get the orgName from the event.
            var testOrgName = $currEventOrgArray[i].orgName;

            // compare this to the orgName for the column
            if (testOrgName == $orgName) {

                // return a preference if there is one
                return $currEventOrgArray[i].preference;
            }
        }
        // return "cannot" if there isn't a preference.
        return "nores";
    };


}]);


//controller for tabs

rootsApp.controller('TabController', function ($scope){
    // initialize currentTab
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

//controller to submit user responses from schedule form
        rootsApp.controller('UserScheduleFormSubmitController', [ '$window','$rootScope', '$scope','$http', 'VenueEventsFactory', '$log', 'AuthService', '$location',
          function ($window, $rootScope, $scope, $http, VenueEventsFactory, $log, AuthService, $location) {


        // verify logged in status
        $scope.$on('$routeChangeSuccess', function (event, next, current) {
          if (AuthService.isLoggedIn() === false || AuthService.isAdmin() === true) {
            // call logout from service
            AuthService.logout()
              .then(function () {
                //$location.path('/login');
                  $window.location = '/#/login';
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



/**
 * Created by manadab on 2/5/16.
 */
rootsApp.controller('PrintScheduleController', ['$scope', '$window', function($scope, $window){
    // prints schedule
    $scope.printSchedule = function(){
        // need an id on the schedule html, 'printArea' was used on Stack Overflow
        var schedule = document.getElementById('printArea').innerHTML;
        // the first two arguments to $window.open are a URL and a name.
        //these were left blank but I imagine we could put it in later
        var scheduleWindow = $window.open('', '', 'width=800', 'height=600');
        // writes document to be printed
        scheduleWindow.document.write(schedule);
        // brings up print console
        scheduleWindow.print();
    };

}]);