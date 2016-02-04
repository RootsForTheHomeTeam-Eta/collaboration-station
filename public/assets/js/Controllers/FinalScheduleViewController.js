rootsApp.controller('FinalScheduleViewController', ['$scope', '$http', function($scope, $http) {
    $scope.hello = 'hello from Final Schedule View controller!';
    console.log($scope.hello);

    //var schedules = {};
    //
    //return{
    //    getVenues : function() {
    //        return  $http({
    //            url: '/getSchedule',
    //            method: 'GET'
    //        }).success(function(result){
    //                schedules.data = result;
    //                console.log('schedules.data',schedules.data);
    //
    //            })
    //            .error(function(data, status, headers, config) {
    //                $log.warn(data, status, headers(), config);
    //            });
    //    },
    //    schedules: schedules
    //};


}]);
