"use client";

import { useEffect, useRef, useState } from "react";
import {v4} from 'uuid'

export const Message = () => {
    const [socket,setSocket] = useState<WebSocket | null>(null);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [messages,setMessages] = useState<{userId:string;message:string}[]>([]);
    const [userId] = useState(() => v4()); 

  function sendMessage() {
    console.log("Message sent!");
    if(!socket) {
        return;
    }
    
    if(inputRef.current){
    const message = inputRef.current.value.trim();
    if(message){
      const payload = JSON.stringify({userId,message});
      console.log('payload:',payload)
     socket.send(payload);
     inputRef.current.value = ''
    }
  }
}

  useEffect(()=>{
  const ws = new WebSocket("ws://localhost:8080");
   setSocket(ws);
  ws.onmessage = (ev) => {
    try {
    const data = JSON.parse(ev.data);
    console.log('Received data',data);
   setMessages((prev)=>[...prev,data]);
   console.log('ev.data: ',ev.data);
    } catch(error) {
      console.log("Error parsing incoming data",error);
    }
  }

  ws.onclose = () => {
    console.log("Web socket connection closed");
    alert("web socket connection closed,Refresh to start a fresh chart");
  }

  ws.onerror = () => {
    console.log("Web socket connection error");
    alert("web socket connection error,refresh and try again");
  }

  return () => {
    ws.close();
  }
  },[])
  return (
    <>
    <div className="flex-grow overflow-y-auto flex flex-col gap-3">
      {messages.map((message,id)=>(
          <div key={id} className={`px-4 py-2 rounded-lg shadow ${message.userId===userId?"self-end bg-blue-600 text-white":"self-start bg-gray-700"}`}>
          {message.message}
        </div>
      ))}
  </div>
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
    </>
  );
};
