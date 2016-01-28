// creates a service that shares the venue object between controllers
rootsApp.factory('SharedVenues', function() {
  var venues = {};

  return {
    getVenues: function() {
      return venues;
    },
    setVenues: function(value) {
      venues = value
    }
  };
});
