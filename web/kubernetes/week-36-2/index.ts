import express from "express";

const app = express();

console.log(process.env.DB_URL);
console.log(process.env.PORT);

app.get("/", (req, res) => {
  res.send({
    dbUrl: process.env.DB_URL,
    port: process.env.PORT,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});