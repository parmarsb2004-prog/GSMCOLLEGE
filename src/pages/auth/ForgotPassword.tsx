/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, KeyRound, ArrowLeft, Send } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logoImg from "../../assets/logo.jpeg";

const ForgotPassword = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [emailOrEnrollment, setEmailOrEnrollment] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { forgotPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendResetLink = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sending email and verifying user
    setTimeout(() => {
      // Basic check, in a real app this would send an email.
      // For mock, we'll just allow them to reset if they exist.
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const exists = users.some((u: any) => u.email === emailOrEnrollment || u.enrollmentNumber === emailOrEnrollment);
      
      setIsLoading(false);
      if (exists) {
        setStep(2);
      } else {
        alert("User not found.");
      }
    }, 800);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      forgotPassword(emailOrEnrollment, newPassword);
      setIsLoading(false);
    }, 800);
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
            <h2 className="text-2xl font-bold text-navy mb-2">Reset Password</h2>
            <p className="text-muted-foreground text-sm">
              {step === 1 ? "Enter your email or enrollment number to receive a reset link." : "Enter your new password below."}
            </p>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSendResetLink}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Email or Enrollment Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <input
                        type="text"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg focus:ring-2 focus:ring-vibrant-gold focus:border-transparent outline-none transition-all"
                        placeholder="Enter registered detail"
                        value={emailOrEnrollment}
                        onChange={(e) => setEmailOrEnrollment(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !emailOrEnrollment}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg gold-gradient text-navy font-bold hover:shadow-lg transition-all disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="animate-pulse">Verifying...</span>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleResetPassword}
                  className="space-y-6"
                >
                  <div className="space-y-4">
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
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
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
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !newPassword || !confirmPassword}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg gold-gradient text-navy font-bold hover:shadow-lg transition-all disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="animate-pulse">Resetting...</span>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-8 text-center text-sm">
              <Link to="/student-login" className="text-muted-foreground hover:text-navy transition-colors inline-flex items-center gap-1 font-medium">
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
