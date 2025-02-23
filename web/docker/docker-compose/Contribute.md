## Manual Installation
  - Install Node.js Locally
  - Clone the repo
  - Install Dependencies (npm install)
  - Start the DB Locally
    - docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
   - Go to neon.tech and get your postgres db yourself
   - Change your .env file and update your db credentials
   - npx prisma mirgate
   - npx prisma generate
   - npm run build
   - npm start

## Docker Installation
  - Install Docker
  - Start Postgres
      - docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
  - Build the image - `docker build -t user-proj .`
  - Start the image - `docker run -p 3000:3000 user-proj`

## Docker Compose Installation steps
  - Install docker,docker-compose
  - Run `docker-compose up`