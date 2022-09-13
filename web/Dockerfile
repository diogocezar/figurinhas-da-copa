FROM node:16.10-alpine as build
WORKDIR /usr/src/web
RUN npm install -g @angular/cli
COPY ./package.json .
RUN npm install --force
COPY . .
RUN ng build

FROM nginx as runtime
COPY --from=build /usr/src/web/dist/web /usr/share/nginx/html
