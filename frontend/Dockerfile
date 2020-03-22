# STAGE 1: build
FROM node:erbium as node

# change working directory
WORKDIR /usr/src/app

# copy package.json & package-lock.json (if available)
COPY package*.json ./

# install dependencies
RUN npm install

# copy app
COPY . .

ARG environment=development

# build app
RUN npm run build -- --verbose --configuration=$environment


# STAGE 2: run
FROM nginx:1.16-alpine

RUN apk add --no-cache bash

COPY --from=node /usr/src/app/dist/ihm-webapp /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
