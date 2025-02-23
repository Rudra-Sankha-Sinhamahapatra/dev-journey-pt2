import express, { Request, Response } from 'express'
import prisma from './prisma';

const app = express();
const PORT = 8080;

app.get("/",async(req:Request,res:Response)=>{
    const user = await prisma.user.findMany();

    res.status(200).json({
        message:"Hello get",
        user
    })
    return
})

app.post("/",async(req:Request,res:Response)=>{
    const newUser = await prisma.user.create({
        data:{
            username:Math.random().toString(),
            password:Math.random().toString()
        }
    })
    res.status(200).json({
        message:"Hello post",
        newUser
    })
    return
})

app.listen(PORT,()=>{
    console.log(`Server firing at PORT ${PORT}`);
})