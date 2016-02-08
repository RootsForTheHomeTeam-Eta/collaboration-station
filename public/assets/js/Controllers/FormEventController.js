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