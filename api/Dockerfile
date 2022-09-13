FROM node:16.10-alpine
WORKDIR /usr/api
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
RUN npm install --force
RUN npx prisma generate
COPY . .
RUN npm run build