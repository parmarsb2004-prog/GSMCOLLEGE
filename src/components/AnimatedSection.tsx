import { motion } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale" | "fade";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
}

const variants: Record<Direction, { initial: object; whileInView: object }> = {
  up: {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
  },
  left: {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
  },
  right: {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.92 },
    whileInView: { opacity: 1, scale: 1 },
  },
  fade: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
};

const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: Props) => {
  const v = variants[direction];
  return (
    <motion.div
      initial={v.initial}
      whileInView={v.whileInView}
      viewport={{ once: true, margin: "-60px", amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
