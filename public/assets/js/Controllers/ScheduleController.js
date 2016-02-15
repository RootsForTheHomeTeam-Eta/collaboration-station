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
//this deletes a venue document from th DB collection
        $scope.deleteVenue = function(param){
            if (confirm("Are you sure you want to Delete this Venue?") == true) {
                VenueEventsFactory.deleteVenue(param);
                VenueEventsFactory.getVenues();

            }


        };
//this deletes a event from the DB
        $scope.deleteEvent = function(param1,param2){
            param = {};
            param.venue = param1;
            param.event = param2;
            console.log(param);

            if (confirm("Are you sure you want to Delete this Event?") == true) {
                VenueEventsFactory.deleteEvent(param);
                VenueEventsFactory.getVenues();

            }


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

