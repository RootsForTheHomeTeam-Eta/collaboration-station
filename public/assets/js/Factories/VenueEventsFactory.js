// creates a service that shares the venue object between controllers
rootsApp.factory('VenueEventsFactory', function($http) {
    return{
        getVenues : function() {
            return $http({
                url: '/api/event/getEvents',
                method: 'GET'
            });
        }
    };
});
