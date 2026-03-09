import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logoImg from "../../assets/logo.jpeg";


const StudentLogin = () => {
  const [emailOrEnrollment, setEmailOrEnrollment] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Fire and forget; AuthContext will handle navigation or errors via toasts
    void login({ emailOrEnrollment, password }, "student");
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col justify-center items-center p-4 section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card rounded-2xl shadow-2xl overflow-hidden mt-16">
          <div className="bg-navy p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 mockup-pattern"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-full p-1 mb-4 shadow-lg border-2 border-vibrant-gold flex items-center justify-center overflow-hidden">
                <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-white mb-1">Student Portal</h2>
              <p className="text-vibrant-gold text-sm">Welcome back! Please login to continue.</p>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-navy/80 mb-2">
                  Email or Enrollment Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-vibrant-gold focus:border-transparent transition-all outline-none"
                    placeholder="Enter your email or enrollment no."
                    value={emailOrEnrollment}
                    onChange={(e) => setEmailOrEnrollment(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-navy/80">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-vibrant-gold hover:text-navy transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-vibrant-gold focus:border-transparent transition-all outline-none"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg gold-gradient text-navy font-bold hover:shadow-lg hover:opacity-90 transition-all"
              >
                <span>Login securely</span>
                <LogIn className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-navy font-bold hover:text-vibrant-gold transition-colors inline-flex items-center gap-1">
                  Create new student account
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
