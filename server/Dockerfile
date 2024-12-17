# Backend Dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Prisma setup and database seed
RUN npx prisma generate

EXPOSE ${PORT}

# Run migration and seed before starting the server
CMD ["bash", "-c", "npx prisma migrate dev --name init && npm run seed && npm run dev"]
