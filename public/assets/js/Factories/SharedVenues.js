// creates a service that shares the venue object between controllers
rootsApp.factory('SharedVenues', function() {
  var venues = [];

  return {
    // returns the venues variable
    getVenues: function() {
      return venues;
    },
    // sets venues variable.  value should only ever be an object
    setVenues: function(value) {
      if (typeof value === 'object' && value !== null) {
        venues = value;
      } else {
        throw new Error('setVenues() requires an array of objects');
      }
    }
  };
});
