import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setIsLoading(false);

    if (error) {
      toast.error("Could not reset password. The link may be invalid or expired.");
      return;
    }

    toast.success("Password updated successfully. Please login.");
    navigate("/student-login");
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col justify-center items-center p-4 section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card rounded-2xl shadow-xl overflow-hidden mt-16 bg-white">
          <div className="p-8 text-center border-b bg-navy/5">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full p-1 shadow-sm border border-vibrant-gold flex items-center justify-center">
                <KeyRound className="w-8 h-8 text-vibrant-gold" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-navy mb-2">Set New Password</h2>
            <p className="text-muted-foreground text-sm">
              Enter a new password for your account.
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg focus:ring-2 focus:ring-vibrant-gold outline-none transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg focus:ring-2 focus:ring-vibrant-gold outline-none transition-all"
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg gold-gradient text-navy font-bold hover:shadow-lg transition-all disabled:opacity-70"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;

