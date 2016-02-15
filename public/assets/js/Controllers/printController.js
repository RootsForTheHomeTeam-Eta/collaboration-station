/**
 * Created by manadab on 2/5/16.
 */
rootsApp.controller('PrintScheduleController', ['$scope', '$window', function($scope, $window){
    // prints schedule
    $scope.printSchedule = function(){
        // need an id on the schedule html, 'printArea' was used on Stack Overflow
        var schedule = document.getElementById('printArea').innerHTML;
        // the first two arguments to $window.open are a URL and a name.
        //these were left blank but I imagine we could put it in later
        var scheduleWindow = $window.open('', '', 'width=800', 'height=600');
        // writes document to be printed
        scheduleWindow.document.write(schedule);
        // brings up print console
        scheduleWindow.print();
    };

}]);