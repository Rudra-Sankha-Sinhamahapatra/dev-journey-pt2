import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer({port:8080});

let users = 0;
interface User {
  socket:WebSocket;
  room:string;
  userId:string;
}
let allSockets:User[] = [];
wss.on("connection",function (socket){
  socket.on('message',(e)=>{
    try {
      const messageData = JSON.parse(e.toString());
      console.log('message data:',messageData)
      if(messageData.type === 'join'){
        const existingUser = allSockets.find((x)=> x.userId === messageData.payload.userId && x.room === messageData.payload.room)
        // console.log('existing user: ',existingUser)
      if (!existingUser){
        users++;
        console.log('user connected #',users)
        console.log('user #',users,'joined room',messageData.payload.roomId)
        allSockets.push({
          socket:socket,
          room:messageData.payload.roomId,
          userId:messageData.payload.userId
        })
        // console.log('allsockets: ',allSockets)
      }  else {
        console.log(`User ${messageData.payload.userId} already in room ${messageData.payload.roomId}`);
      }
    }
  
      if(messageData.type === 'chat'){
        console.log("User wants to chat")
        const currentUserRoom = allSockets.find((x)=> x.socket === socket)?.room;
        const messageId = Date.now().toString();
        console.log('messageId: ',messageId)
        allSockets.forEach((x)=>{
          if(x.room === currentUserRoom && x.socket!=socket){
            x.socket.send(
              JSON.stringify({
                messageId,
                userId:messageData.payload.userId,
                message:messageData.payload.message,
                roomId:messageData.payload.roomId
              })
            );
          }
        })
      }
       
  } catch(error) {
    console.log("Invalid message format",error);
  }
  })
  socket.on('close',() => {
    console.log("User disconnected");
    users = users - 1;
    allSockets = allSockets.filter(x=> x.socket!=socket)
  })
  socket.on('disconnect',()=>{
    users = users - 1;
    allSockets = allSockets.filter(x=> x.socket!=socket)
  })
}
)
