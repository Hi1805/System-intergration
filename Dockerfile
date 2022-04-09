FROM node:14.18.2-alpine3.14 as BUILDER

WORKDIR /build

COPY package.json .
COPY yarn.lock .
COPY . .
RUN yarn install

ENV NODE_ENV=production
RUN YARN BUILD

CMD ["yarn", "start:prod"]