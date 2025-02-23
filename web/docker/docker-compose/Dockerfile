FROM node:20-alpine

WORKDIR /app

COPY package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

COPY . .

ENV DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgre

RUN npx prisma generate
RUN npm run build
 
EXPOSE 8080

CMD ["npm", "run", "dev:docker"]