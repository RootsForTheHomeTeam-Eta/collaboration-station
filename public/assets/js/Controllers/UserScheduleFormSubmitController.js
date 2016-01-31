//controller to submit user responses from schedule form
rootsApp.controller('UserScheduleFormSubmitController', [ '$scope','$http', 'VenueEventsFactory', '$log', function ($scope, $http, VenueEventsFactory , $log) {

    $scope.venues = VenueEventsFactory.venues;

    VenueEventsFactory.getVenues();

    console.log($scope.venues);

    $log.info($scope.hello);

    $scope.submit = function () {
        //for (var i = 0; i < $scope.venues.data.length; i++) {
        //    console.log(i);
        //    // more statements
        //};
        for (var i in $scope.venues.data){
            console.log(i);
            var venueEvents =  {
                venueName[i]: $scope.venues.data[i].venueName,

            };
        };

        console.log(venueEvents.venueName)
        console.log($scope.venues);

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