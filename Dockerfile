FROM node:17.9.0-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

COPY ./ ./

CMD [ "npm", "start" ]