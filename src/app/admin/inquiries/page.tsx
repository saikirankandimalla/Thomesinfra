"use client";

import React, { useEffect, useState } from "react";
import { supabase, Inquiry } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Phone, Mail, MessageSquare, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    const { data } = await supabase
      .from("inquiries")
      .select("*, projects(name)")
      .order("created_at", { ascending: false });
    if (data) setInquiries(data);
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase.from("inquiries").update({ status: "read" }).eq("id", id);
    if (!error) {
      toast.success("Marked as read");
      fetchInquiries();
    }
  };

  const deleteInquiry = async (id: string) => {
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (!error) {
      toast.success("Inquiry deleted");
      fetchInquiries();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
        <p className="text-gray-500">View and manage customer inquiries</p>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400">Loading...</div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400">No inquiries yet</div>
        ) : (
          inquiries.map((inquiry) => (
            <div key={inquiry.id} className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${
              inquiry.status === "new" ? "border-amber-500" : "border-gray-200"
            }`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      inquiry.status === "new" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {inquiry.status === "new" ? <><Clock className="h-3 w-3 inline mr-1" />New</> : <><CheckCircle className="h-3 w-3 inline mr-1" />Read</>}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(inquiry.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{inquiry.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {inquiry.phone}
                    </div>
                    {inquiry.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {inquiry.email}
                      </div>
                    )}
                    {inquiry.projects?.name && (
                      <div className="flex items-center gap-1 text-amber-600 font-semibold">
                        Interested in: {inquiry.projects.name}
                      </div>
                    )}
                  </div>
                  {inquiry.message && (
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5" />
                        <p className="text-gray-700">{inquiry.message}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {inquiry.status === "new" && (
                    <Button size="sm" onClick={() => markAsRead(inquiry.id)} className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark Read
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => deleteInquiry(inquiry.id)} className="text-red-600 border-red-200 hover:bg-red-50 rounded-lg">
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
