describe('animalController', function() {
    beforeEach(module('app'));

    var $controller, $scope;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $controller = $controller('animalController', {'$scope': $scope});
    }));

   

    describe('isOpcaoCorreta', function() {

        it('deveria verificar se a opção é o nome do animal', function() {
            expect($scope.animal.nome).toEqual('teste');
        });
    });
});