app.controller('animalController', ['$scope', '$injector', '$timeout', animalController]);

function animalController($scope, $injector, $timeout){
    var vm = this;
    var animalService = $injector.get('animalService');
    
    var somAcerto = new Audio('files/acerto.mp3');
    var somErro = new Audio('files/erro.mp3');
    var somInicio =  new Audio('files/inicio_juju.ogg');
    var somNivel1 =  new Audio('files/nivel1_juju.ogg');
    var somFinal =  new Audio('files/final_juju.ogg');
    
    const QUANT_PALAVRAS = 4;
    const QUANT_LETRAS = 3;
    const ALFABETO = [{ nome: 'A', pos: 99 }, { nome: 'B', pos: 99 }, { nome: 'C', pos: 99 }, { nome: 'D', pos: 99 }, 
    { nome: 'E', pos: 99 }, { nome: 'F', pos: 99 }, { nome: 'G', pos: 99 }, { nome: 'H', pos: 99 }, { nome: 'I', pos: 99 }, 
    { nome: 'J', pos: 99 }, { nome: 'K', pos: 99 }, { nome: 'L', pos: 99 }, { nome: 'M', pos: 99 }, { nome: 'N', pos: 99 }, 
    { nome: 'O', pos: 99 }, { nome: 'P', pos: 99 }, { nome: 'Q', pos: 99 }, { nome: 'R', pos: 99 }, { nome: 'S', pos: 99 }, 
    { nome: 'T', pos: 99 }, { nome: 'U', pos: 99 }, { nome: 'V', pos: 99 }, { nome: 'X', pos: 99 }, { nome: 'Z', pos: 99 }];

    vm.config = {
        formatoJogo: 'palavras',
        case: 'text-uppercase',
        efeitoAnimal: 'none'
    }

    var metodosPublicos = {
        hasContent: _hasContent,
        isFinished: _isFinished,
        isOpcaoCorreta: _isOpcaoCorreta,
        start: _start,
        verificaOpcao: _verificaOpcao,
    }

    function _start(){
        animalService.getAnimalList().then(function(data){
            vm.animais = data;
            vm.nivel = 1;
        }).then(function(){
            if(vm.animais.length > 0){
                somInicio.play();
                setTimeout(function(){ somNivel1.play(); }, 3000);

                callTipoJogo();

                vm.ignoraAnimal = [];
            }
        });
    }

    function getLetras(){
        vm.animal = getAnimalAleatorio(vm.animais, 1)[0];
        var letras = vm.animal.nome.split('');
       
        var letrasRemovidas = [];

        for(let i = 0; i < QUANT_LETRAS; i++){
            let pos = Math.floor(Math.random() * letras.length);
            while(letras[pos] == '_'){
                pos = Math.floor(Math.random() * letras.length);
            }
            letrasRemovidas.push( { nome: letras[pos], pos: pos } );
            letras[pos] = '_';
        }

        vm.palavra =  letras.join('');
        vm.opcoes = ALFABETO.filter(letra => letrasRemovidas.map(palavra => palavra.nome.toUpperCase()).join('').indexOf(letra.nome.toUpperCase()) == -1).slice(0,3);
        for(let i = 0; i < QUANT_LETRAS; i++){
            vm.opcoes.push(letrasRemovidas[i]);
        }
        vm.opcoes.sort(() => .5 - Math.random());
    }

    function getPalavras(){
        vm.opcoes = getAnimalAleatorio(vm.animais, QUANT_PALAVRAS);
        clearClass();
        getAnimalSorteado(vm.opcoes);

        function clearClass(){
            vm.opcoes.forEach(opt => opt.class = '');
        }

        function getAnimalSorteado(animais){
            vm.animal = animalService.getRandomAnimal(animais);
        }
    }

    function callTipoJogo(){
        if(vm.config.formatoJogo == 'palavras'){
            getPalavras();
        } else {
            getLetras();
        }
    }

    function _isOpcaoCorreta(opcao){
        if(vm.palavra){
            if(opcao.pos != 99){
                var letras = vm.palavra.split('');
                letras[opcao.pos] = opcao.nome;
                vm.palavra = letras.join('');

                if(vm.palavra.indexOf('_') == -1){
                    vm.avanca = true;
                } else {
                    vm.avanca = false;
                }
                return true;
            } else {
                return false;
            }
        } 
        vm.avanca = true;
        return Boolean(opcao.nome == vm.animal.nome);
    }

    function getAnimalAleatorio(animais, quant){
        return animais.sort(() => .5 - Math.random()).slice(0, quant)
    }

    function resetEfeitoAnimal(){
        let efeitoAnimalAtual = vm.config.efeitoAnimal;
        vm.config.efeitoAnimal = 'nome';
        $timeout(function(){
            vm.config.efeitoAnimal = efeitoAnimalAtual;
        }, 2600);
    }

    function _verificaOpcao(opcao){
        opcao.class = 'desativado';
        if(_isOpcaoCorreta(opcao)){
            somAcerto.play();
            
            if(vm.avanca){
                resetEfeitoAnimal();
                $timeout(function(){
                    avancaNivel();
                    vm.nivel++;
                }, 3000);
                
            }
        } else {
            somErro.play();
        }
    }

    function avancaNivel(){
        vm.ignoraAnimal.push(vm.animal.id);
        vm.animais = vm.animais.filter(animal =>  !vm.ignoraAnimal.includes(animal.id));
        if(vm.animais.length < QUANT_PALAVRAS){
            somFinal.play();
            vm.final = true;
        } else {
            callTipoJogo();
        }
    }

    function _hasContent(){
        return Boolean(vm.animal);
    }

    function _isFinished(){
        return Boolean(vm.final);
    }

    Object.assign(vm, metodosPublicos);

}