# DTA32 FGS API

## What is this?

Simple API for the DTA32 Flash Game Site project. Created using Node.js, Express, and MongoDB (as Database).

[Frontend Repo](https://github.com/DTA32/ofgs)

Reference: [Learn](https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/)

### Docker setup

For quick preview, image is available on docker hub and can be pulled by `docker pull dta32/ofgs-api:latest` then step 2, but it's based on main branch, so if there's code changes can do these

1. `docker build -t dta32/ofgs-api .`
1. `docker run -d -p {externalPort}:{portDefinedOnServerPort} -e DATABASE_URL={mongoUrl} -e SERVER_PORT={port} -e API_PREFIX={/anythingorcanbeemptytoo} dta32/ofgs-api:latest`

Simple deployment is also available by using docker compose on frontend repo
