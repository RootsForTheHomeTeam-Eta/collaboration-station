
// creates a service that shares the venue object between controllers
rootsApp.factory('VenueEventsFactory', function($http) {

    var venues = {};

    return{
        getVenues : function() {
            return  $http({
                url: '/api/event/getEvents',
                method: 'GET'
            }).success(function(result){
                    venues.data = result;
                    console.log('venues.data',venues.data);

                })
                .error(function(data, status, headers, config) {
                    $log.warn(data, status, headers(), config);
                });
        },
        venues: venues,

        deleteVenue : function(param) {
            return  $http({
                url: 'api/event/deleteVenue/' + param,
                method: 'delete',
                data: param
            }).success(function(data, status, headers){
                    console.log('delete info', status);
                })
                .error(function(data, status, headers, config) {
                    $log.warn(data, status, headers(), config);
                });
        },
        deleteEvent : function(param) {
            return  $http({
                url: 'api/event/deleteEvent',
                method: 'put',
                data: param
            }).success(function(data, status, headers){
                    console.log('delete event', status);
                })
                .error(function(data, status, headers, config) {
                    $log.warn(data, status, headers(), config);
                });
        }

    };
});