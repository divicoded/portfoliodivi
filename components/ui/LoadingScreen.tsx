
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulation of asset loading using GSAP
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Trigger exit
          setTimeout(onComplete, 800);
        }
      });

      const progressObj = { p: 0 };

      tl.fromTo('.loader-text', 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'expo.inOut'
        }
      )
      .to(progressObj, {
        p: 100,
        duration: 2,
        ease: 'none',
        onUpdate: () => {
          setProgress(Math.round(progressObj.p));
        }
      }, '-=0.4'); // Slight overlap with text reveal

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      exit={{ y: '-100%', opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[999] bg-obsidian flex flex-col items-center justify-center text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-noise opacity-10" />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-8">
        <div className="flex gap-4 overflow-hidden mb-6 font-mono text-xs tracking-[0.3em] text-neon-cyan/60 uppercase">
          <span className="loader-text">System</span>
          <span className="loader-text">Boot</span>
          <span className="loader-text">v2.0</span>
        </div>
        
        <h1 className="text-8xl md:text-9xl font-display font-bold tracking-tighter mix-blend-difference loader-text mb-8">
          {progress}%
        </h1>

        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-cyan-400 via-violet-500 to-green-400 shadow-[0_0_20px_rgba(0,243,255,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>
      </div>
      
      <div className="absolute bottom-12 text-[10px] font-mono text-white/20 tracking-widest">
        INITIALIZING INTERFACE...
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
