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
