import type { AppRouter } from "../server";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

const trpc = createTRPCClient<AppRouter>({
    links:[
        httpBatchLink({
            url:"http://localhost:3000",
        })
    ]
});


async function main(){
    const result = await trpc.createTodo.mutate({
        title:"Learn TRPC",
        description:"Learn TRPC from scratch",
    });
    console.log(result);
}

main();