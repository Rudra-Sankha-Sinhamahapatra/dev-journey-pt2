"use client";

import { useEffect, useRef, useState } from "react";

export const Message = () => {
    const [socket,setSocket] = useState<WebSocket | null>(null);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

  function sendMessage() {
    console.log("Message sent!");
    if(!socket) {
        return;
    }
    
    const message = inputRef.current?.value;
    if(message){
     socket.send(message)
    }
  }

  useEffect(()=>{
  const ws = new WebSocket("ws://localhost:8080");
   setSocket(ws);
  ws.onmessage = (ev) => {
   alert(ev.data)
   console.log(ev.data)
  }

  },[])
  return (
    <div className="flex w-full items-end gap-4">
      <textarea
        ref={inputRef}
        className="flex-1 h-20 p-3 text-sm rounded-lg shadow-lg text-gray-200 bg-transparent placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-600  border border-white resize-none"
        placeholder="Type your message..."
      />
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-500 transition border border-white"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};
