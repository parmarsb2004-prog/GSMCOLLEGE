import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logoImg from "../../assets/logo.jpeg";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login({ email, password }, "admin");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col justify-center items-center p-4 section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card rounded-2xl shadow-2xl overflow-hidden mt-16 border-t-4 border-vibrant-gold">
          <div className="bg-white p-8 border-b text-center relative">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 mb-4 flex items-center justify-center">
                <img src={logoImg} alt="Logo" className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <div className="flex items-center gap-2 mb-1 justify-center">
                <Shield className="w-6 h-6 text-navy" />
                <h2 className="text-2xl font-heading font-bold text-navy">Admin Portal</h2>
              </div>
              <p className="text-muted-foreground text-sm">Authorized personnel only</p>
            </div>
          </div>

          <div className="p-8 bg-white/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-navy focus:border-transparent transition-all outline-none"
                    placeholder="admin@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-navy">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-muted-foreground hover:text-navy transition-colors"
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
                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-navy focus:border-transparent transition-all outline-none"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg bg-navy text-white font-bold hover:bg-navy/90 hover:shadow-lg transition-all disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="animate-pulse">Authenticating...</span>
                ) : (
                  <>
                    <span>Admin Login</span>
                    <LogIn className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
