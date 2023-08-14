[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Educational purpose project "Mesto" backend from [Yandex Practicum](https://practicum.yandex.ru/) Web-developer course.

## Description 
This project is a part of building the backend for the project [Mesto](https://github.com/IrinaGarmaeva/react-mesto-auth.git).

## Directories

`/routes` — folder with routes files  
`/controllers` — folder with controllers files (users & cards)
`/models` — folder with schemas (users & cards) 
  
## Functionality

USER:
- Request/response to Create new user to database;
- Request/response to Update user's info (name and/or about) on database;
- Request/response to Update user's avatar on database;
- Request/response to Read and send ALL users as an JSON object;
- Request/response to Read and send ONE user as an JSON object;

CARD:
- Request/response to Create new card to a database;
- Request/response to Read and send ALL cards as an JSON object;
- Request/response to Delete and card from database;
- Request/response to Update card's like status: remove/add likes;

## Technologies 

- Node.js;
- Express
- MongoDB
- mongoose
- JavaScript:
  - CamelCase style;
  - Common JS modules;
  - Promise, asynchronous functions;

## Usage

Clone repository:
 
  `git clone git@github.com:IrinaGarmaeva/express-mesto-gha.git`

Install dependencies:

  `npm install`

Run app:

`npm run start` — start server   
`npm run dev` — start hot-reload server


