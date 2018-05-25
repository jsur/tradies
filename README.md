## What does this app do

The app exposes a small API to create and view jobs, and to mark existing tradies as assigned or hired to individual jobs.

The endpoint details can be viewed from the API documentation, see part "API documentation" to generate the docs.

## Technologies

- Server: Node.js 8.11.1
- MongoDB 3.4.5
- Framework: Express 4.16.3
- Logging: Bunyan 1.8.12
- ORM: Mongoose 5.1.1
- Linter: Eslint 4.19.1
- Apidocs: apidoc 0.17.6
- Tests: Mocha 5.2.0 / Chai 4.1.2

## Why were the technologies chosen

Node and Express were chosen as it is straightforward to create a small API like this with them. It is also relatively easy to find knowledgeable people to continue building the app in the future, as Javascript and Node.js are very popular among developers.

Tests are done with Mocha and Chai to provide a peace of mind for the developer and a clear documentation on what the API should do on a high level.

Apidoc was used to generate a documentation for API consumers, which can be easily served as an independent page from any web server.

## Installing / running the app

1. Get `.env` file from project creator
2. Run mongodb on your machine
3. `npm install`
4. `npm start`

2 jobs and 2 tradies will be seeded to the db on each restart to help in trying out the API.

## API documentation

1. Run `npm run docs`
2. open apidoc/index.html
3. Choose `show up to version 0.1.0` from top right corner