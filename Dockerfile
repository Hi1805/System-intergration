FROM nodelts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json" "./"]
RUN yarn
COPY . .
EXPOSE 4000
RUN chown -R node /usr/src/app
USER node
CMD ["yarn", "start:dev"]
