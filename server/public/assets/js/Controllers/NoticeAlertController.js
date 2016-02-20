//controller to populate alerts based on user form submission
rootsApp.controller('NoticeAlertController',['$scope','User2AdminFactory', function ($scope, User2AdminFactory) {
    //alert should appear when activity is made on
    //form submission

    $scope.deleteNotifications = function(param){
        User2AdminFactory.deleteNotifications(param);
        User2AdminFactory.getNotifications();
    };

    // gets notifications from factory
    $scope.notifications = User2AdminFactory.notifications;
    User2AdminFactory.getNotifications();
}]);
