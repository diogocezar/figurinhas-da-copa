FROM node:16.10-alpine as build-step
WORKDIR /dist/src/app
COPY . .
RUN npm install --force
RUN npm run build
RUN npm run start:prod

# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /dist/src/app /usr/share/nginx/html
