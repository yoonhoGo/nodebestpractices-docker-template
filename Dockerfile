FROM node:14.15.1-alpine as tsbuild

RUN mkdir /usr/app
WORKDIR /usr/app

COPY package*.json tsconfig.json ./

RUN npm ci
COPY src ./src
RUN npm run compile


FROM node:14.15.1-alpine
LABEL maintainer="yoonhoGo <lylisha@gmail.com>"

RUN mkdir /usr/app
WORKDIR /usr/app

RUN apk add --no-cache tini tzdata

COPY --from=tsbuild /usr/app/build/src .
COPY --from=tsbuild /usr/app/node_modules ./node_modules
COPY package.json tsconfig.json ./

RUN npm prune --production

USER node

EXPOSE 8080

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "-r", "dotenv/config", "index.js"]
