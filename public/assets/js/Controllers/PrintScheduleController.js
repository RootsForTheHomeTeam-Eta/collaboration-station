// $window is an Angular service and needs to be put in the angular config

rootsApp.controller('PrintScheduleController', ['$scope', '$window', function($scope, $window){
    console.log('Printing from PrintScheduleController.js');
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