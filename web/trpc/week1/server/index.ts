import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const todoInputType = z.object({
    title:z.string(),
    description:z.string(),
});

export const appRouter = router({
 createTodo: publicProcedure.input(todoInputType).mutation(async (opts) => {
    const {title,description} = opts.input;

    return {
        message: "Todo created successfully",
        id:1,
        title:title,
        description:description,
    }
 })
})

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router:appRouter,
});

server.listen(3000,()=>{
    console.log("Server is running on port 3000");
})