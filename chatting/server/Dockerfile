FROM node:16.13.1-alpine

WORKDIR /server

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY tsconfig.json ./

COPY config ./config

COPY utils ./utils

COPY src ./src

ENTRYPOINT [ "yarn", "start" ]