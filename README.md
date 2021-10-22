# API_educo
Undergraduate thesis project API. The project is an education website where students help students with questions.

the project was built using in the back-end an API made with Node.js and with the express framework, it was also used the typeorm and the docker for the creation of the container along with postgres.

The project is still under development!!!

# How to test

- before running the server use the ``npm install`` command to download all packages and libraries used in this API.

- once this file is downloaded you can run the server with the command ``yarn dev:server`` or ``npm dev:server``

- don't forget to run the migration on your machine as we haven't put the API on a server yet because it's still under development.

- To run the migration just give ``yarn typeorm migration:run`` or ``npm run typeorm migration:run``

- in order to test the routes, you can use software such as insomnia or test it with the EDUCO front-end that you can find at the link: https://github.com/GitHubWithCjcnch/educo-project.git

- And that's it, enjoy 🎉
