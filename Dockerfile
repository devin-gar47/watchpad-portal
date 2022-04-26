FROM node:17.9.0-alpine as build

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx:1.21.6-alpine
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'