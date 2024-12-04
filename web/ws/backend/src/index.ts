import { WebSocketServer } from "ws";
import WebSocket from "ws";

const wss = new WebSocketServer({port:8080});

wss.on("connection",function (socket){
  console.log("user connected");

  

  socket.on('message',(e)=>{
    if (e.toString()==='exit'){
        socket.close();
    }
    else {
        socket.send('pong');
    }
  })
}
)