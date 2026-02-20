
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../../constants';
import Magnetic from '../ui/Magnetic';

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.href.substring(1));
      
      let current = 'home';
      // Find the section currently in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Logic: If the top of the section is somewhat near the top or if we are inside it
          const offset = window.innerHeight * 0.3;
          if (rect.top <= offset && rect.bottom >= offset) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
      setActiveSection(targetId);
    }
  };

  return (
    <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[92vw] sm:max-w-fit pointer-events-none">
      <div className="pointer-events-auto">
        <motion.nav 
          initial={{ y: -50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel p-1.5 md:p-2 rounded-full flex items-center justify-between sm:justify-center gap-1 md:gap-2 shadow-2xl shadow-black/50 border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href.substring(1);
            
            return (
              <Magnetic key={item.label} strength={10}>
                <a 
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`relative group flex items-center justify-center rounded-full transition-all duration-500 ease-out
                    ${isActive ? 'bg-white/10 px-4 py-2 md:px-5 md:py-2.5' : 'hover:bg-white/5 px-3 py-2 md:px-4 md:py-2'}
                  `}
                  aria-label={item.label}
                >
                  <div className="relative z-10 flex items-center gap-2">
                    <Icon 
                      size={18} 
                      strokeWidth={isActive ? 2.5 : 2}
                      className={`transition-colors duration-300 ${isActive ? 'text-neon-cyan drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]' : 'text-white/60 group-hover:text-white'}`} 
                    />
                    
                    {/* Label Visibility Logic: 
                        - Mobile: Only show label if active. 
                        - Desktop: Always show labels. 
                    */}
                    <span className={`
                      text-xs font-mono tracking-wide transition-all duration-300 overflow-hidden whitespace-nowrap
                      ${isActive ? 'w-auto opacity-100 ml-1' : 'w-0 opacity-0 md:w-auto md:opacity-100'} 
                      ${isActive ? 'text-white font-bold' : 'text-white/60 group-hover:text-white hidden md:block'}
                    `}>
                      {item.label}
                    </span>
                  </div>
                  
                  {/* Background Glow */}
                  <div className={`absolute inset-0 rounded-full transition-opacity duration-500 bg-white/5 blur-md -z-10 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                  
                  {/* Active Indicator (Border/Pill) */}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Mobile Dot Indicator for extra visibility */}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-neon-cyan rounded-full shadow-[0_0_4px_#00f3ff] md:hidden" />
                  )}
                </a>
              </Magnetic>
            );
          })}
        </motion.nav>
      </div>
    </div>
  );
};

export default Navigation;
