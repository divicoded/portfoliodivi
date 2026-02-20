
import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  variant?: 'editorial' | 'mechanical' | 'blur' | 'syne';
}

const TextReveal: React.FC<TextRevealProps> = ({ text, className = '', delay = 0, variant = 'editorial' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Container variants handle staggering
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: variant === 'mechanical' ? 0.02 : 0.03, 
        delayChildren: delay * i 
      },
    }),
  };

  // Child variants handle individual letter animation
  const getChildVariants = (): Variants => {
    switch (variant) {
      case 'mechanical':
        return {
          hidden: {
            opacity: 0,
            y: 0,
            x: -10,
            scale: 1.1,
            filter: "blur(4px)"
          },
          visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 200,
            },
          },
        };
      case 'blur':
        return {
          hidden: {
            opacity: 0,
            filter: "blur(15px)",
            y: 10,
          },
          visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.2, 0.65, 0.3, 0.9],
            },
          },
        };
      case 'syne':
        return {
          hidden: {
            opacity: 0,
            y: 40,
            rotateX: -45,
          },
          visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
              type: "spring",
              damping: 18,
              stiffness: 90,
              mass: 1.2
            },
          },
        };
      case 'editorial':
      default:
        return {
          hidden: {
            opacity: 0,
            y: '100%',
            rotate: 5,
            filter: "blur(4px)",
          },
          visible: {
            opacity: 1,
            y: 0,
            rotate: 0,
            filter: "blur(0px)",
            transition: {
              type: "spring",
              damping: 20,
              stiffness: 100,
            },
          },
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ display: "flex", flexWrap: "wrap", perspective: "1000px" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`${className} will-change-transform`}
    >
      {text.split(" ").map((word, index) => (
        <span key={index} className="mr-[0.25em] whitespace-nowrap overflow-hidden inline-flex">
          {word.split("").map((letter, i) => (
            <motion.span key={i} variants={getChildVariants()} className="inline-block origin-center backface-hidden">
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

export default TextReveal;
