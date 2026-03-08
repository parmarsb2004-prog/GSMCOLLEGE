import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import {
  Users,
  GraduationCap,
  Building2,
  TrendingUp,
  LogOut,
  Bell,
  Plus,
  Megaphone,
  Calendar,
  Upload,
  Pencil,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import { createNews, deleteNews, fetchNews, NewsItem, updateNews } from "@/lib/newsService";

const formatDateDisplay = (date?: Date) =>
  date ? new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(date) : "";

const formatDateInput = (date?: Date) =>
  date ? date.toISOString().split("T")[0] : "";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    publishedAt: formatDateInput(new Date()),
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { data: newsItems = [], isLoading: isNewsLoading } = useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  const createMutation = useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload, existing }: { id: string; payload: Parameters<typeof updateNews>[1]; existing?: NewsItem }) =>
      updateNews(id, payload, existing),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNews,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news"] }),
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const resetForm = () => {
    setFormState({ title: "", description: "", publishedAt: formatDateInput(new Date()) });
    setEditingId(null);
    setFile(null);
  };

  const startEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setFormState({
      title: item.title,
      description: item.description,
      publishedAt: formatDateInput(item.publishedAt),
    });
    setFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.description.trim()) return;

    const payload = {
      title: formState.title.trim(),
      description: formState.description.trim(),
      publishedAt: formState.publishedAt ? new Date(formState.publishedAt) : new Date(),
      imageFile: file,
    };

    if (editingId) {
      const existing = newsItems.find((n) => n.id === editingId);
      updateMutation.mutate({ id: editingId, payload, existing });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDelete = (item: NewsItem) => {
    deleteMutation.mutate(item);
  };

  const stats = useMemo(
    () => [
      { label: "Total Students", value: "1,248", icon: Users, change: "+12%", positive: true },
      { label: "Active Faculty", value: "86", icon: GraduationCap, change: "+2%", positive: true },
      { label: "Departments", value: "5", icon: Building2, change: "0%", positive: true },
      { label: "Revenue/Funds", value: "₹45.2L", icon: TrendingUp, change: "+15%", positive: true },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-secondary pt-24 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-t-4 border-navy flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-navy/10 text-navy rounded-xl flex items-center justify-center text-2xl font-bold shadow-sm">
              <Building2 className="w-8 h-8 text-navy" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-navy">Admin Control Panel</h1>
              <p className="text-muted-foreground">Logged in as: {user?.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-2 border border-border rounded-lg text-navy hover:bg-secondary transition-colors shadow-sm bg-white">
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors bg-white font-medium shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-xl shadow-sm flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-navy rounded-lg text-vibrant-gold">
                  <stat.icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${stat.positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-3xl font-bold text-navy">{stat.value}</p>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Registrations */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="p-5 border-b border-border flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-navy">Recent Student Registrations</h3>
              <button className="text-sm font-medium text-vibrant-gold hover:text-navy transition-colors">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary/50 text-muted-foreground text-sm uppercase tracking-wider">
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Enrollment</th>
                    <th className="p-4 font-semibold">Course</th>
                    <th className="p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { name: "Rahul Sharma", id: "MGV2024001", course: "B.R.S. (Farm Management)", status: "Active" },
                    { name: "Priya Patel", id: "MGV2024002", course: "B.R.S. (Home Science)", status: "Active" },
                    { name: "Amit Kumar", id: "MGV2024003", course: "P.T.C.", status: "Pending Verification" },
                    { name: "Sneha Desai", id: "MGV2024004", course: "B.R.S. (Home Science)", status: "Active" },
                  ].map((student, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-medium text-navy">{student.name}</td>
                      <td className="p-4 text-muted-foreground">{student.id}</td>
                      <td className="p-4 text-muted-foreground">{student.course}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            student.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
            <h3 className="text-lg font-bold text-navy mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { label: "Add New Student", desc: "Manually register student" },
                { label: "Manage Courses", desc: "Update curriculum details" },
                { label: "Generate Reports", desc: "Download excel/pdf reports" },
                { label: "Site Settings", desc: "Update homepage content" },
              ].map((action, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-3 border border-border rounded-lg hover:border-vibrant-gold hover:bg-secondary/50 transition-all text-left group"
                >
                  <div>
                    <p className="font-semibold text-navy group-hover:text-vibrant-gold transition-colors">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.desc}</p>
                  </div>
                  <Plus className="w-5 h-5 text-muted-foreground group-hover:text-vibrant-gold transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Manager */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">News & Updates</p>
                <h3 className="text-xl font-bold text-navy">{editingId ? "Edit news item" : "Add news item"}</h3>
              </div>
              {editingId && (
                <button
                  onClick={resetForm}
                  className="text-sm font-medium text-vibrant-gold hover:text-navy"
                >
                  Cancel edit
                </button>
              )}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">Title</label>
                <input
                  value={formState.title}
                  onChange={(e) => setFormState((s) => ({ ...s, title: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-vibrant-gold"
                  placeholder="Headline"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-navy mb-1">Short Description</label>
                  <textarea
                    value={formState.description}
                    onChange={(e) => setFormState((s) => ({ ...s, description: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-vibrant-gold min-h-[120px]"
                    placeholder="Key details and links if any"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1">Publish Date</label>
                  <input
                    type="date"
                    value={formState.publishedAt}
                    onChange={(e) => setFormState((s) => ({ ...s, publishedAt: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-vibrant-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1">Image (optional)</label>
                  <label className="flex items-center gap-2 px-4 py-3 rounded-lg border border-dashed border-border bg-secondary/40 cursor-pointer hover:border-vibrant-gold hover:bg-secondary/70 transition-colors">
                    <Upload className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{file ? file.name : "Upload cover image"}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-navy text-white font-semibold hover:bg-navy/90 transition-colors disabled:opacity-60"
              >
                {isSubmitting ? "Saving..." : editingId ? "Update News" : "Publish News"}
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-navy">Published items</h3>
              {isNewsLoading && <span className="text-sm text-muted-foreground">Loading...</span>}
            </div>

            {isNewsLoading && (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-border bg-secondary/40 animate-pulse h-24" />
                ))}
              </div>
            )}

            {!isNewsLoading && newsItems.length === 0 && (
              <div className="p-4 rounded-lg border border-dashed border-border text-center text-muted-foreground">
                <Megaphone className="w-5 h-5 mx-auto mb-2" />
                No news published yet.
              </div>
            )}

            {!isNewsLoading && newsItems.length > 0 && (
              <div className="space-y-4">
                {newsItems.map((item) => (
                  <div key={item.id} className="border border-border rounded-lg p-4 flex gap-4 items-start bg-secondary/30">
                    <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center border border-border overflow-hidden">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDateDisplay(item.publishedAt)}</span>
                      </div>
                      <p className="text-navy font-semibold leading-tight">{item.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(item)}
                        className="p-2 rounded-lg border border-border hover:bg-white transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4 text-navy" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                        title="Delete"
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
