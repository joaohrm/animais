describe('animalController', function() {
    beforeEach(module('app'));

    var $controller;
    var controller;

    beforeEach(inject(function(_$controller_, $rootScope) {
        $controller = _$controller_;
        controller = $controller('animalController', { $scope: $rootScope.$new() });
    }));

    describe('API pública do controlador', function() {
        it('deve expor os métodos principais', function() {
            expect(controller.isAnimalDefinido).toEqual(jasmine.any(Function));
            expect(controller.isEncerrado).toEqual(jasmine.any(Function));
            expect(controller.iniciar).toEqual(jasmine.any(Function));
            expect(controller.verificaOpcao).toEqual(jasmine.any(Function));
        });
    });

    describe('estado inicial do jogo', function() {
        it('deve iniciar sem animal definido', function() {
            expect(controller.isAnimalDefinido()).toBe(false);
            expect(controller.isEncerrado()).toBe(false);
        });

        it('deve manter a configuração inicial do jogo', function() {
            expect(controller.config.formatoJogo).toBe('palavras');
            expect(controller.config.case).toBe('text-uppercase');
            expect(controller.config.efeitoAnimal).toBe('none');
        });
    });
});