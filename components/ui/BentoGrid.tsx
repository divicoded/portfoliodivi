
import React from 'react';
import { Project } from '../../types';
import BentoCard from './BentoCard';
import { motion, Variants } from 'framer-motion';

interface BentoGridProps {
  projects: Project[];
}

const BentoGrid: React.FC<BentoGridProps> = ({ projects }) => {
  const getSpanClasses = (size?: string) => {
    switch (size) {
      case 'large': // 2x2
        return 'md:col-span-2 md:row-span-2 min-h-[400px]';
      case 'wide': // 2x1
        return 'md:col-span-2 md:row-span-1 min-h-[250px]';
      case 'small': // 1x1 small
        return 'md:col-span-1 md:row-span-1 min-h-[200px]';
      default: // 1x1 standard
        return 'md:col-span-1 md:row-span-1 min-h-[280px]';
    }
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      // Group for focus effect
      className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-auto max-w-7xl mx-auto group/grid"
    >
      {projects.map((project) => (
        <motion.div 
          key={project.id} 
          variants={item}
          className={`${getSpanClasses(project.size)} transition-all duration-500 ease-out group-hover/grid:opacity-40 group-hover/grid:scale-95 hover:!opacity-100 hover:!scale-100 hover:z-10`}
        >
          <BentoCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BentoGrid;
