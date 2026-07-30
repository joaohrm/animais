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

    let metodosPublicos = {
        isAnimalDefinido: _isAnimalDefinido,
        isEncerrado: _isEncerrado,
        iniciar: _iniciar,
        verificaOpcao: _verificaOpcao,
    }

    Object.assign(vm, metodosPublicos);

    function _iniciar(){
        animalService.getAnimalList().then(function(data){
            vm.animais = data;
            vm.nivel = 1;
        }).then(function(){
            if(vm.animais.length > 0){
                somInicio.play();
                setTimeout(function(){ somNivel1.play(); }, 3000);

                chamaTipoJogo();

                vm.ignoraAnimal = [];
            }
        });
    }

    function getLetras(){
        //pega um animal aleatoriamente
        vm.animal = getAnimalAleatorio(vm.animais, 1)[0];
      
        //letras do nome do animal divididas
        var letras = vm.animal.nome.split('');
       
        var letrasRemovidas = [];

        //monta uma lista com QUANT_LETRAS de letras para remover do nome do animal e define suas posições
        for(let i = 0; i < QUANT_LETRAS; i++){
            let pos = Math.floor(Math.random() * letras.length);
            while(letras[pos] == '_'){
                pos = Math.floor(Math.random() * letras.length);
            }
            letrasRemovidas.push( { nome: letras[pos], pos: pos } );
            letras[pos] = '_';
        }

        //remonta o nome do animal com os espaços
        vm.combinacaoLetras =  letras.join('');
        //cria opções com base no alfabeto menos as letras removidas com pos 99
        vm.opcoes = ALFABETO.filter(letra => letrasRemovidas.map(palavra => palavra.nome.toUpperCase()).join('').indexOf(letra.nome.toUpperCase()) == -1).slice(0,3);
        reiniciaClasseBotoes();
        //adiciona as opções as letras removidas corretas com o pos correto
        for(let i = 0; i < QUANT_LETRAS; i++){
            vm.opcoes.push(letrasRemovidas[i]);
        }
        vm.opcoes.sort(() => .5 - Math.random());
    }

    function getPalavras(){
        //pega uma quantidade de animais aleatorios
        vm.opcoes = getAnimalAleatorio(vm.animais, QUANT_PALAVRAS);
        reiniciaClasseBotoes();
        //sorteia um animal da lista pré-selecionada
        getAnimalSorteado(vm.opcoes);

        function getAnimalSorteado(animais){
            vm.animal = animalService.getAnimalSorteado(animais);
        }
    }

    function reiniciaClasseBotoes(){
        vm.opcoes.forEach(opt => opt.class = '');
    }

    function chamaTipoJogo(){
        if(vm.config.formatoJogo == 'palavras'){
            getPalavras();
        } else {
            getLetras();
        }
    }

    function isOpcaoCorreta(opcao){
        //tipo palavras não valida aqui
        if(vm.config.formatoJogo == 'letras'){
            //se opção for diferente de 99, ou seja faz parte das letras do animal
            if(opcao.pos != 99){
                var letras = vm.combinacaoLetras.split('');
                //substitui espaço pela letra correta
                letras[opcao.pos] = opcao.nome;
                //reuni letras
                vm.combinacaoLetras = letras.join('');
                //se não possui mais espaços avança
                if(vm.combinacaoLetras.indexOf('_') == -1){
                    vm.avanca = true;
                    somAcerto.play();
                } else {
                    vm.avanca = false;
                }
                return true;
            } else {
                return false;
            }
        } else {
            let correto = Boolean(opcao.nome == vm.animal.nome)
            vm.avanca = true;

            if(correto){
                somAcerto.play();
                return true;
            }
        }
        
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
        //verifica se a opção esta correta
        if(isOpcaoCorreta(opcao)){
            //proxima fase
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
            chamaTipoJogo();
        }
    }

    function _isAnimalDefinido(){
        return Boolean(vm.animal);
    }

    function _isEncerrado(){
        return Boolean(vm.final);
    }
}