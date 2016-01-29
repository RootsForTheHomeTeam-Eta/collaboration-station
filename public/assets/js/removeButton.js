//delete from dom function
rootsApp.directive("removeMe", function($rootScope) {
    return {
        link:function(scope,element,attrs)
        {
            element.bind('click',function() {
                element.remove();
            });
        }
    }
});