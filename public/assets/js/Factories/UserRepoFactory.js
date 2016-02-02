//creates a service that shares the user object between controllers
rootsApp.factory('UserRepoFactory', function($http){
    var contactEmails = function(username){
        return $http
            // /api/user/getUsers to return orgNames and emails
            .get('/api/user/getUsers')
            .then(function(response){
                return response.data;
            });
    };

    return {
        get: contactEmails
    };
});
