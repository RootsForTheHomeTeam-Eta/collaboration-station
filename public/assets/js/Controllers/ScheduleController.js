//Controller to populate schedule creation bars on admin page
rootsApp.controller('ScheduleController',['$scope','$http', 'VenueEventsFactory', '$log', function($scope, $http, VenueEventsFactory, $log) {

    $scope.venues = VenueEventsFactory.venues;

    VenueEventsFactory.getVenues();

    //this object is filled by the scope setting we did in the html so that we could deal with the
    //loops easier

    var arrayOrgs = ["Appetite for Change","Dream of Wild Health","Urban Roots","Youth Farm Frogtown","Youth Farm Hawthorn","Youth Farm Lyndale","Youth Farm Powderhorn","Youth Farm W.Side"];
    $scope.$arrayOrgs = arrayOrgs;

    //we need an array to repeat on to create the empty divs for our view structure

    //this won't work because we have a set amount of organizations and they won't populate in
    //a guranteed order.
    // var orgNameUnit;
    //var organizationsArray = [];
    //
    //
    //for (var i = 0; i < venues.events.event.organization.length ; i++) {
    //    orgNameUnit = venues.events.event.organization.orgName;
    //    organizationsArray.push(orgNameUnit);
    //    }
    //
    //$scope.organizationsArray = organizationsArray;


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
        });
    };

}]);

