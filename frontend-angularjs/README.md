# Animais

Aplicação web lúdica voltada para interação e alfabetização, com foco em identificar animais por meio de um jogo simples e envolvente.

## Objetivo do projeto

O projeto foi desenvolvido como uma experiência educativa e divertida, combinando elementos de interface interativa com uma proposta pedagógica acessível. A ideia central é reforçar o reconhecimento de animais e estimular a aprendizagem de forma leve.

## Stacks utilizadas

- AngularJS 1.x
- Angular Route
- Angular Resource
- Restangular
- ng-file-upload
- lodash
- Gulp
- Karma + Jasmine
- Bower
- Bootstrap

## Estrutura principal

- app.js: configuração do módulo Angular e das rotas principais
- src/main/animais: lógica do jogo e templates relacionados aos animais
- src/main/admin: área administrativa para gestão do conteúdo
- src/test: testes automatizados do controlador principal

## Como executar

1. Instale as dependências:
   - npm install
   - bower install

2. Inicie o servidor local:
   - gulp serve

3. A aplicação ficará disponível em http://localhost:3000

## Testes

Para executar os testes automatizados:

```bash
npm test
```

## Observação

O projeto representa um bom exemplo de aplicação frontend com foco em experiência do usuário, lógica de jogo e integração com serviços, sendo uma base interessante para evolução para uma solução mais robusta e escalável.
