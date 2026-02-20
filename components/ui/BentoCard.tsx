
import React, { useRef } from 'react';
import HoloCard from './HoloCard';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface BentoCardProps {
  project: Project;
  className?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ project, className }) => {
  const isLarge = project.size === 'large' || project.size === 'wide';
  const ref = useRef<HTMLDivElement>(null);

  // Parallax Mouse State
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  // Map mouse position to image translation (inverse movement)
  const imgX = useTransform(mouseX, [-0.5, 0.5], ["5%", "-5%"]);
  const imgY = useTransform(mouseY, [-0.5, 0.5], ["5%", "-5%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized mouse position (-0.5 to 0.5)
    const normalizedX = (e.clientX - rect.left) / width - 0.5;
    const normalizedY = (e.clientY - rect.top) / height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`h-full w-full group/card relative ${className}`}
    >
      <HoloCard className="h-full w-full overflow-hidden border border-white/5 bg-black/40 hover:border-white/20 transition-colors duration-500">
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block h-full w-full relative z-20 flex flex-col justify-between p-6"
        >
          {/* Parallax Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 transition-opacity duration-500 group-hover/card:opacity-80" />
            
            {project.image && (
              <motion.div 
                style={{ x: imgX, y: imgY, scale: 1.15 }}
                className="w-full h-full"
              >
                 <img 
                   src={project.image} 
                   alt={project.title}
                   className="w-full h-full object-cover opacity-40 group-hover/card:opacity-60 transition-all duration-700 grayscale group-hover/card:grayscale-0"
                 />
              </motion.div>
            )}
            
            {/* Animated Noise Overlay */}
            <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay" />
          </div>

          {/* Top Section */}
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest border w-fit backdrop-blur-sm shadow-sm ${
                project.highlight?.includes('Hero') 
                  ? 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan' 
                  : 'bg-white/5 border-white/10 text-white/60'
              }`}>
                {project.highlight || 'Project'}
              </span>
              <h3 className={`${isLarge ? 'text-3xl' : 'text-xl'} font-display font-bold text-white group-hover/card:text-neon-cyan transition-colors mt-1 drop-shadow-lg`}>
                {project.title}
              </h3>
            </div>
            
            <div className="p-2 rounded-full bg-white/5 border border-white/5 group-hover/card:bg-neon-cyan/20 group-hover/card:border-neon-cyan/50 transition-all shadow-lg group-hover/card:shadow-neon-cyan/20">
              <ArrowUpRight size={18} className="text-white/50 group-hover/card:text-white transition-colors" />
            </div>
          </div>

          {/* Description */}
          <div className="relative z-10 mt-4 flex-1">
            <p className={`text-sm text-white/70 font-light leading-relaxed group-hover/card:text-white transition-colors duration-300 ${isLarge ? 'line-clamp-3' : 'line-clamp-2'}`}>
              {project.description}
            </p>
          </div>

          {/* Bottom Tech Stack */}
          <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-col gap-3">
            {/* Language Bars */}
            {project.languages && (
              <div className="flex gap-1 w-full h-1 rounded-full overflow-hidden bg-white/5">
                {project.languages.map((lang, i) => (
                  <div 
                    key={lang.name} 
                    className="h-full transition-all duration-500" 
                    style={{ 
                      width: `${lang.percent}%`, 
                      backgroundColor: i === 0 ? '#00f3ff' : i === 1 ? '#bd00ff' : '#ffffff',
                      opacity: 0.8
                    }} 
                  />
                ))}
              </div>
            )}
            
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 items-center">
              {project.tech.slice(0, 4).map((t, i) => (
                <span key={i} className="text-[10px] text-white/50 font-mono bg-black/40 px-2 py-1 rounded border border-white/5 group-hover/card:border-white/20 transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </a>
      </HoloCard>
    </div>
  );
};

export default BentoCard;
