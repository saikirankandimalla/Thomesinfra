"use client";

import React, { useEffect, useState } from "react";
import { MessageSquare, Clock, User, Shield, Search, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface Message {
  role: string;
  content: string;
  timestamp: string;
}

interface ChatLog {
  _id: string;
  sessionId: string;
  messages: Message[];
  userIp: string;
  userAgent: string;
  updatedAt: string;
}

export default function AdminChatsPage() {
  const [logs, setLogs] = useState<ChatLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState<ChatLog | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/admin/chats");
      const data = await res.json();
      if (Array.isArray(data)) {
        setLogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => 
    log.sessionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.messages.some(m => m.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Chat Logs</h1>
          <p className="text-gray-500">Monitor customer interactions with Yadadri Icon AI</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Logs List */}
        <div className="w-1/3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading conversations...</div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No conversations found</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filteredLogs.map((log) => (
                <button
                  key={log._id}
                  onClick={() => setSelectedLog(log)}
                  className={`w-full p-4 text-left transition-colors hover:bg-gray-50 flex items-start gap-4 ${
                    selectedLog?._id === log._id ? "bg-amber-50" : ""
                  }`}
                >
                  <div className={`mt-1 h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                    selectedLog?._id === log._id ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-500"
                  }`}>
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-gray-900 truncate">
                        {log.sessionId.slice(0, 8)}...
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {format(new Date(log.updatedAt), "HH:mm")}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {log.messages[log.messages.length - 1]?.content || "No messages"}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                        {log.messages.length} msgs
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {format(new Date(log.updatedAt), "MMM d")}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`h-4 w-4 mt-1 transition-transform ${
                    selectedLog?._id === log._id ? "translate-x-1 text-amber-500" : "text-gray-300"
                  }`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chat Detail */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
          {selectedLog ? (
            <>
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Session: {selectedLog.sessionId}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-[11px] text-gray-500">
                        <Shield className="h-3 w-3" />
                        {selectedLog.userIp}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-500">
                        <Clock className="h-3 w-3" />
                        Started: {format(new Date(selectedLog.updatedAt), "MMM d, HH:mm")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {selectedLog.messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "bg-amber-500 text-black font-medium rounded-tr-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {msg.role === "user" ? (
                          <User className="h-3 w-3" />
                        ) : (
                          <Shield className="h-3 w-3 text-amber-600" />
                        )}
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                          {msg.role}
                        </span>
                      </div>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-gray-200" />
              </div>
              <p>Select a conversation to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
