  <a href="https://site.bagy.com.br/">
    <img alt="Desafio proposto pela Bagy" src="https://tempodeinovacao.com.br/wp-content/uploads/2020/04/Bagy.png">
  </a>
  
<p align="center">	
 <img alt="License" src="https://img.shields.io/badge/license-MIT-8257E5">  <img alt="Repository size" src="https://img.shields.io/github/repo-size/william-ribeiro/bagy?color=774DD6" > 
  <a href="https://github.com/william-ribeiro/bagy/commits/develop">  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/william-ribeiro/bagy?color=774DD6">
  </a> 
  <a href="https://github.com/william-ribeiro/bagy/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/william-ribeiro/bagy?color=8257E5&logo=github">
  </a>
     <a href="https://www.linkedin.com/in/william-ribeiro-0b5ab911a/">
      <img alt="William Ribeiro" src="https://img.shields.io/badge/-WilliamRibeiro-8257e5?style=flat&logo=Linkedin&logoColor=white" />
   </a>

</p>

<h4 align="center"> 
	🚧  Bagy  🚀 Concluído 🚀 🚧
</h4>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> • 
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> •  
 <a href="#-autor">Autor</a> • 
 <a href="#user-content--licença">Licença</a>
</p>

## 💻 Sobre o projeto

🚀 Bagy - é uma API Graphql em NodeJS, com sistemas de compras utilizando um banco de dados sqlite.

A API foi um desafio prosposto durante o processo seletivo da [Bagy](https://site.bagy.com.br/"), compondo a 3ª fase do processo, o Teste Técnico, com o objetivo de conhecer um pouco melhor o nível técnico dos candidatos.

---

## ⚙️ Funcionalidades

- [x] Cadastro básico de clientes
- [x] Cadastramento dos Produtos
- [x] Sistema de Pedidos
  - [x] Gerenciamento de Estoque
  - [x] Sistema de avisos via email

---

## ⚙️ Teste online

Clique no link abaixo para testar o backend hospedado no heroku.

<p align="center">
  <a href="https://bagy.herokuapp.com/graphql" target="_blank"><img src="https://img.icons8.com/color/2x/graphql.png" alt="Run API" height="60px" width="60px"></a>
</p>

---

## 🚀 Como executar o projeto

### Para usar a API você precisa ter o Docker instalado

https://docs.docker.com/get-docker/

```bash

# Clone este repositório
$ git clone git@github.com:william-ribeiro/bagy.git

# Acesse a pasta do projeto no terminal/cmd
$ cd bagy

# Rode  API via DOCKER
# irá instalar as dependências, executar as migrações e iniciar a API
$ yarn docker:start

# Teste a API
$ http://localhost:4000/graphql

# Para encerrar a API
$ yarn docker:stop


```

---

## 🛠 Tecnologias

Foi utilizado na aplicação as seguintes tecnologias

##### [](https://github.com/william-ribeiro/bagy#backend-nodejs--typescript)**Backend** ([NodeJS](https://nodejs.org/en/) + [TypeScript](https://www.typescriptlang.org/))

- **[Express](https://expressjs.com/)**
- **[Typeorm](https://typeorm.io/)**
- **[SQLite](https://github.com/mapbox/node-sqlite3)**
- **[Typegraphql](https://typegraphql.com/)**
- **[Nodemailer](https://nodemailer.com/about/)**
- **[ts-node](https://github.com/TypeStrong/ts-node)**
- **[dotENV](https://github.com/motdotla/dotenv)**

---

## 💪 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
   > Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](./CONTRIBUTING.md)

---

## 🦸 Autor

<a href="https://github.com/william-ribeiro/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/60985185?s=460&u=389f6878e2b972d3f66348a698c7ecfbbb245582&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>William Ribeiro</b></sub></a> <a href="https://blog.rocketseat.com.br/author/thiago/" title="AlunoRocketseat">🚀</a>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-William-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/william-ribeiro-0b5ab911a/)](https://www.linkedin.com/in/william-ribeiro-0b5ab911a/)
[![Gmail Badge](https://img.shields.io/badge/-sbrdigital15@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:sbrdigital15@gmail.com)](mailto:sbrdigital15@gmail.com)

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

---
