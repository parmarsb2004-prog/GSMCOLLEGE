/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper: get user profile from Firestore
const getUserProfile = async (firebaseUser: FirebaseUser): Promise<User | null> => {
  // Check admin collection first
  const adminRef = doc(db, "admins", firebaseUser.uid);
  const adminSnap = await getDoc(adminRef);
  if (adminSnap.exists()) {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || "",
      name: adminSnap.data().name || firebaseUser.displayName || "Admin",
      role: "admin",
    };
  }

  // Check students collection
  const studentRef = doc(db, "students", firebaseUser.uid);
  const studentSnap = await getDoc(studentRef);
  if (studentSnap.exists()) {
    const data = studentSnap.data();
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || "",
      name: data.name || firebaseUser.displayName || "",
      enrollmentNumber: data.enrollmentNumber || "",
      mobile: data.mobile || "",
      course: data.course || "",
      role: "student",
    };
  }

  return null;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser);
        if (profile) {
          setUser(profile);
          setRole(profile.role);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // LOGIN
  const login = async (userData: any, userRole: Role) => {
    try {
      const email =
        userRole === "admin" ? userData.email : userData.emailOrEnrollment;
      const { user: fbUser } = await signInWithEmailAndPassword(
        auth,
        email,
        userData.password
      );

      const profile = await getUserProfile(fbUser);

      if (!profile) {
        await signOut(auth);
        toast.error("No account found. Contact admin.");
        return;
      }

      if (profile.role !== userRole) {
        await signOut(auth);
        toast.error(
          userRole === "admin"
            ? "You are not an admin."
            : "Please use admin login."
        );
        return;
      }

      setUser(profile);
      setRole(profile.role);
      toast.success("Login successful!");
      navigate(profile.role === "admin" ? "/admin-dashboard" : "/student-dashboard");
    } catch (error: any) {
      const msg =
        error.code === "auth/invalid-credential" ||
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
          ? "Invalid email or password."
          : "Login failed. Try again.";
      toast.error(msg);
    }
  };

  // LOGOUT
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  // STUDENT SIGNUP
  const signupStudent = async (userData: any): Promise<boolean> => {
    try {
      const { user: fbUser } = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      // Update display name
      await updateProfile(fbUser, { displayName: userData.name });

      // Save student profile in Firestore
      await setDoc(doc(db, "students", fbUser.uid), {
        name: userData.name,
        email: userData.email,
        enrollmentNumber: userData.enrollmentNumber || "",
        mobile: userData.mobile || "",
        course: userData.course || "",
        role: "student",
        createdAt: new Date().toISOString(),
      });

      toast.success("Registration successful! Please login.");
      await signOut(auth); // Logout after signup, let them login manually
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

  // FORGOT PASSWORD — sends Firebase reset email
  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
      navigate("/student-login");
      return true;
    } catch (error: any) {
      toast.error("User not found or error sending email.");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, role, loading, login, logout, signupStudent, forgotPassword }}
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
