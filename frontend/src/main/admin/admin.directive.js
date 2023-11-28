app.directive('fileInput', ['$parse', fileInput]);

function fileInput($parse){
    return {
        restrict: 'A',
        link: function(scope, ele, attrs){

            ele.bind('change', function(){
                $parse(attrs.fileInput)
                .assign(scope, ele[0].files[0]);
                scope.$apply();       
            });

        }
    }
}