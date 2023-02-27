

FROM node:16.14.2-alpine as build

WORKDIR /app/frontend
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm ci --silent
COPY ./frontend/ ./
RUN npm run build

FROM nginx
ADD ./.envs/cert.pem /etc/ssl/certs/cert.pem
ADD ./.envs/key.pem /etc/ssl/certs/key.pem
COPY --from=build /app/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]