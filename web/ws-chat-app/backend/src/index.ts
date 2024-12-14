import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer({port:8080});

let users = 0;
interface User {
  socket:WebSocket;
  room:string;
}
let allSockets:User[] = [];
wss.on("connection",function (socket){
  socket.on('message',(e)=>{
    try {
      const messageData = JSON.parse(e.toString());
      if(messageData.type === 'join'){
        console.log('user joined room',messageData.payload.roomId)
        allSockets.push({
          socket:socket,
          room:messageData.payload.roomId
        })
      }
  
      if(messageData.type === 'chat'){
        console.log("User wants to chat")
        const currentUserRoom = allSockets.find((x)=> x.socket === socket)?.room;
        allSockets.forEach((x)=>{
          if(x.room === currentUserRoom){
            x.socket.send(messageData.payload.message);
          }
        })
      }
       
  } catch(error) {
    console.log("Invalid message format",error);
  }
  })
  socket.on('close',() => {
    console.log("User disconnected");
  })
  socket.on('disconnect',()=>{
    users = users - 1;
    allSockets = allSockets.filter(x=> x.socket!=socket)
  })
}
)