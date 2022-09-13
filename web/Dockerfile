FROM node:16.10-alpine
WORKDIR /dist/src/app
COPY . .
RUN npm install --force
RUN npm run build
