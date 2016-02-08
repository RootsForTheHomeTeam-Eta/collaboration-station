//controller that functions on all pages for help screen
rootsApp.controller('AdminViewController', ['$rootScope', '$scope', '$http', '$location', 'AuthService', '$log',
  function($rootScope, $scope, $http, $location, AuthService, $log) {
  //$route.reload();
  // verify logged in status
  //$scope.$on('$routeChangeSuccess', function (event, next, current) {
  //  if (AuthService.isAdmin() === false) {
  //    // call logout from service
  //    AuthService.logout()
  //      .then(function () {
  //        $location.path('/login');
  //      });
  //  }
  //  $log.info('$routeChangeSuccess - AdminViewController');
  //  console.log('AdminViewController $routeChangeStart', AuthService.isAdmin());
  //});

}]);

rootsApp.controller('FinalScheduleViewController', ['$scope', '$http', function($scope, $http) {
    $scope.hello = 'hello from Final Schedule View controller!';
    console.log($scope.hello);

    $http({
        method: 'GET',
        url: '/getSchedule'
    }).then(function(docs) {
        //$scope.schedule = {};
        $scope.schedule = docs;
        console.log($scope.schedule);

    });
}]);

//controller that adds events from admin page under add event tab
rootsApp.controller("FormEventController", ['$scope', '$http', 'VenueEventsFactory', function($scope, $http, VenueEventsFactory) {
    $scope.event = {};
  //form data tied to model where possible
    $scope.eventReset = function() {
    $scope.venueName = '';
    $scope.eventDate = '';
    $scope.arrivalTime = '';
    $scope.gameTime = '';
    $scope.submitBy = '';
  };
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
          content: 'Your new event has been added!'
        });
        $scope.venueName = '';
        $scope.eventDate = '';
        $scope.arrivalTime = '';
        $scope.gameTime = '';
        $scope.submitBy = '';
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
    //// verify logged in status
    //$rootScope.$on('$routeChangeSuccess', function (event, next, current) {
    //    if (AuthService.isLoggedIn() === false) {
    //        $location.path('/login');
    //        $log.info('$routeChangeSuccess - MainHelpController');
    //    }
    //});

        $scope.loggedIn = " ";

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
rootsApp.controller('MessageController', ['$scope', '$http', 'UserRepoFactory',
    function ($scope, $http, UserRepoFactory) {



    $scope.sendMail = function () {
        console.log('I clicked');

        var data = {
            sendToemail : $scope.sendToemail, //This will become auto-populated
            sendToname : $scope.sendToname, //This will become auto-populated
            sendTomessage : $scope.sendTomessage
        };
        console.log('data for email message:',data);
        // Simple POST request example (passing data) :
        $http.post('/sendNotices', data).
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('email sent!');
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('email not sent!');
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

    // For Dropdown:
    UserRepoFactory.getUsers().then(function() {
        $scope.dropUsers = UserRepoFactory.users;
        console.log('dropUsers inside',$scope.dropUsers);
    });
    //$scope.dropUsers = UserRepoFactory.users;
    console.log('dropUsers outside',$scope.dropUsers);
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
rootsApp.controller('NoticeAlertController',['$scope','User2AdminFactory', function ($scope, User2AdminFactory) {
    //alert should appear when activity is made on
    //form submission

    $scope.deleteNotifications = function(param){
        User2AdminFactory.deleteNotifications(param);
        User2AdminFactory.getNotifications();
    };


    $scope.notifications = User2AdminFactory.notifications;
    User2AdminFactory.getNotifications();
    console.log($scope.notifications);




}]);

//
//$scope.deleteNotifications = function(noti){
//    console.log(noti);
//    $http({
//        url: '/notification/deleteNotification',
//        method: 'delete',
//        data: noti
//    }).then(function (res) {
//        //$log.info(res.status);
//        //$log.info(res);
//
//    });
//
//};

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
        $scope.noticeUsers = UserRepoFactory.users;
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
        popupS.alert({
            content: 'Message Sent!'
        });
    }

    }]);

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
        $http({
            url: '/api/auth/register',
            method: 'post',
            data: user
        }).then(function () {

        });
        popupS.alert({
            content: 'User Registered.'
        });
    };
    //alert popping even if form not submitted



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
            console.log('clicked');
            console.log($scope.formData);
        });
    };


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
rootsApp.controller("UserDropDownController", ['$scope', 'UserRepoFactory', function($scope, UserRepoFactory) {
    //var onFetchError = function (message) {
    //    $scope.error = "Error Fetching Users. Message:" + message;
    //};
    //var onFetchCompleted = function (data) {
    //    $scope.users = data;
    //};
    //var getContactEmails = function () {
    //    UserRepoFactory.get().then(onFetchCompleted, onFetchError);
    //};
    //
    //getContactEmails();
    //$scope.dropUsers = {};
    UserRepoFactory.getUsers().then(function() {
        $scope.dropUsers = UserRepoFactory.users;
        console.log('dropUsers inside',$scope.dropUsers);
    });
    //$scope.dropUsers = UserRepoFactory.users;
    console.log('dropUsers outside',$scope.dropUsers);
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

        $scope.venues = VenueEventsFactory.venues;
        VenueEventsFactory.getVenues();

        $scope.notification = {};
        $scope.notification.orgName = AuthService.user.orgName;

        $scope.orgName = AuthService.user.orgName;

        console.log($scope.orgName);

        //this function loops through the org array and checks to see if any of the objects have a matching orgName
        $scope.verify = function(orgArray){
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

              //true == 0
              //false = anything in the array


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
            console.log(resetObj);
            $http({
                url: '/api/user/reset' ,
                method: 'put',
                data: resetObj
            }).then(function (res, status) {
                $log.info(res.status);
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
                //$log.info(res.status);
                $log.info(res);
                //console.log(UserSchedule);
            });
        };

        //$scope.testy = new $scope.event("Twins", "07/05/2990", "true");
        $scope.submit = function (venueId, eventId,pref) {

            var venueId = venueId;
            var eventId = eventId;
            var pref = pref;
            console.log(venueId);
            console.log(eventId);
            console.log(pref);

            var prefObj = {};
            var user = AuthService.user;

            prefObj.orgName = user.orgName;
            prefObj.venue_id = venueId;
            prefObj.event_id = eventId;
            prefObj.preference = pref;

            $log.warn(prefObj);

            $http({
                 url: '/api/user/submit',
                 method: 'post',
                 data: prefObj
             }).then(function (res) {
                $log.info(res);
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
    console.log('Printing from PrintScheduleController.js');
    $scope.printSchedule = function(){
        console.log('print clicked');
        // need an id on the schedule html, 'printArea' was used on Stack Overflow
        var schedule = document.getElementById('printArea').innerHTML;
        // the first two arguments to $window.open are a URL and a name.
        //these were left blank but I imagine we could put it in later
        var scheduleWindow = $window.open('', '', 'width=800', 'height=600');
        scheduleWindow.document.write(schedule);
        scheduleWindow.print();
    };

}]);