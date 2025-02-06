# API de Conversão de Moedas

## Descrição

Esta é uma API de conversão de moedas desenvolvida com NestJS e TypeORM. A API permite listar moedas disponíveis, converter valores entre moedas e registrar novas moedas. Utiliza autenticação JWT para segurança.

## Tecnologias Utilizadas

- **NestJS**
- **TypeORM**
- **MySQL**
- **Swagger**
- **Passport JWT**
- **Docker**

## Instalação

Clone este repositório:

```bash
git clone https://github.com/seu-usuario/api-conversao-moedas.git
```
Acesse o diretório do projeto:

```bash
cd api-conversao-moedas
```

Instale as dependências:

```bash
npm install
```

## Configuração do Projeto

Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis:

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=senha
DATABASE_NAME=moedas
JWT_SECRET=your_secret_key
PORT=3000
```

## Execução
### Ambiente de Desenvolvimento
Para rodar o projeto no ambiente de desenvolvimento, use o comando:

```bash
npm run start:dev
```

### Ambiente de Produção
Para rodar o projeto no ambiente de produção, use o comando:

```bash
npm run start:prod
```

## Execução com Docker
### Construção da Imagem Docker
Para construir a imagem Docker, use o comando:

```bash
docker build -t api-conversao-moedas .
```

### Execução do Contêiner Docker
Para executar o contêiner, use o comando:

```bash
docker run -p 3000:3000 --env-file .env api-conversao-moedas
```

## Endpoints
### Autenticação
POST /auth/signup - Cadastra um novo usuário
POST /auth/login - Realiza o login e retorna um token JWT

### Moedas
GET /currency/list - Lista todas as moedas disponíveis
GET /currency/convert - Converte um valor entre moedas
Parâmetros: from, to, amount
POST /currency - Registra uma nova moeda
Parâmetros: code, rate

## Segurança
Todos os endpoints de moedas exigem autenticação via JWT. O token deve ser enviado no cabeçalho Authorization no formato:

```text
Authorization: Bearer <token>
```
## Documentação
A API possui documentação interativa gerada pelo Swagger. Para acessá-la, inicie o servidor e acesse:
http://localhost:3000/api

## Testes
Para rodar os testes unitários, use o comando:

```bash
npm run test
```

Para rodar os testes de cobertura, use o comando:

```bash
npm run test:cov
```

## Licença
Este projeto está sob a licença UNLICENSED.


