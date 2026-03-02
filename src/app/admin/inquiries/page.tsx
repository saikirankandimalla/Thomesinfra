"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Phone, Mail, MessageSquare, Trash2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new" | "read">("all");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/inquiry");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      // API may return array directly or { inquiries: [] }
      setInquiries(Array.isArray(data) ? data : data.inquiries ?? []);
    } catch (err) {
      console.error("[inquiries] fetch error:", err);
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  const getId = (doc: any) => doc._id ?? doc.id ?? "";

  const markAsRead = async (doc: any) => {
    const id = getId(doc);
    try {
      const res = await fetch(`/api/inquiry/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "read" }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Marked as read");
      setInquiries((prev) =>
        prev.map((i) => (getId(i) === id ? { ...i, status: "read" } : i))
      );
    } catch {
      toast.error("Failed to update inquiry");
    }
  };

  const deleteInquiry = async (doc: any) => {
    const id = getId(doc);
    try {
      const res = await fetch(`/api/inquiry/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      toast.success("Inquiry deleted");
      setInquiries((prev) => prev.filter((i) => getId(i) !== id));
    } catch {
      toast.error("Failed to delete inquiry");
    }
  };

  const filtered = inquiries.filter((i) => {
    if (filter === "all") return true;
    return i.status === filter;
  });

  const newCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
          <p className="text-gray-500">View and manage customer inquiries</p>
        </div>
        <Button
          variant="outline"
          onClick={fetchInquiries}
          className="flex items-center gap-2 rounded-xl"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["all", "new", "read"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-colors ${
              filter === tab
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {tab}
            {tab === "new" && newCount > 0 && (
              <span className="ml-2 bg-white text-amber-600 text-xs font-black px-1.5 py-0.5 rounded-full">
                {newCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="grid gap-4">
        {loading ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400">
            <div className="h-8 w-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading inquiries...
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400">
            {filter === "all" ? "No inquiries yet" : `No ${filter} inquiries`}
          </div>
        ) : (
          filtered.map((inquiry) => (
            <div
              key={getId(inquiry)}
              className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 transition-all ${
                inquiry.status === "new" ? "border-amber-500" : "border-gray-200"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Status + date */}
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        inquiry.status === "new"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {inquiry.status === "new" ? (
                        <><Clock className="h-3 w-3" />New</>
                      ) : (
                        <><CheckCircle className="h-3 w-3" />Read</>
                      )}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(inquiry.createdAt ?? inquiry.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{inquiry.name}</h3>

                  {/* Contact info */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    {inquiry.phone && (
                      <a
                        href={`tel:${inquiry.phone}`}
                        className="flex items-center gap-1 hover:text-amber-600 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        {inquiry.phone}
                      </a>
                    )}
                    {inquiry.email && (
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="flex items-center gap-1 hover:text-amber-600 transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        {inquiry.email}
                      </a>
                    )}
                    {inquiry.project && (
                      <div className="flex items-center gap-1 text-amber-600 font-semibold">
                        Interested in: {inquiry.project}
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  {inquiry.message && (
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 text-sm">{inquiry.message}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  {inquiry.status === "new" && (
                    <Button
                      size="sm"
                      onClick={() => markAsRead(inquiry)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark Read
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteInquiry(inquiry)}
                    className="text-red-600 border-red-200 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}