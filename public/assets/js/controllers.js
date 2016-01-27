var rootsAppControllers = angular.module('rootsAppControllers', []);
// login controller

rootsAppControllers.controller('loginCtrl', function ($scope, $http, $window) {
  //$scope.user = {username: req.body.username, password: req.body.password};
  //$scope.message = req.body.message;
  $scope.submit = function() {
    $http
      .post('/login', $scope.user)
      .then(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
      }, function (data, status, headers, config) {
        // Erase token if error
        delete $window.sessionStorage.token;

        // Error message
        $scope.message = 'Error: Invalid username or password';
    });
  };
});


rootsAppControllers.controller('mainCtrl', function ($scope) {
  $scope.onIconCLick = function(){
    popupS.modal({
      content:'<div><h2>' +
      '<p>The Alerts tab will show you what group has submitted their schedule form Clear the alert by clicking the alert button.</p> ' +
      '<p>The Quick Send tab allows you to select Garden Groups to send specific quick alerts to Select the recipient or recipients, the type of alert and submit.</p> ' +
      '<p>Add new events to the schedule by filling in the "Add Event" form. These events will be used to create the new form for the garden' +
          'groups to sign up through. <p>' +
      '<p>Create new users who can sign up for scheduled events through the Add User tab. Use thier email as their username and create a simple password' +
      'that you can share with them. </p> ' +
      '<p>The lower section of the page contains a schedule view. See users choices and click on the appropriate button for who you would like ' +
          'to schedule during each event. Once you have chosen the groups for the events at a venue you can download, save and print' +
      ' the event schedule.</p> ' +
      '</h2></div>'
    });

  };
  $scope.hello = 'hello!';
  console.log($scope.hello);
});



//controller for tabs

rootsAppControllers.controller('tabController', function ($scope){
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

//controllers for admin forms

//new event submit controller will this
//work with our data model
rootsAppControllers.controller("formEventCtrl", ['$scope', '$http', function($scope, $http) {
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
        popupS.alert({
          content: 'Event Added'
        });
      });

    };
  //should have a popupS modal confirmation

}]);


//new user creation controller how will this
//work with our data model
rootsAppControllers.controller("userCtrl", ['$scope', '$http', function($scope, $http) {
  $scope.user = {};
  $scope.submitUserForm = function () {
    //form data tied to model
    var user = {
      orgName: $scope.orgName,
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      username: $scope.username,
      password: $scope.password
    };
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


rootsAppControllers.controller('noticeAlertCtrl', function ($scope) {
  //alert should appear when activity is made on
  //form submission
  $scope.hello = 'hello!';
  console.log($scope.hello);

});

rootsAppControllers.controller('noticeSendCtrl', function ($scope) {
  //Send notices with button based on who is selected and what type of message
  //should have a popupS modal confirmation
  $scope.hello = 'hello!';
  console.log($scope.hello);

});

rootsAppControllers.controller('messageCtrl', function ($scope) {
  //Send personal messages from the app
  //should have a popupS modal confirmation
  $scope.hello = 'hello!';
  console.log($scope.hello);

});


//We need a service would read the venue data and set the scope then
//our various controllers can use it via injection of the service




rootsAppControllers.controller('scheduleController', ['$scope', '$http', function($scope, $http) {
  $scope.getEvents = function () {
    $http({
      method: 'GET',
      url: '/api/event/getEvent'
      //all info from venues is available via this request
    }).then(function (res) {
      //$scope.venueName = res.data.venueName;
      //$scope.eventDate = res.data.events.eventDate;
      //$scope.arrivalTime = res.data.arrivalTime;
      //$scope.eventTime = res.data.gameTime;
      $scope.test = 'Twins Stadium';
    });
  };
}]);


rootsAppControllers.controller('saveController', ['$scope', '$http', function($scope, $http) {
  //will save current schedule with ng-click saveSchedule()
  $scope.saveSchedule = function () {
    var schedule = {
      venue: $scope.venueName,
      events: [{
        event: {
          eventDate: $scope.eventDate,
          arrivalTime: $scope.arrivalTime,
          eventTime: $scope.eventTime,
          orgName: $scope.orgName
        }
      }]
    };
    $http({
      method: 'POST',
      url: '/schedule',
      data: schedule
    }).then(function () {

    });
  };
}]);

rootsAppControllers.controller('prevController', ['$scope', '$http', function($scope, $http) {
  //will view previous schedule with ng-click viewPreviousSchedule()
  $scope.viewPreviousSchedule= function() {


    $scope.hello = 'hello!';
    console.log($scope.hello);
  };
}]);

rootsAppControllers.controller('modalController', ['$scope', '$http', function($scope, $http) {
    $http({
      method: 'GET',
      url: '/event'
      //all info from venues is available via this request
    }).then(function(res){
      //$scope.venueName = res.data.venueName;
      //$scope.eventDate = res.data.events.eventDate;
      //$scope.arrivalTime = res.data.arrivalTime;
      //$scope.eventTime= res.data.gameTime;
      $scope.test= 'Twins Stadium';
      });
  $scope.generateSchedule= function(){
    console.log($scope.test);
    console.log('I clicked');

   //pull event data from the database to set variables for schedule creation
   var test= $scope.test;

   popupS.modal({
     content: '<div> ' +
     '<div  class = "venueContainer"> ' +
     '<div class="modalWidth"> ' +
     '<div class = "modalHeader orange row container-fluid">Target Field</div>' +
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
  };
  //will clear schedules with ng-click="clearSchedule()" will ask for
  //confirmation
  $scope.hello = 'hello!';
  console.log($scope.hello);
}]);


//controller that with function to tell you what partial you are on
rootsAppControllers.controller('navControl', ['$scope','$location', function($scope, $location) {
  $scope.isPartial = function (viewLocation) {
    var active = (viewLocation === $location.path());
    return active;
  };

}]);


// get Venue Object
// Venue Object Populates form
// User Group goes through and makes a preference per event
// On submit the controller makes a put request to update the model
// will method be a put or update or patch?
// are we getting the venue collection? Is a params needed?

rootsAppControllers.controller('userGroupCtrl', [ '$scope','$http', function ($scope, $http) {
  $scope.hello = 'hello from the userGroupCtrl!';
  console.log($scope.hello);
  $http({
    url:'/user',
    method:'get'
  }).then(function(response){
    $scope.venueEvents = response.data;
  });


  $scope.submit = function () {
    console.log(venu.pref.one);
    $http({
      url: '/user',
      method: 'post'
    }).then(function () {
      console.log(response.status);
    });
  };
}]);
