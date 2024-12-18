# Frontend Dockerfile
FROM node:18 AS build

WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build

CMD ["npm", "run", "dev"]
