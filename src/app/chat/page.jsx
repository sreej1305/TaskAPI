"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  MessageCircle,
  Loader2,
} from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your TaskAPI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hi there! How can I assist you with TaskAPI today? 😊";
    } else if (lowerMessage.includes("task")) {
      return "You can create, update, and delete tasks using our REST API. Would you like to know more about any specific operation?";
    } else if (
      lowerMessage.includes("api") ||
      lowerMessage.includes("endpoint")
    ) {
      return "We have endpoints for authentication, task management, and admin operations. Check out /docs for the complete API reference!";
    } else if (lowerMessage.includes("help")) {
      return "I can help you with:\n• Creating and managing tasks\n• Understanding our API endpoints\n• Authentication & authorization\n• Admin features\n\nWhat would you like to know more about?";
    } else {
      return "That's interesting! Feel free to ask me about tasks, API endpoints, or authentication. I'm here to help! ✨";
    }
  };

  const quickActions = [
    { icon: "📝", text: "Create a task", color: "bg-[#FFF9C8]" },
    { icon: "📚", text: "View API docs", color: "bg-[#C6EED6]" },
    { icon: "🔐", text: "Learn about auth", color: "bg-[#B3E1F8]" },
    { icon: "⚙️", text: "Admin features", color: "bg-[#E6CBF7]" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFB8D9] via-[#FFF9C8] to-[#E6CBF7]">
      {/* Header */}
      <header className="border-b-2 border-white/30 bg-white/80 backdrop-blur-md shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="group flex items-center gap-3 transition-transform hover:scale-105">
              <div className="rounded-2xl bg-gradient-to-br from-[#FFB8D9] to-[#E6CBF7] p-3 shadow-xl transition-all group-hover:shadow-2xl group-hover:rotate-12">
                <Bot className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-[#FFB8D9] via-[#B3E1F8] to-[#E6CBF7] bg-clip-text text-2xl font-black text-transparent">
                  TaskAPI Assistant
                </h1>
                <p className="text-xs font-semibold text-gray-600">
                  Always here to help ✨
                </p>
              </div>
            </div>
            <a
              href="/"
              className="rounded-xl border-2 border-[#FFB8D9] bg-white px-6 py-2.5 text-sm font-bold text-[#FFB8D9] shadow-md transition-all hover:scale-105 hover:bg-[#FFB8D9] hover:text-white hover:shadow-lg"
            >
              Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Main Chat Container */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-3xl border-2 border-white/40 bg-white/90 backdrop-blur-md shadow-2xl">
          {/* Chat Messages */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex items-end gap-3 animate-slide-in ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-2xl shadow-lg ${
                    message.sender === "user"
                      ? "bg-gradient-to-br from-[#B3E1F8] to-[#C6EED6]"
                      : "bg-gradient-to-br from-[#FFB8D9] to-[#E6CBF7]"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="h-5 w-5 text-white" />
                  ) : (
                    <Bot className="h-5 w-5 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[70%] rounded-2xl px-5 py-3 shadow-md transition-all hover:shadow-lg ${
                    message.sender === "user"
                      ? "bg-gradient-to-br from-[#B3E1F8] to-[#C6EED6] text-gray-800"
                      : "bg-gradient-to-br from-[#FFF9C8] to-white border-2 border-[#FFF9C8] text-gray-800"
                  }`}
                >
                  <p className="text-sm font-medium whitespace-pre-line">
                    {message.text}
                  </p>
                  <p className="mt-1 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-3 animate-pulse">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFB8D9] to-[#E6CBF7] shadow-lg">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-[#FFF9C8] to-white border-2 border-[#FFF9C8] px-5 py-3 shadow-md">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div
                      className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="border-t-2 border-gray-100 px-6 py-4">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#FFB8D9]" />
              <p className="text-xs font-bold text-gray-600">Quick Actions</p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(action.text)}
                  className={`group flex items-center gap-2 rounded-xl ${action.color} border-2 border-white/50 px-4 py-3 shadow-md transition-all hover:scale-105 hover:shadow-lg`}
                >
                  <span className="text-xl">{action.icon}</span>
                  <span className="text-xs font-bold text-gray-700">
                    {action.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <div className="border-t-2 border-gray-100 p-6">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-2xl border-2 border-[#C6EED6] bg-white px-6 py-4 text-sm font-medium text-gray-800 placeholder-gray-400 shadow-inner transition-all focus:border-[#B3E1F8] focus:outline-none focus:ring-4 focus:ring-[#B3E1F8]/30"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="group flex items-center gap-2 rounded-2xl bg-gradient-to-br from-[#FFB8D9] to-[#E6CBF7] px-8 py-4 font-bold text-white shadow-xl transition-all hover:scale-110 hover:shadow-2xl disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                <span className="hidden md:inline">Send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Powered By Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm border-2 border-white/50 px-6 py-3 shadow-lg">
            <MessageCircle className="h-5 w-5 text-[#FFB8D9]" />
            <span className="text-sm font-bold bg-gradient-to-r from-[#FFB8D9] to-[#E6CBF7] bg-clip-text text-transparent">
              Powered by TaskAPI Intelligence
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
