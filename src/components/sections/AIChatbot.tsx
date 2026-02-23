"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { MessageSquare, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hi! I'm your Yadadri Icon assistant. How can I help you today with our real estate projects?",
      },
    ],
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {!isOpen && (
          <Button
            onClick={toggleChat}
            className="h-14 w-14 rounded-full bg-amber-600 hover:bg-amber-700 shadow-2xl transition-all duration-300 group"
          >
            <MessageSquare className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
              1
            </span>
          </Button>
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "80px" : "500px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={cn(
              "fixed bottom-6 right-6 z-50 w-[380px] bg-white rounded-2xl shadow-2xl border border-amber-100 overflow-hidden flex flex-col transition-all duration-300",
              isMinimized && "h-20"
            )}
          >
            {/* Header */}
            <div className="bg-amber-600 p-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Yadadri Icon AI</h3>
                  <p className="text-[10px] text-amber-100 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                    Always active
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/10"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/10"
                  onClick={toggleChat}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-hidden bg-amber-50/30">
                  <ScrollArea className="h-full p-4" ref={scrollRef}>
                    <div className="space-y-4">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={cn(
                            "flex gap-3 max-w-[85%]",
                            m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                          )}
                        >
                          <div className={cn(
                            "shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white",
                            m.role === "user" ? "bg-amber-500" : "bg-zinc-800"
                          )}>
                            {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                          </div>
                          <div
                            className={cn(
                              "p-3 rounded-2xl text-sm shadow-sm",
                              m.role === "user"
                                ? "bg-amber-600 text-white rounded-tr-none"
                                : "bg-white text-zinc-800 border border-amber-100 rounded-tl-none"
                            )}
                          >
                            {m.content}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex gap-3 max-w-[85%]">
                          <div className="shrink-0 h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-white">
                            <Bot className="h-4 w-4" />
                          </div>
                          <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-amber-100 shadow-sm">
                            <div className="flex gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce" />
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                            </div>
                          </div>
                        </div>
                      )}
                      {error && (
                        <div className="text-center text-[10px] text-red-500 bg-red-50 p-2 rounded-lg">
                          Something went wrong. Please try again.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-amber-100 bg-white shrink-0">
                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-2"
                  >
                    <Input
                      placeholder="Ask about plots, pricing, or locations..."
                      value={input}
                      onChange={handleInputChange}
                      className="flex-1 bg-amber-50/50 border-amber-100 focus-visible:ring-amber-500 h-10"
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="bg-amber-600 hover:bg-amber-700 text-white h-10 w-10 p-0 rounded-full"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                  <p className="text-[10px] text-zinc-400 text-center mt-2">
                    Powered by Yadadri Icon AI
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
