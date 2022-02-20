FROM node:16.13.1-alpine

WORKDIR /client

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY tsconfig.json next.config.js next-env.d.ts ./

COPY src ./src

COPY public ./public

RUN yarn build

ENTRYPOINT [ "yarn", "start" ]