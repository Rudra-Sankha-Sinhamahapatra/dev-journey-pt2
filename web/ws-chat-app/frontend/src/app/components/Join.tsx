"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Join() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  function handleJoinRoom() {
    if (!roomId.trim()) {
      alert("Please enter a room ID");
      return;
    }
    // Redirect to the chat page with the room ID
    router.push(`/chat?roomId=${roomId}`);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Join or Create a Room</h1>
      <div className="flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="p-3 text-sm rounded-lg shadow-lg text-gray-200 bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-600 border border-gray-700"
        />
        <button
          onClick={handleJoinRoom}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-500 transition border border-white"
        >
          Enter Room
        </button>
      </div>
    </div>
  );
}
