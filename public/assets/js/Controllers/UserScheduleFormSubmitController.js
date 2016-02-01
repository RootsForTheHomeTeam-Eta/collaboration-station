//controller to submit user responses from schedule form
    rootsApp.controller('UserScheduleFormSubmitController', [ '$scope','$http', 'VenueEventsFactory', '$log', function ($scope, $http, VenueEventsFactory , $log) {
        $scope.venues = VenueEventsFactory.venues;
        VenueEventsFactory.getVenues();
        $log.info($scope.hello);
        //$scope.accounts=[{name:"123"},{name:"124"},{name:"125"}]
        //
        //angular.forEach($scope.accounts,function(value,index){
        //    alert(value.name);
        //})
//need to set property values, but I have an array of objects
//submitting each venue sepearatly would make things simplier
//    OBJECT Contructor maybe
//    function person(first, last, age, eye) {
//        this.firstName = first;
//        this.lastName = last;
//        this.age = age;
//        this.eyeColor = eye;
//    }
//    var myFather = new person("John", "Doe", 50, "blue");
//    var myMother = new person("Sally", "Rally", 48, "green");
        $scope.event = function(name, date , pref ){
            this.venueName = name;
            this.eventDate = date;
            this.preferences = pref;
        };
        $scope.testy = new $scope.event("Twins", "07/05/2990", "true");
        $scope.submit = function () {
            var userSubmission = [];
            var venuesSubmit = $scope.venues.data;
            angular.forEach(venuesSubmit, function(value){
                var eventsArray = value.events;
                var eI = eventsArray.length;
                angular.forEach(eventsArray, function(value) {
                    console.log(value._id);
                    console.log(value.event);
                    //console.log(eI);
                    //userSubmission.push(value);
                    //$scope.testTwo = new $scope.event(value._id, value.event.eventDate, "true");
                    //var markers = [];
                    //for (var i = 0; i < 5; ++i) {
                    //    markers[i] = new $scope.event(value._id, value.event.eventDate, "true");
                    //}
                    ////console.log(markers);
                    //
                    //return $scope.testTwo;
                });
            });
        };
        console.log($scope.testTwo);
        //var fruits = ["Banana", "Orange", "Apple", "Mango"];
        //fruits.push("Kiwi");
        //var i = 0;
        //for (; i < 9; i++) {
        //    console.log(i);
        //    // more statements
        //}
        //var A = angular.copy(d);
//forEach array in object
//$.each(guitar, function(key, value) {
//    var tuningName = value.name;
//    var tuningArray = value.tuning;
//    console.log('name: ' + tuningName);
//    $.each(tuningArray, function(key,value) {
//        console.log(value);
//    });
//});
//OBJ
        //var obj = {name: 'misko', gender: 'male'};
        //var log = [];
        //angular.forEach(obj, function(value, key) {
        //    console.log(key + ': ' + value);
//    //});
//ARRAY
        //var obj = [{ "Name" : "Thomas", "Password" : "thomasTheKing" },
        //    { "Name" : "Linda", "Password" : "lindatheQueen" }];
        //angular.forEach(values, function(value, key){
        //    console.log(key + ': ' + value);
        //});
// it will log two iteration like this
// 0: [object Object]
// 1: [object Object]
        //var values = {name: 'misko', gender: 'male'};
        //var log = [];
        //angular.forEach(values, function(value, key) {
        //    this.push(key + ': ' + value);
        //}, log);
        //expect(log).toEqual(['name: misko', 'gender: male']);
        //var venueEvents = [];
        //
        //$scope.venues.data.each(fucntion(){
        //   var venueName = $scope.venue.data.venueName;
        //   var eventArray = [];
        //    this.find(event).each(function (){
        //        var event =  $scope.venue.data.events.event;
        //        var items = {};
        //        items[event] = event;
        //        eventArray.push(items)
        //    })
        //});
        //var trArray = [];
        //$('#tbPermission tr').each(function () {
        //    var tr =$(this).text();  //get current tr's text
        //    var tdArray = [];
        //    $(this).find('td').each(function () {
        //        var td = $(this).text();  //get current td's text
        //        var items = {}; //create an empty object
        //        items[tr] = td; // add elements to object
        //        tdArray.push(items); //push the object to array
        //    });
        //});
        // $http({
        //     url: '/api/user/submit',
        //     method: 'post'
        // }).then(function (res) {
        // $log.info(res.status);
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