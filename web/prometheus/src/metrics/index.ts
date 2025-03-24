import express from "express";
import client from "prom-client";
const router = express.Router();

router.get("/metrics", async (req, res) => {
  const metrics = await client.register.metrics();
  res.set("Content-Type", client.register.contentType);
  res.send(metrics);
});

router.get("/user",async(req,res)=>{
    await new Promise((resolve)=>setTimeout(resolve,1000));
    res.send({
        name:"Rudra",
        age:25
    })
})
export default router;
