# Base image
FROM node:16.10-alpine

# Create app directory
WORKDIR /usr/src/api

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# Install app dependencies
RUN npm install --force

RUN npx prisma generate

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
# CMD [ "node", "dist/src/main.js" ]