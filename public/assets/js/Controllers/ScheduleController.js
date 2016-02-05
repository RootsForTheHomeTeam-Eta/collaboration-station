//Controller to populate schedule creation bars on admin page
rootsApp.controller('ScheduleController',['$scope','$http', 'VenueEventsFactory', 'UserRepoFactory', '$log',
    function($scope, $http, VenueEventsFactory, UserRepoFactory, $log) {

    $scope.venues = VenueEventsFactory.venues;

    VenueEventsFactory.getVenues();

    $scope.formData= {};

    // retrieve user orgNames
        var arrayOrgs = [];
    $scope.scheduleUsers = UserRepoFactory.users;
    UserRepoFactory.getUsers().then(function() {


        $scope.scheduleUsers.data.forEach(function(elem) {
            arrayOrgs.push(elem.orgName);
        });
    });



    $scope.$arrayOrgs = arrayOrgs;
    console.log('array orgs:',arrayOrgs);

    //this object is filled by the scope setting we did in the html so that we could deal with the
    //loops easier

    $scope.submitAndSave = function () {
        console.log('clicked');
        $http({
            url: '/saveSchedule',
            method: 'post',
            data: $scope.formData
        }).then(function (res) {
            popupS.alert({
                content: 'Schedule Saved'
            });
            $log.info(res.status);
        });
    };




    $scope.getOrgPreference = function($orgName, $currEventOrgArray) {

         //loop through each organization that has replied to the event so far.
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

