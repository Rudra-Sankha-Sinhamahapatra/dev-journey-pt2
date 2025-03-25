import express from "express";
import { middleware } from "./middleware";
import metricsRouter  from "./metrics/index";
import { cleanupMiddleware, requestCountMiddleware } from "./metrics/requestCount";
const app = express();

app.use(middleware);
app.use(requestCountMiddleware);
app.use(cleanupMiddleware)

app.use("/api/v1",metricsRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
