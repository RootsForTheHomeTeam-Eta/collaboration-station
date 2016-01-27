rootsApp.controller("FormEventController", ['$scope', '$http', function($scope, $http) {
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