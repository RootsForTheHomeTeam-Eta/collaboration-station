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
  // check if user is admin
  function isAdmin() {
    if (user.isAdmin) {
      return true;
    } else {
      return false;
    }
  }
  // check if user is logged in
  function isLoggedIn() {
    if (user.loggedIn) {
      return true;
    } else {
      return false;
    }
  }
  // return user's status
  function getUserStatus() {
    return user;
  }
  // login the user
  function login(username, password) {

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('/api/auth/login', {username: username, password: password})
      // handle success
      .success(function (data, status) {
        if(status === 200 && data.status) {
          user.loggedIn = true;
          user.isAdmin = data.isAdmin;
          user.orgName = data.orgName;
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
  // log out the user
  function logout() {

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a get request to the server
    $http.get('/api/auth/logout')
      // handle success
      .success(function () {
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
  // register the user
  // currently unused
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