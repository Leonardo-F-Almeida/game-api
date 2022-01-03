<h1 align="center">
  The Game API
</h1>

<p align="center">A sample API, using Nest.JS + Postgres</p>

---

## 💻 Description

This project is part of a challenge that the main goal is to create a REST api providing CRUD operations to fetch one or several games,it also have a cron that automatically remove the games having a release date older than 18 months and another one that apply a discount of 20% to all games having a release date between 12 and 18 months.

The application is separated into a few layers:

- Controller - responsible for receiving client requests
- Service - works as an intermediary, processing information and communicating with the Controller and the Repository
- Repository - communicates with the database (in this case, Postgres)

With this separation, it is possible to test the application more easily, besides making the maintainability of the code better.

## Prerequisites

To run the code, you need to have installed one of these options:

- [Node.js](https://nodejs.org/en/download/) + [Postgres](https://www.postgresql.org/)
- or [Docker Desktop](https://docs.docker.com/desktop/) for Mac / Windows
- or [Docker Engine](https://docs.docker.com/engine/) for Linux

## 🚀 Running the project

For this challenge I'm passing the walkthrough to work with docker only, it´s also possible to work with that locally without docker, but this is not the goal here.

### Docker

To run the project with docker(prod):

```bash
 docker-compose -f docker-compose.yml up --abort-on-container-exit --exit-code-from prod
```

So, there´s differents containers for prod and e2e tests, if you take a look I´m using the same postgres container for all of them, for the purpose of this challenge it´s not a problem, but if you use this as a example for a real project, be aware you will need differents postgres containers for each scenario.

## The API

After start the API, you can open `http://localhost:3000/api` and you will have the Swagger documentation.

## Test

The project was covered using Jest. You can run some of these commands below:

```bash
# unit tests
$ npm install
$ npm run test

# e2e tests
$ docker-compose -f docker-compose.e2e.yml up --abort-on-container-exit --exit-code-from dev

```

## Test by Postman

If you like Postman, I there is a file in `docs` for you :)

## Stay in touch

- [LinkedIn](https://www.linkedin.com/in/leonardo-f-almeida-developer/)
