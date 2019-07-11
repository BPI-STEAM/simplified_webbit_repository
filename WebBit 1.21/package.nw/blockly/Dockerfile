FROM node:8.9.3

WORKDIR /src
ADD . /src

ARG env=production

RUN apt-get update && apt-get install -y vim

RUN NODE_ENV=production npm i && npm i -g bower

RUN bower install --allow-root

RUN NODE_ENV=$env npm run build && rm -rf ./src

EXPOSE 8080

ENV NODE_ENV $env
CMD ["npm", "start"]
