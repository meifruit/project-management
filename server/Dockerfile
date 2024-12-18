# Backend Dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY . .
RUN npm install
# Prisma setup and database seed
RUN npx prisma generate

# Run migration and seed before starting the server
CMD ["bash", "-c", "npx prisma migrate dev --name init && npm run dev"]
