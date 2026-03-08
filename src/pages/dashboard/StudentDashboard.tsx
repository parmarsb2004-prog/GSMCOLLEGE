import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { User, BookOpen, Clock, Award, FileText, Settings, LogOut } from "lucide-react";

const StudentDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-secondary pt-24 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="glass-card p-6 md:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-navy text-vibrant-gold rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
              {user?.name?.charAt(0) || "S"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-navy">Welcome back, {user?.name || "Student"}!</h1>
              <p className="text-muted-foreground">{user?.course || "Course not assigned"} | {user?.enrollmentNumber || "N/A"}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-red-600 hover:bg-red-50 transition-colors bg-white font-medium shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Quick Stats */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Attendance", value: "85%", icon: Clock, color: "text-blue-600", bg: "bg-blue-100" },
              { label: "CGPA", value: "8.4", icon: Award, color: "text-green-600", bg: "bg-green-100" },
              { label: "Pending Assignments", value: "3", icon: FileText, color: "text-orange-600", bg: "bg-orange-100" },
              { label: "Total Courses", value: "6", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-100" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-border flex items-center gap-4"
              >
                <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-navy">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Profile Details */}
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-border">
            <h3 className="text-lg font-bold text-navy mb-4 border-b pb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-vibrant-gold" />
              Profile Details
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium text-navy">{user?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-navy">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mobile</p>
                <p className="font-medium text-navy">{user?.mobile || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Enrollment Year</p>
                <p className="font-medium text-navy">2024</p>
              </div>
            </div>
            <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-navy hover:bg-secondary transition-colors text-sm font-medium">
              <Settings className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Recent Notifications & Courses */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-lg font-bold text-navy mb-4 border-b pb-2">Recent Notifications</h3>
              <div className="space-y-4">
                {[
                  { title: "Mid-Term Exam Schedule Released", date: "2 days ago", type: "urgent" },
                  { title: "Library Due Date Reminder", date: "5 days ago", type: "info" },
                  { title: "Hostel Fee Submission Extended", date: "1 week ago", type: "success" },
                ].map((note, i) => (
                  <div key={i} className="flex gap-4 p-3 hover:bg-secondary rounded-lg transition-colors cursor-pointer border border-transparent hover:border-border">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                      note.type === 'urgent' ? 'bg-red-500' : 
                      note.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <h4 className="font-medium text-navy text-sm sm:text-base">{note.title}</h4>
                      <p className="text-xs text-muted-foreground">{note.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy p-6 rounded-xl shadow-sm text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-vibrant-gold rounded-bl-full opacity-20"></div>
              <h3 className="text-lg font-bold text-vibrant-gold mb-2 relative z-10">Need Help?</h3>
              <p className="text-sm text-white/80 mb-4 relative z-10">Contact the admin block for any discrepancies in your profile or access issues.</p>
              <button className="px-4 py-2 bg-vibrant-gold text-navy font-medium rounded-lg hover:opacity-90 transition-opacity text-sm shadow-md relative z-10">
                Contact Support
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
