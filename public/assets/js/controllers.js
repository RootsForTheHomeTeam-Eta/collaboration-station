var rootsAppControllers = angular.module('rootsAppControllers', []);
// login controller

rootsAppControllers.controller('loginCtrl', function ($scope, $http, $window) {

  $scope.message = '';
  $scope.submit = function() {
    $scope.user = {
      username: username,
      password: password
    };
    $http
      .post('/api/auth/login', $scope.user)
      .then(function (data, status, headers, config) {
      }, function (data, status, headers, config) {
        // Error message
        $scope.message = 'Error: Invalid username or password';
    });
  };
});


rootsAppControllers.controller('mainCtrl', function ($scope) {
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


//new event submit controller REALLY Unsure on how this will
//work with our data model Would LOVE a walk through
//just wanted to get things started on my end
rootsAppControllers.controller("formEventCtrl", ['$scope', '$http', function($scope, $http) {
    $scope.event = {};
  //form data tied to model where possible
    $scope.submit = function () {
      var event = {
        venueName: $scope.venueName,
        event: {
          eventDate: $scope.eventDate
        },
        arrivalTime: $scope.arrivalTime,
        gameTime: $scope.gameTime,
        submitBy: $scope.submitBy
      };
      $http({
        url: '/event',
        method: 'post',
        data: event
      }).then(function () {

      });

      //this may do nothing
      $http({
        url: '/event',
        //we need a post route for /event
        method: 'get'
      }).then(function(res){
        $scope.event = res.data;
      });
    };
  //this will of course go...
  $scope.hello = 'hello!';
  console.log($scope.hello);
  //should have a popupS modal confirmation

}]);


//new user creation controller REALLY Unsure on how this will
//work with our data model Would LOVE a walk through
//just wanted to get things started on my end
rootsAppControllers.controller("userCtrl", ['$scope', '$http', function($scope, $http) {
  $scope.user = {};
  $scope.submit = function () {
    //form data tied to model where possible
    var user = {
      orgName: $scope.orgName,
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      email: $scope.email,
      password: $scope.password
    };
    $http({
      url: '/user',
      method: 'post',
      data: user
    }).then(function () {

    });

    //this may do nothing
    $http({
      url: '/user',
      //we need a post route for /user
      method: 'get'
    }).then(function(res){
      $scope.user = res.data;
    });
  };
  //this will of course go...
  $scope.hello = 'hello!';
  console.log($scope.hello);
  //should have a popupS modal confirmation

}]);




//Not sure on these
rootsAppControllers.controller('noticeAlertCtrl', function ($scope) {
  //alert should appear when activity is made on
  //form submission or email
  //when pressed should expose what type of activity was made
  //or contents of message in a popupS modal
  $scope.hello = 'hello!';
  console.log($scope.hello);
});

rootsAppControllers.controller('noticeSendCtrl', function ($scope) {
  //Send notices with touch of button based on who is selected
  //and what type of message
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


//does each click need it's own controller?
rootsAppControllers.controller('scheduleController', function ($scope) {
  //will save current schedule with ng-click saveSchedule()
  $scope.saveSchedule= function(){
    alert("I clicked save schedule");
  };
  //will view previous schedule with ng-click viewPreviousSchedule()
  $scope.viewPreviousSchedule= function(){
    alert("I clicked view previous");
  };
  //will show current schedule in modal ng-click generateSchedule()
 $scope.generateSchedule= function(){
   alert("I clicked");
 };
  //will clear schedules with ng-click="clearSchedule()" will ask for
  //confirmation
  $scope.hello = 'hello!';
  console.log($scope.hello);
});


//controller that with function to tell you what partial you are on
app.controller('navControl', ['$scope','$location', function($scope, $location) {
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

//var VenueSchema = new Schema({
//  venueName: String,
//  location: String,
//  events: [{
//    event: {
//      eventDate: Date,
//      organization: [{
//        orgName: String,
//        preferences: [{
//          first: {type: Boolean, default: false},
//          second: {type: Boolean, default: false},
//          cannot: {type: Boolean, default: false}
//        }]
//
//      }]
//    },
//    arrivalTime: Date,
//    gameTime: Date
//  }]
//});