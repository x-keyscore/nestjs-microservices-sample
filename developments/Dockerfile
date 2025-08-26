FROM node:22-alpine

WORKDIR /usr/src/workspace

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install
RUN npm install -g @nestjs/cli

COPY . .
