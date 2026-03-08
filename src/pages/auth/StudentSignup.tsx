import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User, Mail, Phone, BookOpen, Lock, Hash, ArrowRight, ShieldCheck, AlertCircle
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import logoImg from "../../assets/logo.jpeg";

const StudentSignup = () => {
  const { signupStudent } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enrollmentNumber: "",
    mobile: "",
    course: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "password") {
      // Very basic password strength logic
      let strength = 0;
      if (value.length > 5) strength++;
      if (value.length > 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(Math.min(strength, 4));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      signupStudent({
        name: formData.name,
        email: formData.email,
        enrollmentNumber: formData.enrollmentNumber,
        mobile: formData.mobile,
        course: formData.course,
        password: formData.password
      });
      setIsLoading(false);
    }, 1000);
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return "bg-gray-200";
      case 1: return "bg-red-400";
      case 2: return "bg-orange-400";
      case 3: return "bg-yellow-400";
      case 4: return "bg-green-500";
      default: return "bg-gray-200";
    }
  };

  const getStrengthLabel = () => {
    switch (passwordStrength) {
      case 0: return "";
      case 1: return "Weak";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Strong";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-secondary py-20 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="glass-card rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row mt-10">

          {/* Left panel - Info */}
          <div className="w-full md:w-1/3 bg-navy text-white p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 mockup-pattern"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full p-1 mb-6 shadow-lg flex items-center justify-center">
                <img src={logoImg} alt="Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <h2 className="text-2xl font-heading font-bold mb-4 text-vibrant-gold">Student Registration</h2>
              <p className="text-white/80 text-sm mb-8">
                Create an account to access the student portal, course materials, and more.
              </p>

              <div className="space-y-4 text-left w-full text-sm">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-vibrant-gold w-5 h-5" />
                  <span>Secure & Encrypted</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="text-vibrant-gold w-5 h-5" />
                  <span>Access all resources</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel - Form */}
          <div className="w-full md:w-2/3 bg-white p-6 sm:p-10">
            <h3 className="text-2xl font-bold text-navy mb-6">Create Account</h3>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vibrant-gold focus:border-transparent outline-none transition-all"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vibrant-gold focus:border-transparent outline-none transition-all"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Enrollment Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enrollment Number</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="enrollmentNumber"
                      required
                      placeholder="MGV2024001"
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vibrant-gold focus:border-transparent outline-none transition-all"
                      value={formData.enrollmentNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="mobile"
                      required
                      pattern="[0-9]{10}"
                      placeholder="9876543210"
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vibrant-gold focus:border-transparent outline-none transition-all"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Course Selection */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course / Department</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      name="course"
                      required
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vibrant-gold focus:border-transparent outline-none transition-all appearance-none bg-white"
                      value={formData.course}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select your course</option>
                      <option value="Home Science Management">B.R.S. (Home Science Management)</option>
                      <option value="Farm Management">B.R.S. (Farm Management)</option>
                      <option value="PTC">P.T.C. (Bhagini Vidhyalaya)</option>
                    </select>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="••••••••"
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vibrant-gold focus:border-transparent outline-none transition-all"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex gap-1 flex-1 mr-2">
                        {[1, 2, 3, 4].map(level => (
                          <div
                            key={level}
                            className={`h-1.5 rounded-full flex-1 ${passwordStrength >= level ? getStrengthColor() : 'bg-gray-200'}`}
                          />
                        ))}
                      </div>
                      <span className={`text-xs font-medium ${passwordStrength > 2 ? 'text-green-600' : 'text-gray-500'}`}>
                        {getStrengthLabel()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 outline-none transition-all ${formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-vibrant-gold focus:border-transparent"
                        }`}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Passwords don't match
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg gold-gradient text-navy font-bold hover:shadow-lg hover:opacity-90 transition-all disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="animate-pulse">Creating account...</span>
                  ) : (
                    <>
                      <span>Sign Up</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                Already have an account?{" "}
                <Link to="/student-login" className="text-navy font-bold hover:text-vibrant-gold transition-colors">
                  Login here
                </Link>
              </p>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default StudentSignup;
