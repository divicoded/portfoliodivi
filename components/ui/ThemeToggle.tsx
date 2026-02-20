
import React from 'react';
import { Sun, Moon, Cloud, Zap } from 'lucide-react';
import Magnetic from './Magnetic';

interface ThemeToggleProps {
  current: string;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ current, onToggle }) => {
  return (
    <Magnetic strength={15}>
      <button 
        onClick={onToggle}
        className="relative group p-2.5 rounded-full bg-black/20 border border-white/10 backdrop-blur-md overflow-hidden hover:border-white/30 transition-all"
        aria-label="Toggle Theme"
      >
        <div className="relative z-10 flex items-center justify-center">
           {current === 'Morning' && <Sun size={18} className="text-neon-cyan group-hover:rotate-90 transition-transform duration-500" />}
           {current === 'Afternoon' && <Cloud size={18} className="text-orange-300 group-hover:scale-110 transition-transform" />}
           {current === 'Evening' && <Zap size={18} className="text-neon-violet group-hover:scale-110 transition-transform" />}
           {current === 'Night' && <Moon size={18} className="text-indigo-400 group-hover:-rotate-12 transition-transform" />}
        </div>
        
        {/* Hover Radial Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>
    </Magnetic>
  );
};

export default ThemeToggle;
