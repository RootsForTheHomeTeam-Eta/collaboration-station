//controller to submit user responses from schedule form
rootsApp.controller('UserScheduleFormSubmitController', [ '$scope','$http', 'VenueEventsFactory', '$log', function ($scope, $http, VenueEventsFactory , $log) {

    $scope.venues = VenueEventsFactory.venues;

    VenueEventsFactory.getVenues();

    console.log($scope.venues);

    $log.info($scope.hello);

    //$scope.inputs = venues.data;
    //console.log($scope.inputs);
    $scope.formData = {};

    $scope.submit = function () {
        console.log($scope.formData);
       // $http({
       //     url: '/api/user/submit',
       //     method: 'post'
       // }).then(function (res) {
       // $log.info(res.status);
       //});
   };


    //$scope.venues = VenueEventsFactory.getVenues();
    //$http({
    //    url:'/user',
    //    method:'get'
    //}).then(function(res){
    //    $scope.venueEvents = res.data;
    //});

}]);

rootsApp.controller('PostCtrl',[ 'messages', function (messages){
    var self = this;

    self.newMessage = 'Hello World!';

    self.addMessage = function(message){
        messages.add(message);
        self.newMessage = '';
    };
}]);