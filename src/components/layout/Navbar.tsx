import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import logoImg from "../../assets/logo.jpeg";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Faculty", path: "/faculty" },
  { label: "Contact Us", path: "/contact" },
  { label: "News & Updates", path: "/news" },
];

const actionLinks = [
  { label: "Student Login", path: "/student-login" },
  { label: "Admin Login", path: "/admin-login" },
  { label: "Apply Now", path: "/admissions", cta: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, role, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;
  const visibleActionLinks = user ? actionLinks.filter((link) => !link.path.includes("login")) : actionLinks;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy/95 backdrop-blur-md shadow-lg py-3"
            : "bg-navy/40 backdrop-blur-sm py-5 shadow-sm"
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full border-2 border-vibrant-gold overflow-hidden bg-white shadow-md transition-transform group-hover:scale-105 duration-300 flex items-center justify-center">
              <img src={logoImg} alt="Gramseva Mandir Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-heading text-lg font-bold text-vibrant-gold leading-tight drop-shadow-md">Mahila Gram Seva Mandir</h1>
              <p className="text-xs text-vibrant-gold/80 tracking-widest uppercase font-semibold">Nardipur</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  isActive(link.path)
                    ? "text-navy bg-vibrant-gold shadow-md"
                    : "text-vibrant-gold hover:text-white hover:bg-vibrant-gold/10"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {visibleActionLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={
                  link.cta
                    ? "ml-2 px-5 py-2.5 rounded-lg gold-gradient text-primary font-semibold text-sm hover:opacity-90 transition-opacity"
                    : `px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        isActive(link.path)
                          ? "text-navy bg-vibrant-gold shadow-md"
                          : "text-vibrant-gold hover:text-white hover:bg-vibrant-gold/10"
                      }`
                }
              >
                {link.label}
              </Link>
            ))}

            {user && (
              <div className="flex items-center ml-2">
                <Link
                  to={role === "admin" ? "/admin-dashboard" : "/student-dashboard"}
                  className="px-4 py-2 rounded-lg text-sm font-bold text-vibrant-gold hover:text-white hover:bg-vibrant-gold/10 transition-all"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-lg text-sm font-bold text-red-400 hover:text-white hover:bg-red-500/20 transition-all ml-1"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-vibrant-gold p-2 hover:bg-vibrant-gold/10 rounded-full transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy pt-24 px-6 overflow-y-auto lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-lg font-bold transition-all ${
                    isActive(link.path)
                      ? "text-navy bg-vibrant-gold shadow-md"
                      : "text-vibrant-gold hover:text-white hover:bg-vibrant-gold/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {visibleActionLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={
                    link.cta
                      ? "mt-2 block px-5 py-3 rounded-lg gold-gradient text-primary font-semibold text-center"
                      : `block px-4 py-3 rounded-lg text-lg font-bold transition-all ${
                          isActive(link.path)
                            ? "text-navy bg-vibrant-gold shadow-md"
                            : "text-vibrant-gold hover:text-white hover:bg-vibrant-gold/10"
                        }`
                  }
                >
                  {link.label}
                </Link>
              ))}

              {user && (
                <div className="border-t border-white/20 my-2 pt-2 space-y-2">
                  <Link
                    to={role === "admin" ? "/admin-dashboard" : "/student-dashboard"}
                    className="block px-4 py-3 rounded-lg text-lg font-bold text-vibrant-gold bg-vibrant-gold/10 transition-colors"
                  >
                    My Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left flex items-center gap-2 px-4 py-3 rounded-lg text-lg font-bold text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
