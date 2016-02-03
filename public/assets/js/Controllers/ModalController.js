//controller that populates admin created schedule after groups are chosen for specific time slots
rootsApp.controller('ModalController', ['$scope', '$http', function($scope, $http) {
    $scope.hello = 'hello from Modal controller!';
    console.log($scope.hello);

    $scope.generateSchedule= function() {
        console.log('I clicked');
        //$http({
        //    method: 'GET',
        //    url: '/getSchedule'
            //all info from venues is available via this request
        //}.then(function(res){
            var venueName = 'Target Field';
            var eventDate = 'Sun, 10/20';
            var arrivalTime = '11:00 AM';
            var eventTime= '1:00 PM';
            //workgroup= res.data.orgName

            //****************\\
            console.log($scope.test);
            console.log('I clicked');
            //var test = $scope.test;

            //pull event data from the database to set variables for schedule creation

            popupS.modal({
                content: '<div ng-controller="ModalController">' +
                '<div  class = "venueContainer"> ' +
                '<div class="modalWidth"> ' +
                '<div class = "modalHeader orange row container-fluid">'+ venueName +'</div>' +
                '<div class = "venueHeader yellow row container-fluid"> ' +
                '<div class = "col-md-2 modalTitle">Date:</div> ' +
                '<div class = "col-md-1"></div> ' +
                '<div class = "col-md-2 modalTitle">Arrival Time:</div> ' +
                '<div class = "col-md-2"></div> ' +
                '<div class = "col-md-2 modalTitle">Event Time:</div> ' +
                '<div class = "col-md-1"></div> ' +
                '<div class = "col-md-2 modalTitle">Group</div> ' +
                '</div> ' +
                '<div class = "venueOptions row container-fluid"> ' +
                '<div class = "col-md-2 modalText">' + eventDate + '</div> ' +
                '<div class = "col-md-1"><p>&nbsp;</p></div> ' +
                '<div class = "col-md-2 modalText">' + arrivalTime + '</div> ' +
                '<div class = "col-md-2"><p>&nbsp;</p></div> ' +
                '<div class = "col-md-2 modalText">' + eventTime + '</div> ' +
                '<div class = "col-md-1"><p>&nbsp;</p></div> ' +
                '<div class = "col-md-2"><button type="button" class="modalButton green modalText">URG</button></div> ' +
                '</div> ' +
                '<div class = "venueOptions row container-fluid"> ' +
                '<div class = "col-md-2 modalText">Sun, 03/23</div> ' +
                '<div class = "col-md-1"><p>&nbsp;</p></div> ' +
                '<div class = "col-md-2 modalText">12:00 AM</div> ' +
                '<div class = "col-md-2"><p>&nbsp;</p></div> ' +
                '<div class = "col-md-2 modalText">3:00 PM</div> ' +
                '<div class = "col-md-1"><p>&nbsp;</p></div> ' +
                '<div class = "col-md-2"><button type="button" class="modalButton green modalText">YFH</button></div> ' +
                '</div>' +
                ' </div>' +
                ' </div> ' +
                '</div>'

            });

        };

    //will clear schedules with ng-click="clearSchedule()" will ask for
    //confirmation

}]);
