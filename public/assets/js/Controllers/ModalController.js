//controller that populates admin created schedule after groups are chosen for specific time slots
rootsApp.controller('ModalController', ['$scope', '$http', function($scope, $http) {
    $scope.generateSchedule= function(){
        $http({
            method: 'GET',
            url: '/api/event/getEvents'
            //all info from venues is available via this request
        }).then(function(res){
            //$scope.venueName = res.data.venueName;
            //$scope.eventDate = res.data.events.eventDate;
            //$scope.arrivalTime = res.data.arrivalTime;
            //$scope.eventTime= res.data.gameTime;
            $scope.test= 'Twins Stadium';
            //console.log($scope.test);
            //****************\\
            console.log($scope.test);
            console.log('I clicked');
            //var test = $scope.test;

            //pull event data from the database to set variables for schedule creation

            popupS.modal({
                content: '<div ng-controller="ModalController">' +
                '<div  class = "venueContainer"> ' +
                '<div class="modalWidth"> ' +
                '<div class = "modalHeader orange row container-fluid">'+ $scope.test +'</div>' +
                '<div class = "venueHeader yellow row container-fluid"> ' +
                '<div class = "col-md-1 modalTitle">Date:</div> ' +
                '<div class = "col-md-1"></div> ' +
                '<div class = "col-md-2 modalTitle">Arrival Time:</div> ' +
                '<div class = "col-md-2"></div> ' +
                '<div class = "col-md-2 modalTitle">Event Time:</div> ' +
                '<div class = "col-md-1"></div> ' +
                '<div class = "col-md-2 modalTitle">Group</div> ' +
                '</div> <div class = "venueOptions row container-fluid"> ' +
                '<div class = "col-md-1 scheduleLabel">Sat, 03/22</div> ' +
                '<div class = "col-md-1"></div> ' +
                '<div class = "col-md-2 scheduleLabel">10:00 AM</div> ' +
                '<div class = "col-md-2"></div> ' +
                '<div class = "col-md-2 scheduleLabel">1:00 PM</div> ' +
                '<div class = "col-md-1"></div> ' +
                '<div class = "col-md-2"><button type="button" class="modalButton green">URG</button></div> </div> ' +
                '<div class = "venueOptions row container-fluid"> ' +
                '<div class = "col-md-1 scheduleLabel">Sun, 03/23</div> ' +
                '<div class = "col-md-1"></div> ' +
                '<div class = "col-md-2 scheduleLabel">12:00 AM</div> ' +
                '<div class = "col-md-2"></div> ' +
                '<div class = "col-md-2 scheduleLabel">3:00 PM</div> ' +
                '<div class = "col-md-1"></div> ' +
                '<div class = "col-md-2"><button type="button" class="modalButton green">YFH</button></div> ' +
                '</div> </div> </div> </div>'

            });

        });
    };
    //will clear schedules with ng-click="clearSchedule()" will ask for
    //confirmation
    $scope.hello = 'hello!';
    console.log($scope.hello);
}]);