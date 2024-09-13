# DTA32 FGS API

## What is this?

Simple API for the DTA32 Flash Game Site project. Created using Node.js, Express, and MongoDB (as Database).

[Frontend Repo](https://github.com/DTA32/ofgs)

Reference: [Learn](https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/)

### Docker setup

To setup docker image and run alongside with docker-compose in frontend

1. Setup .env accordingly (`cp .env.example .env` and config, just use 3000 as SERVER_PORT)
1. `docker build -t dfgs-api .`
