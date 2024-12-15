# Frontend Dockerfile
FROM node:18 AS build


COPY package*.json ./
RUN npm install

COPY . .

# RUN npm run build

# Serve using nginx

CMD ["npm run dev"]
