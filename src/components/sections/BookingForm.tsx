"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase, Plot } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Send, Phone, User, Mail, MessageSquare } from "lucide-react";

interface BookingFormProps {
  plot: Plot;
  onSuccess: () => void;
  onCancel: () => void;
}

export function BookingForm({ plot, onSuccess, onCancel }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("bookings").insert([{
        plot_id: plot.id,
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phone,
        message: data.message,
        status: "pending"
      }]);

      if (error) throw error;

      toast.success("Booking enquiry sent successfully!");
      reset();
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 mb-6">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-black text-amber-900 text-sm">Booking Enquiry</h4>
          <span className="text-xs font-bold text-amber-600 bg-white px-2 py-0.5 rounded-full shadow-sm">
            Plot #{plot.plot_number}
          </span>
        </div>
        <p className="text-amber-800/70 text-[10px] font-bold uppercase tracking-wider">
          {plot.area_sqyds} sq.yds • {plot.facing} Facing • ₹{plot.price?.toLocaleString()}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              {...register("name", { required: true })}
              placeholder="John Doe"
              className="h-12 pl-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-all font-bold"
            />
          </div>
          {errors.name && <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">Name is required</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                placeholder="john@example.com"
                className="h-12 pl-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-all font-bold"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                {...register("phone", { required: true })}
                placeholder="+91 XXXXX XXXXX"
                className="h-12 pl-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-all font-bold"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Message (Optional)</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
            <Textarea 
              {...register("message")}
              placeholder="I'm interested in this plot..."
              className="min-h-[100px] pl-12 pt-4 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-all font-bold resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="flex-1 h-14 rounded-2xl font-black text-xs uppercase tracking-widest border-2"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
            className="flex-[2] h-14 rounded-2xl bg-amber-500 hover:bg-amber-600 text-black font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-500/20"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Enquiry
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
