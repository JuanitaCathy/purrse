"use client";

import React, { useState } from "react";

// Cat image avatar
const catAvatar = "/orange.jpg"; // Path to your cat image (ensure it's placed in the public directory)

const Chatbot = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong! 😿" }]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Failed to fetch response. 😿" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto mt-2">
      {/* Chatbot Header */}
      <div className="flex items-center gap-2 mb-4">
        <img
          src={catAvatar}
          alt="Orange"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-white font-bold">Chat with Orange!</span>
      </div>

      {/* Chatbot Messages */}
      <div className="h-64 overflow-y-auto mb-4 border rounded-md bg-gray-900 p-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-2`}
          >
            {msg.role === "assistant" && (
              <img
                src={catAvatar}
                alt="Orange"
                className="w-8 h-8 rounded-full object-cover mr-2"
              />
            )}
            <div
              className={`p-2 rounded-lg ${msg.role === "user" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"} max-w-max`}
            >
              <p className={`text-sm font-medium ${msg.role === "user" ? "text-right" : "text-left"}`}>
                {msg.role === "user" ? "Me:" : "Orange:"}
              </p>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}

        {/* Loading Text */}
        {isLoading && (
          <div className="text-center text-sm text-gray-700">
            <p>Orange is catting... 🐾</p>
          </div>
        )}
      </div>

      {/* Input and Send Button */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask Orange about finance..."
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white bg-gray-800"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600 disabled:bg-gray-600"
          disabled={isLoading}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
