
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Season } from '../../types';

interface BackgroundBlobsProps {
  timeOfDay: string;
  season?: Season;
}

const BackgroundBlobs: React.FC<BackgroundBlobsProps> = ({ timeOfDay, season = Season.Vasant }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse follow with heavy damping for "drift" feel
  const springConfig = { damping: 100, stiffness: 50, mass: 2 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Parallax springs for layers
  const blob1X = useSpring(x, { damping: 120, stiffness: 20 });
  const blob1Y = useSpring(y, { damping: 120, stiffness: 20 });

  const blob2X = useSpring(x, { damping: 150, stiffness: 15 });
  const blob2Y = useSpring(y, { damping: 150, stiffness: 15 });

  const blob3X = useSpring(x, { damping: 180, stiffness: 10 });
  const blob3Y = useSpring(y, { damping: 180, stiffness: 10 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  // Luxury Gradient Palettes
  const getGradientColors = (t: string, s: Season) => {
    // Night Mode: Deep, mysterious, universal base
    if (t === 'Night') {
      return ['bg-[#0f172a]', 'bg-[#1e1b4b]', 'bg-[#312e81]'];
    }

    switch (s) {
      case Season.Vasant: // Spring: Emerald, Soft Rose, Pearl
        return t === 'Morning' 
          ? ['bg-[#34d399]', 'bg-[#fbcfe8]', 'bg-[#ccfbf1]'] // Emerald-400, Rose-200, Teal-100
          : ['bg-[#ec4899]', 'bg-[#a78bfa]', 'bg-[#2dd4bf]']; // Pink-500, Violet-400, Teal-400
      
      case Season.Grishma: // Summer: Gold, Amber, Heat Mist
        return t === 'Morning'
          ? ['bg-[#fbbf24]', 'bg-[#fdba74]', 'bg-[#fef3c7]'] // Amber-400, Orange-300, Amber-100
          : ['bg-[#f59e0b]', 'bg-[#f97316]', 'bg-[#ef4444]']; // Amber-500, Orange-500, Red-500

      case Season.Varsha: // Monsoon: Deep Cyan, Electric Blue, Storm Gray
        return ['bg-[#0891b2]', 'bg-[#3b82f6]', 'bg-[#94a3b8]']; // Cyan-600, Blue-500, Slate-400

      case Season.Sharad: // Autumn: Bronze, Rust, Deep Orange
        return ['bg-[#ea580c]', 'bg-[#b45309]', 'bg-[#78350f]']; // Orange-600, Amber-700, Amber-900

      case Season.Hemant: // Pre-Winter: Lavender, Cool Gray, Mist
        return ['bg-[#94a3b8]', 'bg-[#818cf8]', 'bg-[#c084fc]']; // Slate-400, Indigo-400, Purple-400

      case Season.Shishir: // Winter: Ice Blue, Silver, Deep Navy
        return ['bg-[#bae6fd]', 'bg-[#e0f2fe]', 'bg-[#ffffff]']; // Sky-200, Sky-100, White

      default:
        return ['bg-[#22d3ee]', 'bg-[#2dd4bf]', 'bg-[#60a5fa]'];
    }
  };

  const colors = getGradientColors(timeOfDay, season);

  // Morphing animation configuration
  const morphAnimation = {
    scale: [1, 1.2, 0.8, 1],
    rotate: [0, 90, 180, 270, 360],
    borderRadius: [
      "60% 40% 30% 70% / 60% 30% 70% 40%",
      "30% 60% 70% 40% / 50% 60% 30% 60%",
      "40% 60% 60% 40% / 40% 50% 50% 60%", 
      "60% 40% 30% 70% / 60% 30% 70% 40%"
    ]
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Blob 1: Primary Ambient Light */}
      <motion.div
        animate={{
          x: [0, 150, -100, 0],
          y: [0, -100, 150, 0],
          ...morphAnimation
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        style={{ translateX: blob1X, translateY: blob1Y }}
        className={`absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] mix-blend-screen filter blur-[120px] opacity-25 transition-colors duration-[3000ms] ease-in-out ${colors[0]}`}
      />

      {/* Blob 2: Secondary Accent */}
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 120, -50, 0],
          ...morphAnimation
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ translateX: blob2X, translateY: blob2Y }}
        className={`absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] mix-blend-screen filter blur-[100px] opacity-20 transition-colors duration-[3000ms] ease-in-out ${colors[1]}`}
      />

      {/* Blob 3: Depth/Atmosphere */}
      <motion.div
        animate={{
          x: [0, 80, -80, 0],
          y: [0, -60, 90, 0],
          ...morphAnimation
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        style={{ translateX: blob3X, translateY: blob3Y }}
        className={`absolute bottom-[-10%] left-[20%] w-[80vw] h-[60vw] mix-blend-screen filter blur-[150px] opacity-15 transition-colors duration-[3000ms] ease-in-out ${colors[2]}`}
      />
    </div>
  );
};

export default BackgroundBlobs;
