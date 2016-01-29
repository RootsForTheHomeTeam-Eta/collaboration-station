
// creates a service that shares the venue object between controllers
rootsApp.factory('VenueEventsFactory', function($http) {

    var venues = [];


    return{
        getVenues : function() {
            return $http({
                url: '/api/event/getEvents',
                method: 'GET'
            }).success(function(result){
                    venues = result;
                    console.log(venues);

                })
                .error(function(data, status, headers, config) {
                    $log.warn(data, status, headers(), config);
                });
        },
        venues: venues

    };
});
