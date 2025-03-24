import { NextFunction, Request, Response } from "express";
import  client from "prom-client";
import { activeRequests } from "./activeRequests";

const requestClient = new client.Counter({
    name:"http_request_count",
    help:"Total number of http requests",
    labelNames:['method','route','status_code']
});

export const requestCountMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const startTime = Date.now();

    res.on("finish",()=> {
        const endTime = Date.now();
        console.log(`${req.method} ${req.url} ${res.statusCode} ${endTime - startTime}ms`);

        requestClient.inc({
            method:req.method,
            route:req.route?req.route.path:req.path,
            status_code:res.statusCode
        });
    });

    next();
}


export const cleanupMiddleware = (req:Request,res:Response,next:NextFunction) => {
    const startTime = Date.now();
    activeRequests.inc();

    res.on("finish",function() {
        const endTime = Date.now();
        console.log(`${req.method} ${req.url} ${res.statusCode} ${endTime - startTime}ms`);

        requestClient.inc({
            method:req.method,
            route:req.route?req.route.path:req.path,
            status_code:res.statusCode
        });
        activeRequests.dec();
    })
}