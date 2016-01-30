
// creates a service that shares the venue object between controllers
rootsApp.factory('VenueEventsFactory', function($http) {

        var getVenues = function() {
            $http({
                url: '/api/event/getEvents',
                method: 'GET'
            }).success(function(result){
                    venues.data = result;
                    console.log(venues.data);

                })
                .error(function(data, status, headers, config) {
                    $log.warn(data, status, headers(), config);
                });
        };

    var venues = {};

    return {
        getVenues : getVenues,
        venues : venues
    }
});


//rootsApp.factory('VenueEventsFactory', function($http) {
//
//    var venues = {};
//
//    return{
//        getVenues : function() {
//            return  $http({
//                url: '/api/event/getEvents',
//                method: 'GET'
//            }).success(function(result){
//                    venues.data = result;
//                    console.log(venues.data);
//
//                })
//                .error(function(data, status, headers, config) {
//                    $log.warn(data, status, headers(), config);
//                });
//        },
//        venues: venues
//    };
//});