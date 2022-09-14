FROM node:16.10-alpine as build
WORKDIR /usr/web
RUN npm install -g @angular/cli
COPY ./package.json .
RUN npm cache clean --force
RUN npm install --force
COPY . .
RUN ng build --configuration=production

FROM nginx:latest AS ngi
# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder
COPY --from=build /usr/web/dist/web /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# Exposing a port, here it means that inside the container
# the app will be using Port 80 while running
EXPOSE 80
