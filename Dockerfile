# Thanks to Copilot chatbot for generating this Dockerfile for me :D
# Fetching the minified node image on apline linux
FROM node:slim

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY package.json /app
RUN npm install

# Copying all the files in our project
COPY . /app

# Starting our application
CMD [ "node", "index.js" ]

# Exposing server port
EXPOSE 3000