FROM node:18-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY main.js main.js

RUN npm install

CMD [ "node", "main.js" ]

