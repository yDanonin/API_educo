# API_educo
API do projeto TCC. O projeto é um site de educação onde alunos ajudam alunos com dúvidas.

o projeto foi construido usando no back-end uma API feita com Node.js e com o framework express, foi utilizado também o typeorm e o docker para a criação de container junto com postgres.

# Como testar

- antes de rodar o servidor utilize o comando ``npm install`` para baixar todos os pacotes e bibliotecas utilizados nessa API.

- quando baixado esse arquivo é possível executar o servidor com o comando ``yarn dev:server`` ou ``npm dev:server``

- não se esqueça de rodar a migration na sua maquina pois ainda não colocamos a API em um servidor porque ela ainda está em desenvolvimento.

- Para rodar a migration basta dar ``yarn typeorm migration:run`` ou ``npm typeorm migration:run``

- afim de testar as rotas pode-se utilizar softwares como o insomnia ou testar com o próprio front-end do EDUCO que se encontra no link: https://github.com/GitHubWithCjcnch/educo-project.git 

- E pronto, aproveite 🎉
