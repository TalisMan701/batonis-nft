# dockerfile for node.js microservice in "server" folder with main app.ts file and 8000 port
FROM node:14.17.0-alpine3.13
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "npm", "start" ]
