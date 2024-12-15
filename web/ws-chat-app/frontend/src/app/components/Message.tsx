"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {v4} from 'uuid'

export const Message = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
    const socketRef = useRef<WebSocket | null>(null);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [messages,setMessages] = useState<{userId:string;message:string;messageId:string}[]>([]);
    const [userId] = useState(() => v4()); 

  const sendMessage = useCallback(()=> {
    console.log("Message sent!");
  if(!socketRef.current || socketRef.current.readyState!==WebSocket.OPEN){
    console.log("WebSocket is not open");
    return;
  }
    
    if(inputRef.current){
    const message = inputRef.current.value.trim();
    if(message){
      const payload = JSON.stringify({
        type:'chat',
        payload:{userId,message,room:roomId},
      });
      console.log('payload:',payload)
     socketRef.current.send(payload);
     inputRef.current.value = ''
    }
  }
},[roomId,userId])

const init = useCallback(() => {
  if (!roomId) {
    alert("No Room ID Provided! Skipping WebSocket connection");
    return;
  }

  if (socketRef.current) {
    console.log("WebSocket already initialized.");
    return;
  }

  const ws = new WebSocket("ws://localhost:8080");
  socketRef.current = ws;

  ws.onopen = () => {
    console.log("WebSocket Opened: ", ws);
    const joinPayload = JSON.stringify({
      type: "join",
      payload: {
        roomId,
        userId,
      },
    });
    ws.send(joinPayload);
  };

  ws.onmessage = (ev) => {
    try {
      const data = JSON.parse(ev.data);
      console.log("Received data", data);
      setMessages((prev) => {
        if (prev.some((msg) => msg.messageId === data.messageId)) {
          return prev;
        }
        return [...prev, data];
      });
    } catch (error) {
      console.log("Error parsing incoming data", error);
    }
  };

  ws.onerror = () => alert("WebSocket connection error. Refresh and try again.");
  ws.onclose = () => alert("WebSocket connection closed. Refresh and try again.");
}, [roomId, userId]);

useEffect(() => {
  init();
  return () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.close();
    }
    socketRef.current = null;
  };
}, [init]);



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

