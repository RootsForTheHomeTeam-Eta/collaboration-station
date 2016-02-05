// Authentication service
rootsApp.factory('AuthService', ['$q', '$timeout', '$http', function($q, $timeout, $http) {

  // create user variable
  var user = {};

  // return available functions for use in controllers
  return ({
    isLoggedIn: isLoggedIn,
    getUserStatus: getUserStatus,
    login: login,
    logout: logout,
    register: register,
    isAdmin: isAdmin,
    user: user
  });

  function isAdmin() {
    if (user.isAdmin) {
      return true;
    } else {
      return false;
    }
  }

  function isLoggedIn() {
    if (user.loggedIn) {
      return true;
    } else {
      return false;
    }
  }

  function getUserStatus() {
    return user;
  }

  function login(username, password) {

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('/api/auth/login', {username: username, password: password})
      // handle success
      .success(function (data, status) {
        if(status === 200 && data.status) {
          console.log('data',data)
          user.loggedIn = true;
          user.isAdmin = data.isAdmin;
          user.orgName = data.orgName;
          console.log('user in auth service',user);
          deferred.resolve();
        } else {
          user = false;
          deferred.reject();
        }
      })
      // handle error
      .error(function (data) {
        user.loggedIn = false;
        deferred.reject();
      });

    // return promise object
    return deferred.promise;
  }

  function logout() {

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a get request to the server
    $http.get('/api/auth/logout')
      // handle success
      .success(function (data) {
        user.loggedIn = false;
        deferred.resolve();
      })
      // handle error
      .error(function (data) {
        user.loggedIn = false;
        deferred.reject();
      });

    // return promise object
    return deferred.promise;
  }

  function register(username, password) {

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('/api/auth/register', {username: username, password: password})
      // handle success
      .success(function (data, status) {
        if(status === 200 && data.status){
          deferred.resolve();
        } else {
          deferred.reject();
        }
      })
      // handle error
      .error(function (data) {
        deferred.reject();
      });

    // return promise object
    return deferred.promise;

  }
}]);
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

/**
 * Created by Manu on 1/29/16.
 * A factory to get the user submit notifications
 */
rootsApp.factory('User2AdminFactory', function($http) {
    var notifications = {};
    return{
        getNotifications : function() {
            return  $http({
                url: '/notification/getNotification',
                method: 'GET'
            }).success(function(result){
                    notifications.data = result;
                    console.log('User2AdminFactory', notifications.data);
                })
                .error(function(data, status, headers, config) {
                    $log.warn(data, status, headers(), config);
                });
        },
        notifications: notifications,

        deleteNotifications : function(param) {
            return  $http({
                url: '/notification/deleteNotification/' + param,
                method: 'delete',
                data: param
            }).success(function(data, status, headers){
                    console.log('delete info', status);
                })
                .error(function(data, status, headers, config) {
                    $log.warn(data, status, headers(), config);
                });
        }
    };

    //return{
    //    deleteNotifications : function(param) {
    //        return  $http({
    //            url: '/notification/deleteNotification',
    //            method: 'delete',
    //            data: param
    //        }).success(function(data, status, headers){
    //                console.log('delete info', result.delAlert);
    //            })
    //            .error(function(data, status, headers, config) {
    //                $log.warn(data, status, headers(), config);
    //            });
    //    },
    //};

});

//angular.module("contacts.factory", []).
//factory('contactFactory', function($http){
//    return {
//        //code removed
//        deleteContact: function(id) {
//            return $http.delete('/api/contact/' + id);
//        }
//    }
//})
//creates a service that shares the user object between controllers
rootsApp.factory('UserRepoFactory', function($http){
    var users = {};
    return {
    getUsers : function(){
        return $http
            // /api/user/getUsers to return orgNames and emails
            .get('/api/user/getUsers')
            .then(function(response){
                users.data = response.data;
                console.log("UserRepoFactory users.data",users.data);
                console.log("UserRepoFactory response.data:",response.data)
            }, function(err) {
                //return err;
            });
    },

        users: users
    };
});


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
        venues: venues
    };
});