"use client";

import {GlowEffect } from "./Glow";
import { Message } from "./Message";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col items-center p-6 sm:p-12">
      <GlowEffect/>
        <header className="text-center py-4 border-b border-gray-700 mb-6">
          <h1 className="text-3xl font-bold text-white">Dark Chat</h1>
          <p className="text-gray-400">Start chatting in real-time</p>
        </header>

      <main className="w-full max-w-3xl flex flex-col gap-4 flex-grow bg-transparent p-6 rounded-lg shadow-lg">
        <div className="flex-grow overflow-y-auto flex flex-col gap-3">
          <div className="self-start bg-gray-700 px-4 py-2 rounded-lg shadow">
            Hello! 👋
          </div>
          <div className="self-end bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
            Hi there! How are you?
          </div>
        </div>
        <Message />
      </main>

      <footer className="w-full max-w-3xl text-center py-4 text-gray-500 text-sm border-t border-gray-700 mt-6">
        Powered by Next.js & Tailwind CSS
      </footer>
    </div>
  );
}
