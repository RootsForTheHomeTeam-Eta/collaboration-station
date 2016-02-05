//Controller to populate schedule creation bars on admin page
rootsApp.controller('ScheduleController',['$scope','$http', 'VenueEventsFactory', '$log', '$window', function($scope, $http, VenueEventsFactory, $log, $window) {

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

