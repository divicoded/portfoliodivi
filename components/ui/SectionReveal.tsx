
import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface SectionRevealProps {
  children: React.ReactNode;
  variant?: 'depth' | 'blur' | 'slide' | 'scale';
  className?: string;
  delay?: number;
}

const SectionReveal: React.FC<SectionRevealProps> = ({ 
  children, 
  variant = 'depth', 
  className = '',
  delay = 0 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  const variants: Record<string, Variants> = {
    depth: {
      hidden: { opacity: 0, scale: 0.95, rotateX: 15, y: 60, filter: 'blur(8px)' },
      visible: { 
        opacity: 1, 
        scale: 1, 
        rotateX: 0, 
        y: 0, 
        filter: 'blur(0px)',
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay } 
      }
    },
    blur: {
      hidden: { opacity: 0, filter: 'blur(20px)', scale: 1.05 },
      visible: { 
        opacity: 1, 
        filter: 'blur(0px)', 
        scale: 1,
        transition: { duration: 1.4, ease: "easeOut", delay } 
      }
    },
    slide: {
      hidden: { opacity: 0, y: 80 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: "spring", damping: 30, stiffness: 120, delay } 
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.85, filter: 'grayscale(100%)' },
      visible: { 
        opacity: 1, 
        scale: 1,
        filter: 'grayscale(0%)',
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay } 
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      className={`perspective-1000 will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;
