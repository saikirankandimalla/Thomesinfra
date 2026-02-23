"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LayoutDashboard, Building2, FileText, Users, Settings, 
  LogOut, ChevronRight, Plus, Eye, Edit, Trash2, Image as ImageIcon,
  Menu, X, Bell, Search, MessageSquare, Map
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { map } from "leaflet";
import { LayoutMappingTool } from "@/components/admin/LayoutMappingTool";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Building2 },
  { name: "Jumeirah Towers", href: "/admin/jumeirah", icon: Building2 },
  { name: "Bookings", href: "/admin/bookings", icon: FileText },
  { name: "Inquiries", href: "/admin/inquiries", icon: Users },
  { name: "AI Chat Logs", href: "/admin/chats", icon: MessageSquare },
  { name: "map3D", href: "/admin/map", icon: Map },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const loggedIn = localStorage.getItem("admin_logged_in");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === "admin123") {
      setIsLoggedIn(true);
      localStorage.setItem("admin_logged_in", "true");
      toast.success("Welcome to Admin Portal");
    } else {
      toast.error("Invalid password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    setIsLoggedIn(false);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Toaster position="top-center" />
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md animate-pulse">
          <div className="h-16 w-16 bg-gray-200 rounded-2xl mx-auto mb-4" />
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Toaster position="top-center" />
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="h-16 w-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-gray-500">THomes Infra Pvt. Ltd.</p>
          </div>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              className="h-14 rounded-xl"
            />
            <Button onClick={handleLogin} className="w-full h-14 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold">
              Login to Admin
            </Button>
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            Default password: admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-center" />
      
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen bg-[#0a1628] transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"}`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-white/10">
            {sidebarOpen && (
              <Link href="/" className="text-white font-bold text-xl">
                THomes Admin
              </Link>
            )}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/60 hover:text-white" title={sidebarOpen ? "Close sidebar" : "Open sidebar"}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors w-full"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search..." className="pl-10 w-64 rounded-full bg-gray-100 border-0" />
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full" type="button" title="Notifications">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              </button>
              <div className="h-10 w-10 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
