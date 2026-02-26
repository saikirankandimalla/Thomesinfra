"use client";
import React from "react";
import { Building2, FileText, Users, TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = React.useState({
    totalProjects: 0,
    ongoingProjects: 0,
    pendigInquiries: 0,
    newInquiries: 0,
  });
  const [recentBookings, setRecentBookings] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Projects — existing GET /api/projects
      const projectsRes = await fetch("/api/projects");
      const projects: any[] = projectsRes.ok ? await projectsRes.json() : [];

      // Bookings — needs GET /api/bookings route (see note below)
      const bookingsRes = await fetch("/api/inquiry?status=pending");
      const bookings: any[] = bookingsRes.ok ? await bookingsRes.json() : [];

      // Inquiries — needs GET support added to /api/inquiry (see note below)
      const inquiriesRes = await fetch("/api/inquiry?status=new");
      const inquiries: any[] = inquiriesRes.ok ? await inquiriesRes.json() : [];

      setStats({
        totalProjects: projects.length,
        ongoingProjects: projects.filter((p) => p.status === "ongoing").length,
        pendigInquiries: bookings.filter((b) => b.status === "pending").length,
        newInquiries: inquiries.length,
      });

      // 5 most recent bookings
      const sorted = [...bookings].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setRecentBookings(sorted.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: "Total Projects",   value: stats.totalProjects,   icon: Building2,  color: "bg-blue-500"    },
    { label: "Ongoing Projects", value: stats.ongoingProjects, icon: TrendingUp, color: "bg-emerald-500" },
    { label: "Pending Bookings", value: stats.pendigInquiries, icon: FileText,   color: "bg-amber-500"   },
    { label: "New Inquiries",    value: stats.newInquiries,    icon: Users,      color: "bg-purple-500"  },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome to THomes Infra Admin Portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`h-12 w-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{loading ? "-" : stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-amber-600 text-sm font-semibold flex items-center gap-1 hover:underline">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8 text-gray-400">Loading...</div>
            ) : recentBookings.length === 0 ? (
              <div className="text-center py-8 text-gray-400">No bookings yet</div>
            ) : (
              recentBookings.map((booking) => (
                <div
                  key={booking._id ?? booking.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div>
                    <div className="font-semibold text-gray-900">{booking.customer_name ?? booking.name}</div>
                    <div className="text-sm text-gray-500">
                      {booking.plot_number}{booking.project_name ? ` — ${booking.project_name}` : ""}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    booking.status === "approved" ? "bg-emerald-100 text-emerald-700" :
                    booking.status === "pending"  ? "bg-amber-100 text-amber-700"    :
                    "bg-red-100 text-red-700"
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/projects" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-semibold text-gray-900">Manage Projects</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
            <Link href="/admin/bookings" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-amber-600" />
                </div>
                <span className="font-semibold text-gray-900">Review Bookings</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
            <Link href="/admin/inquiries" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <span className="font-semibold text-gray-900">View Inquiries</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
            <Link href="/" target="_blank" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="font-semibold text-gray-900">View Website</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}