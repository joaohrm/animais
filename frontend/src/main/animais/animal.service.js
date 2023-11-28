app.service('animalService', ['$injector',  animalService]);

function animalService($injector){
    var Restangular = $injector.get('Restangular');

    var metodosPublicos = {
        getRandomAnimal: _getRandomAnimal,
        getAnimalList: _getAnimalList
    }

    /*function _getAnimal(animais){
        var idAnimalSorteado = animais[animais.length * Math.random() | 0];

        var params = {
            id: idAnimalSorteado
        }

        return resource(params).get().then(function(content){
            return content.plain();
        });

    }*/

    function _getRandomAnimal(animals){
        var randomAnimal = animals[animals.length * Math.random() | 0];
        return randomAnimal;
    }

    function _getAnimalList(){
        return resource().get().then(function(content){
            return content.plain();
        });
    }

    function resource(params){
        var config = function(RestangularConfigurer){
            RestangularConfigurer.setBaseUrl('http://localhost:8080');
            RestangularConfigurer.setDefaultHeaders({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'X-Requested-With', 
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Accept, Authorization, Content-Type'
            });
        }

        if(params){
            return Restangular.withConfig(config).one('animal' + '/' + params.id);
        }
        return Restangular.withConfig(config).all('animal').one('all');
    }

    return metodosPublicos;
}