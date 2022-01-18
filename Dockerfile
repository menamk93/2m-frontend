FROM node:lts-alpine as build

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build


FROM httpd:2.4-alpine as web-build

COPY .htaccess /usr/local/apache2/htdocs/
COPY --from=build /usr/src/app/build /usr/local/apache2/htdocs
