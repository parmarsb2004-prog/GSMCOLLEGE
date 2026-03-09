/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export type Role = "student" | "admin" | null;

interface User {
  id: string;
  name?: string;
  email: string;
  enrollmentNumber?: string;
  mobile?: string;
  course?: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  role: Role;
  loading: boolean;
  login: (userData: any, userRole: Role) => Promise<void>;
  logout: () => Promise<void>;
  signupStudent: (userData: any) => Promise<boolean>;
  forgotPassword: (email: string, _newPass?: string) => Promise<boolean>;
  createAdmin: (data: { name: string; email: string; password: string }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple helper to build a user object from Supabase auth user
const buildUserFromAuth = (supabaseUser: { id: string; email: string | null }, role: Role): User => ({
  id: supabaseUser.id,
  email: supabaseUser.email || "",
  role,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Listen to Supabase auth state (simple version: only uses auth, no extra tables)
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const supaUser = session?.user;
      if (supaUser) {
        const currentRole = (supaUser.user_metadata?.role as Role) ?? null;
        if (currentRole) {
          const profile = buildUserFromAuth(supaUser, currentRole);
          setUser(profile);
          setRole(profile.role);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    // Initial session fetch
    supabase.auth.getSession().then(({ data }) => {
      const supaUser = data.session?.user;
      if (supaUser) {
        const currentRole = (supaUser.user_metadata?.role as Role) ?? null;
        if (currentRole) {
          const profile = buildUserFromAuth(supaUser, currentRole);
          setUser(profile);
          setRole(profile.role);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // LOGIN
  const login = async (userData: any, userRole: Role) => {
    try {
      const email = userRole === "admin" ? userData.email : userData.emailOrEnrollment;

      const { data, error } = await supabase.auth.signInWithPassword({ email, password: userData.password });

      if (error || !data.user) {
        // eslint-disable-next-line no-console
        console.error("Supabase signIn error:", error);
        const msg = error?.message || "Login failed. Check your email and password.";
        toast.error(msg);
        alert(msg);
        return;
      }

      // Simple: trust the route they used (student vs admin)
      const profile = buildUserFromAuth(data.user, userRole);

      setUser(profile);
      setRole(profile.role);
      toast.success("Login successful!");

      // Store login event
      try {
        await supabase.from("login_logs").insert({
          user_id: profile.id,
          email: profile.email,
          role: profile.role,
          logged_in_at: new Date().toISOString(),
        });
      } catch {
        // Ignore logging errors
      }

      navigate(profile.role === "admin" ? "/admin-dashboard" : "/student-dashboard");
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error("Unexpected login error:", error);
      const msg = error?.message || "Login failed. Try again.";
      toast.error(msg);
      alert(msg);
    }
  };

  // LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  // STUDENT SIGNUP
  const signupStudent = async (userData: any): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: "student",
          },
        },
      });

      if (error || !data.user) {
        // Surface clearer auth errors
        // eslint-disable-next-line no-console
        console.error("Supabase auth signUp error:", error);
        if (error?.message?.toLowerCase().includes("already registered") || error?.message?.includes("User already exists")) {
          toast.error("Email already registered. Please login.");
          return false;
        }
        toast.error(error?.message || "Signup failed. Try again.");
        return false;
      }

      // Store extra profile fields separately for admin view (best-effort)
      try {
        await supabase.from("students").insert({
          id: data.user.id,
          name: userData.name,
          email: userData.email,
          enrollmentNumber: userData.enrollmentNumber || "",
          mobile: userData.mobile || "",
          course: userData.course || "",
          createdAt: new Date().toISOString(),
        });
      } catch (insertError) {
        // eslint-disable-next-line no-console
        console.error("Error inserting into students table:", insertError);
      }

      toast.success("Registration successful! Please login.");
      await supabase.auth.signOut(); // Logout after signup, let them login manually
      navigate("/student-login");
      return true;
    } catch (error: any) {
      const msg =
        error.code === "auth/email-already-in-use"
          ? "Email already registered. Please login."
          : "Signup failed. Try again.";
      toast.error(msg);
      return false;
    }
  };

  // ADMIN CREATION (from within app)
  const createAdmin = async (data: { name: string; email: string; password: string }): Promise<boolean> => {
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { name: data.name, role: "admin" },
        },
      });

      if (error || !signUpData.user) {
        throw error || new Error("Could not create admin");
      }

      toast.success("New admin account created. You are now logged in as this admin.");
      navigate("/admin-dashboard");
      return true;
    } catch (error: any) {
      const msg =
        error.code === "auth/email-already-in-use"
          ? "That email is already in use. Try a different one."
          : "Could not create admin. Try again.";
      toast.error(msg);
      return false;
    }
  };

  // FORGOT PASSWORD — sends Firebase reset email
  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      toast.success("Password reset email sent! Check your inbox.");
      navigate("/student-login");
      return true;
    } catch (_error: any) {
      toast.error("User not found or error sending email.");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, role, loading, login, logout, signupStudent, forgotPassword, createAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
