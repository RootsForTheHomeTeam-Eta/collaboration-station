//controller to populate alerts based on user form submission
rootsApp.controller('NoticeAlertController',['$scope','User2AdminFactory', function ($scope, User2AdminFactory) {
    //alert should appear when activity is made on
    //form submission

    $scope.notifications = User2AdminFactory.notifications;
    User2AdminFactory.getNotifications();
    console.log($scope.notifications);


}]);
