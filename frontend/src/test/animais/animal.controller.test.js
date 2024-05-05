describe('animalController', function() {
    beforeEach(module('app'));

    var $controller, $scope;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
        $controller = $controller('animalController', {'$scope': $scope});
    }));

    describe('verifica se esta definido o metodo', function() {
        it('isAnimalDefinido', function() {
            expect($controller.isAnimalDefinido).toBeDefined();
        });

        it('isEncerrado', function() {
            expect($controller.isEncerrado).toBeDefined();
        });

        it('iniciar', function() {
            expect($controller.iniciar).toBeDefined();
        });

        it('verificaOpcao', function() {
            expect($controller.verificaOpcao).toBeDefined();
        });
    });
});