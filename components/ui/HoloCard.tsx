import React, { useRef, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface HoloCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const HoloCard: React.FC<HoloCardProps> = ({ children, className = '', onClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 30 });

  const rotateX = useMotionTemplate`${mouseY}deg`;
  const rotateY = useMotionTemplate`${mouseX}deg`;
  
  // Highlight gradient position
  const bgX = useMotionTemplate`${useSpring(x, { stiffness: 100, damping: 20 })}%`;
  const bgY = useMotionTemplate`${useSpring(y, { stiffness: 100, damping: 20 })}%`;

  useEffect(() => {
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!e.gamma || !e.beta) return;
      // Clamp values
      const gamma = Math.min(Math.max(e.gamma, -20), 20); 
      const beta = Math.min(Math.max(e.beta, -20), 20);
      x.set(gamma);
      y.set(beta);
    };

    // Check if device orientation is supported/needed (mostly mobile)
    if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    // Calculate rotation (-10 to 10 deg)
    const xPct = (mouseXPos / width - 0.5) * 20;
    const yPct = (mouseYPos / height - 0.5) * -20;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className={`relative rounded-2xl transition-all duration-200 ease-out perspective-1000 group ${className}`}
    >
      {/* Layer 1: Base Glass & Glow */}
      <div className="absolute inset-0 rounded-2xl bg-glass backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
        {/* Dynamic Highlight Gradient */}
        <motion.div 
          style={{
            background: useMotionTemplate`radial-gradient(circle at ${mouseX.get() + 50}% ${mouseY.get() * -1 + 50}%, rgba(255,255,255,0.1) 0%, transparent 60%)`
          }}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
        />
      </div>

      {/* Layer 2: Content Plane (Floating) */}
      <div 
        style={{ transform: "translateZ(30px)" }} 
        className="relative z-10 h-full"
      >
        {children}
      </div>
      
      {/* Layer 3: Reflection/Rim Light */}
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none"
      />
    </motion.div>
  );
};

export default HoloCard;