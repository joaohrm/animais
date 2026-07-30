app.service('adminService', ['$injector', adminService]);

function adminService($injector){
    var Restangular = $injector.get('Restangular');

    //Restangular.setBaseUrl('https://animais.onrender.com');
    Restangular.setBaseUrl('http://localhost:8080');

    var metodosPublicos = {
        upload: _upload,
        getList: _getList,
        remover: _remover
    }

    function _upload(file){
        return Restangular.one('admin')
        .withHttpConfig({ transformRequest: angular.identity })
        .customPOST(file, '', undefined, {'Content-Type': undefined})
    }

    function _getList(){
        return Restangular.one('admin')
        .withHttpConfig({ transformRequest: angular.identity })
        .get();
    }

    function _remover(animalId){
        Restangular.one('admin', animalId).remove();
    }

    function resource(){
        var config = function(RestangularConfigurer){
            RestangularConfigurer.setBaseUrl('http://localhost:8080');
            RestangularConfigurer.setDefaultHeaders({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'X-Requested-With', 
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Accept, Authorization, Content-Type',
                'Content-Type': 'multipart/form-data'
            });
        }

        /*if(params){
            return Restangular.withConfig(config).one('animal' + '/' + params.id);
        }*/
        return Restangular.withConfig(config).one('admin');
    }

    return metodosPublicos;
}