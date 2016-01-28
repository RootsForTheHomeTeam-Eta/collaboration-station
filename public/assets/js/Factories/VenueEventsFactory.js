rootsApp.factory('VenueEventsFactory', ['$http', 'SharedVenues', '$log', function($http, SharedVenues, $log) {
    return{
        getVenues : function() {
            return $http({
                url: '/api/event/getEvents',
                method: 'GET'
            }).then(function(data) {
                $log.info('from VenueEventsFactory:',data);
                SharedVenues.setVenues(data);
            }, function() {
                $log.error('Error: Venues not set');
            });
        }
    };
}]);
