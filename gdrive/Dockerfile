FROM node:16.14.2-alpine

WORKDIR /app

COPY ./package.json ./tsconfig.json ./yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./src ./src

COPY ./public ./public

COPY ./tsconfig.json next.config.js next-env.d.ts ./

RUN yarn build

ENTRYPOINT [ "yarn", "start" ]
