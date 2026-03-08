import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const FloatingApplyButton = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 1, type: "spring" }}
    className="fixed bottom-6 right-6 z-50 lg:hidden"
  >
    <Link
      to="/admissions"
      className="flex items-center gap-2 px-5 py-3 rounded-full gold-gradient text-primary font-semibold shadow-lg hover:shadow-xl transition-shadow"
    >
      <GraduationCap className="w-5 h-5" />
      Apply Now
    </Link>
  </motion.div>
);

export default FloatingApplyButton;
