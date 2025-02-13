import { createClient } from "redis";
import { WebSocketServer,WebSocket } from "ws";
import { REDIS_URL } from "./config";

const wss = new WebSocketServer({port:8080});
const pubClient = createClient({
  url:REDIS_URL
});
const subClient = createClient({
  url: REDIS_URL
});

pubClient.on('error',(err)=> console.error("Redis publisher error: ",err));
subClient.on('error',(err)=> console.error("Redis Subscriber Error: ",err));

pubClient.on('connect', () => {
  console.log('Redis Publisher Client Connected');
});

subClient.on('connect', () => {
  console.log('Redis Subscriber Client Connected');
});

pubClient.on('disconnect', () => {
  console.log('Redis Publisher Client Disconnected');
});

subClient.on('disconnect', () => {
  console.log('Redis Subscriber Client Disconnected');
});

(async ()=> {
await pubClient.connect();
await subClient.connect();

})().catch(console.error)

let users = 0;
interface User {
  socket:WebSocket;
  room:string;
  userId:string;
}

interface ChatMessage {
 messageId : string;
 userId:string;
 message:string;
 roomId:string;
 timestamp?:number;
}

let allSockets:User[] = [];

wss.on("connection",function (socket){
  socket.on('message',async (e)=>{
    try {
      const messageData = JSON.parse(e.toString());
      console.log('message data:',messageData);

      if(messageData.type === 'join'){
        users++;
        console.log('user connected #',users)
        console.log('user #',users,'joined room',messageData.payload.roomId)

        allSockets.push({
          socket:socket,
          room:messageData.payload.roomId,
          userId:messageData.payload.userId
        })

        await subClient.subscribe(`chat:${messageData.payload.roomId}`,(message) => {
          const chatMessage = JSON.parse(message) as ChatMessage;
          
          allSockets.forEach((user)=> {
            if(user.room === messageData.payload.roomId) {
              user.socket.send(JSON.stringify(chatMessage));
            }
          });
        });

        await pubClient.publish(
          `chat:${messageData.payload.roomId}:join`,
          JSON.stringify({
            userId: messageData.payload.userId,
            roomId: messageData.payload.roomId,
            timestamp: Date.now()
          })
        );
    }
  
      if(messageData.type === 'chat'){
        console.log("User wants to chat")
        const currentUserRoom = allSockets.find((x)=> x.socket === socket)?.room;

        if(currentUserRoom && pubClient.isOpen) {
          const chatMessage: ChatMessage = {
            messageId:Date.now().toString(),
            userId: messageData.payload.userId,
            message: messageData.payload.message,
            roomId: messageData.payload.roomId,
            timestamp: Date.now()
          };

          await pubClient.publish(
            `chat:${currentUserRoom}`,
            JSON.stringify(chatMessage)
          );
        }
      }
       
  } catch(error) {
    console.log("Invalid message format",error);
  }
  })
  socket.on('close',async() => {
    console.log("User disconnected");
    const user = allSockets.find(x => x.socket === socket);
    if(user && subClient.isOpen) {
      await subClient.unsubscribe(`chat:${user.room}`);
    }
    users = users - 1;
    allSockets = allSockets.filter(x=> x.socket!=socket)
  })
  socket.on('disconnect',async()=>{
    const user = allSockets.find(x => x.socket === socket);
    if(user && subClient.isOpen) {
      await subClient.unsubscribe(`chat:${user.room}`);
    }
    users = users - 1;
    allSockets = allSockets.filter(x=> x.socket!=socket)
  })
});

process.on("SIGINT",async () => {
  try {
    await Promise.all([
      pubClient.quit(),
      subClient.quit()
    ]);
  } catch (error) {
    console.error("ERROR DURING CLEANUP: ",error);
    process.exit(1);
  }
})
