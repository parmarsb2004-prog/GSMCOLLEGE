import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Departments from "./pages/Departments";
import DepartmentDetail from "./pages/DepartmentDetail";
import Faculty from "./pages/Faculty";
import Admissions from "./pages/Admissions";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import News from "./pages/News";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Auth & Dashboard
import { AuthProvider, useAuth } from "./context/AuthContext";
import StudentLogin from "./pages/auth/StudentLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import StudentSignup from "./pages/auth/StudentSignup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRole }: { children: JSX.Element, allowedRole: "student" | "admin" }) => {
  const { user, role } = useAuth();
  if (!user) return <Navigate to={allowedRole === "admin" ? "/admin-login" : "/student-login"} replace />;
  if (role !== allowedRole) return <Navigate to="/" replace />;
  return children;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/:id" element={<DepartmentDetail />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Auth Routes */}
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/signup" element={<StudentSignup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Dashboard Routes */}
            <Route 
              path="/student-dashboard" 
              element={
                <PrivateRoute allowedRole="student">
                  <StudentDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin-dashboard" 
              element={
                <PrivateRoute allowedRole="admin">
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
