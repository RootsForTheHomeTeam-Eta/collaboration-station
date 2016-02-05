rootsApp.controller('FinalScheduleViewController', ['$scope', '$http', '$window' function($scope, $http, $window) {
    $scope.hello = 'hello from Final Schedule View controller!';
    console.log($scope.hello);

    $http({
        method: 'GET',
        url: '/getSchedule'
    }).then(function(docs) {
        //$scope.schedule = {};
        $scope.schedule = docs;
        console.log($scope.schedule);

    });

    $scope.printSchedule = function(){

        // need an id on the schedule html, 'printArea' was used on Stack Overflow
        var schedule = document.getElementById('printArea').innerHTML;
        // the first two arguments to $window.open are a URL and a name.
        //these were left blank but I imagine we could put it in later
        var scheduleWindow = $window.open('', '', 'width=800', 'height=600');
        scheduleWindow.document.write(schedule);
        scheduleWindow.print();
    };
}]);
