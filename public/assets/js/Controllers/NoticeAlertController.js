//controller to populate alerts based on user form submission
rootsApp.controller('NoticeAlertController',['$scope','messages', function ($scope, messages) {
    //alert should appear when activity is made on
    //form submission
    var self = this;

    self.messages = messages.list;

}]);
