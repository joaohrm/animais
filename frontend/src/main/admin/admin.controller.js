app.controller('adminController', ['$scope', '$injector', 'Upload', adminController]);

function adminController($scope, $injector, Upload){
    var vm = this;
    var adminService = $injector.get('adminService');
    //var ngFileUpload = $injector.get('ngFileUpload');

    var metodosPublicos = {
        addFile: _addFile,
        fileChange: _fileChange,
        getList: _getList,
        remover: _remover,
        upload: _upload
    }

    init();

    function init(){
        angular.element(document.querySelector('.modal-backdrop')).remove();
        _getList();
    }

    function _addFile($files) {
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            Upload.upload({
              url: 'http://localhost:8080/upload',
              data: {file: $file}
            }).then(function(data) {
              vm.animais = data;
            }); 
          }
    }

    function _upload() {
        let fd = new FormData();
        fd.append('file', vm.file);
        fd.append('nome', vm.name);
        
        adminService.upload(fd).then(function(){
            _getList();
            vm.name = '';
        });
      
    }

    function _getList(){
        adminService.getList().then(function(data){
            vm.animais = data;
        });
    }

    function _remover(animalId){
        adminService.remover(animalId);
    }

    function _fileChange(ele){
      vm.file = ele.file;
      $scope.$apply();
    }
    
    Object.assign(vm, metodosPublicos);

}