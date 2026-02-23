"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Phone, Mail } from "lucide-react";
import { toast } from "sonner";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const { data } = await supabase
      .from("bookings")
      .select("*, plots(plot_number, area_sqyds, price, projects(name, location))")
      .order("created_at", { ascending: false });
    if (data) setBookings(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string, plotId: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) {
      toast.error("Failed to update status");
    } else {
      if (status === "approved") {
        await supabase.from("plots").update({ status: "booked" }).eq("id", plotId);
      } else if (status === "rejected") {
        await supabase.from("plots").update({ status: "available" }).eq("id", plotId);
      }
      toast.success(`Booking ${status}`);
      fetchBookings();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <p className="text-gray-500">Manage plot booking requests</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Message</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Plot Details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Project</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400">Loading...</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400">No bookings yet</td></tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{booking.customer_name}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="h-3 w-3" />
                          {booking.customer_phone}
                        </div>
                        {booking.customer_email && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Mail className="h-3 w-3" />
                            {booking.customer_email}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-[200px] line-clamp-2 italic">
                          {booking.message || "-"}
                        </div>
                      </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{booking.plots?.plot_number}</div>
                      <div className="text-sm text-gray-500">{booking.plots?.area_sqyds} sq.yd</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{booking.plots?.projects?.name}</div>
                      <div className="text-sm text-gray-500">{booking.plots?.projects?.location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">₹{booking.plots?.price?.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        booking.status === "approved" ? "bg-emerald-100 text-emerald-700" :
                        booking.status === "pending" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {booking.status === "approved" && <CheckCircle className="h-3 w-3" />}
                        {booking.status === "pending" && <Clock className="h-3 w-3" />}
                        {booking.status === "rejected" && <XCircle className="h-3 w-3" />}
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {booking.status === "pending" && (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            onClick={() => updateStatus(booking.id, "approved", booking.plots?.id)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(booking.id, "rejected", booking.plots?.id)}
                            className="border-red-200 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
