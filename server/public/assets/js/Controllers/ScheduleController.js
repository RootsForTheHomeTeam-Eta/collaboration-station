//Controller to populate schedule creation bars on admin page
rootsApp.controller('ScheduleController',['$scope','$http', 'VenueEventsFactory', '$log',
    function($scope, $http, VenueEventsFactory, $log) {
    // initializes venues variable
    $scope.venues = VenueEventsFactory.venues;

    VenueEventsFactory.getVenues();
    // initializes formData, which is set by expressions in view
    //this object is filled by the scope setting we did in the html so that we could deal with the
    //loops easier
    $scope.formData= {};

    // function to submit and save the schedule
    $scope.submitAndSave = function () {

        $http({
            url: '/saveSchedule',
            method: 'post',
            data: $scope.formData
        }).then(function (res) {
            popupS.alert({
                content: 'Schedule Saved'
            });
        });
    };

    // initialize arrayOrgs array that populates schedule header
    var arrayOrgs = ["Appetite for Change", "Dream of Wild Health", "Youth Farm Frogtown", "Urban Roots", "Youth Farm Hawthorn", "Youth Farm Lyndale", "Youth Farm Powderhorn", "Youth Farm W.Side"];
    $scope.$arrayOrgs = arrayOrgs;

    // this function ensures that the preferences are accessible by view
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

