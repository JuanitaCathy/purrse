"use client";

import React, { useState } from "react";
import Chatbot from "./Chatbot";  // Import the Chatbot component
import { Button } from "@/components/ui/button";

const ChatbotWithToggle = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Function to toggle the chatbot visibility
  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Chatbot Toggle Button */}
      <Button
        variant="outline"
        onClick={toggleChat}
        className="w-16 h-16 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-all"
      >
        {isChatOpen ? "❌" : "🗨️"}
      </Button>

      {/* Conditionally render Chatbot */}
      {isChatOpen && (
        <div className="w-96 p-6 bg-gray-900 rounded-lg shadow-xl mt-4">
          <Chatbot />
        </div>
      )}
    </div>
  );
};

export default ChatbotWithToggle;
