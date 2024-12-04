import { WebSocketServer } from "ws";
import WebSocket from "ws";

const wss = new WebSocketServer({port:8080});

wss.on("connection",function (socket){
  console.log("user connected");

  

  socket.on('message',(e)=>{
    try {
      const messageData = JSON.parse(e.toString());

    if (messageData.message==='exit'){
        socket.close();
    }
    else {
        wss.clients.forEach((client)=>{
          if(client.readyState===WebSocket.OPEN){
            client.send(JSON.stringify(messageData))
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
}
)