rootsApp.factory('UserRepoFactory', function($http){
    var contactEmails = function(username){
        return $http
            .get('/api/user/getUsers')
            .then(function(response){
                return response.data;
            });
    };

    return {
        get: contactEmails
    };
});
