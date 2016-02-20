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
});

