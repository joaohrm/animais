# Jogo de Animais - Backend

API REST do sistema "Adivinhe os animais" construída com Spring Boot.

## Stack Tecnológica

- **Java 8**
- **Spring Boot 2.7.6**
  - Spring Web
  - Spring Data JPA
- **PostgreSQL** - Banco de dados relacional
- **Springfox 3.0.0** - Documentação da API (Swagger)
- **Maven** - Gerenciamento de dependências
- **Docker Compose** - Orquestração de containers

## Funcionalidades

- API REST para gerenciamento de animais
- Documentação interativa via Swagger UI
- Persistência de dados com JPA/Hibernate
- Integração com PostgreSQL

## Como Executar

### Pré-requisitos

- Java 8+
- Maven
- Docker e Docker Compose

### Iniciar o Banco de Dados

```bash
docker-compose up -d
```

### Executar a Aplicação

```bash
./mvnw spring-boot:run
```

Ou usar os scripts PowerShell (Windows):

```powershell
# Iniciar Docker e aplicação
.\start.ps1

# Parar Docker
.\stop.ps1
```

Ou empacotar e executar:

```bash
./mvnw clean package
java -jar target/animal-0.0.1-SNAPSHOT.jar
```

## Documentação da API

Após iniciar a aplicação, acesse o Swagger UI em `http://localhost:8080/swagger-ui.html`

## Estrutura do Projeto

```
src/main/java/com/animais/api/
├── animal/          # Recursos da API de animais
├── configs/         # Configurações da aplicação
└── doc/             # Configuração do Swagger
```

## Configuração

As configurações de banco de dados e aplicação estão em `src/main/resources/application.yml`.
