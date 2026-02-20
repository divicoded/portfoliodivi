import React, { useRef } from 'react';
import HoloCard from './HoloCard';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import { Project } from '../../types';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to Y translation for image (slower movement than container)
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <HoloCard className="h-full group overflow-hidden">
      <div ref={ref} className="h-full w-full relative">
        {/* Background Image / GIF Holder with Parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent z-10" />
          {project.image && (
            <motion.div style={{ y }} className="w-full h-[130%] -top-[15%] relative">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
              />
            </motion.div>
          )}
        </div>

        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <span className="font-mono text-xs text-neon-cyan border border-neon-cyan/30 px-2 py-1 rounded backdrop-blur-md bg-black/20">
              0{index + 1}
            </span>
            <div className="flex gap-2">
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener"
                className="p-2 bg-white/5 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors border border-white/5"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener"
                className="p-2 bg-white/5 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors border border-white/5"
                aria-label="View Project"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-3xl font-display font-bold mb-3 text-white group-hover:text-neon-cyan transition-colors drop-shadow-lg">
              {project.title}
            </h3>
            <p className="text-white/70 leading-relaxed mb-6 font-light text-sm line-clamp-3">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="text-[10px] font-mono text-white/60 bg-white/5 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HoloCard>
  );
};

export default ProjectCard;