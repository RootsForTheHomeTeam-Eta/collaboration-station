//controller to populate alerts based on user form submission
rootsApp.controller('NoticeAlertController',['$scope','User2AdminFactory', function ($scope, User2AdminFactory) {
    //alert should appear when activity is made on
    //form submission

    $scope.deleteNotifications = function(param){
        User2AdminFactory.deleteNotifications(param);
        User2AdminFactory.getNotifications();
    };


    $scope.notifications = User2AdminFactory.notifications;
    User2AdminFactory.getNotifications();
    console.log($scope.notifications);




}]);

//
//$scope.deleteNotifications = function(noti){
//    console.log(noti);
//    $http({
//        url: '/notification/deleteNotification',
//        method: 'delete',
//        data: noti
//    }).then(function (res) {
//        //$log.info(res.status);
//        //$log.info(res);
//
//    });
//
//};
