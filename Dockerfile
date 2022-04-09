FROM node:14.18.2-alpine3.14 as BUILDER

WORKDIR /build

COPY package.json .
COPY yarn.lock .
COPY . .
RUN yarn install
RUN yarn build

ENV NODE_ENV=production


CMD ["yarn", "start:prod"]