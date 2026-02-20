
import React, { useRef, useEffect, useState } from 'react';
import HoloCard from './HoloCard';
import { Github, ExternalLink, Network, Sparkles, Zap, Fingerprint, Code2 } from 'lucide-react';
import { Season } from '../../types';

interface GithubCardProps {
  season?: Season;
  timeOfDay?: string;
}

const GithubCard: React.FC<GithubCardProps> = ({ season = Season.Vasant, timeOfDay = 'Morning' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // --- Configuration per Season ---
  const getThemeConfig = (s: Season, t: string) => {
    const isNight = t === 'Night';
    
    switch (s) {
      case Season.Vasant: // Spring
        return {
          primary: isNight ? '#34d399' : '#10b981', // Emerald
          secondary: isNight ? '#fbcfe8' : '#ec4899', // Pink
          accent: '#ffffff',
          bgGradient: isNight 
            ? 'from-emerald-950/80 via-gray-900/90 to-black'
            : 'from-emerald-900/40 via-gray-900/60 to-black/80',
          bloom: 'shadow-emerald-500/20'
        };
      case Season.Grishma: // Summer
        return {
          primary: isNight ? '#fbbf24' : '#f59e0b', // Amber
          secondary: isNight ? '#f87171' : '#ef4444', // Red
          accent: '#fef3c7',
          bgGradient: isNight
            ? 'from-amber-950/80 via-gray-900/90 to-black'
            : 'from-amber-900/40 via-gray-900/60 to-black/80',
          bloom: 'shadow-amber-500/20'
        };
      case Season.Varsha: // Monsoon
        return {
          primary: isNight ? '#22d3ee' : '#06b6d4', // Cyan
          secondary: isNight ? '#60a5fa' : '#3b82f6', // Blue
          accent: '#e0f2fe',
          bgGradient: isNight
            ? 'from-cyan-950/80 via-slate-900/90 to-black'
            : 'from-cyan-900/40 via-slate-900/60 to-black/80',
          bloom: 'shadow-cyan-500/20'
        };
      case Season.Sharad: // Autumn
        return {
          primary: isNight ? '#fb923c' : '#ea580c', // Orange
          secondary: isNight ? '#a78bfa' : '#7c3aed', // Violet
          accent: '#ffedd5',
          bgGradient: isNight
            ? 'from-orange-950/80 via-stone-900/90 to-black'
            : 'from-orange-900/40 via-stone-900/60 to-black/80',
          bloom: 'shadow-orange-500/20'
        };
      case Season.Hemant: // Pre-winter
        return {
          primary: isNight ? '#818cf8' : '#6366f1', // Indigo
          secondary: isNight ? '#c084fc' : '#a855f7', // Purple
          accent: '#e0e7ff',
          bgGradient: isNight
            ? 'from-indigo-950/80 via-slate-900/90 to-black'
            : 'from-indigo-900/40 via-slate-900/60 to-black/80',
          bloom: 'shadow-indigo-500/20'
        };
      case Season.Shishir: // Winter
        return {
          primary: isNight ? '#ffffff' : '#e2e8f0', // White/Slate
          secondary: isNight ? '#38bdf8' : '#0ea5e9', // Sky
          accent: '#f0f9ff',
          bgGradient: isNight
            ? 'from-slate-900/90 via-gray-900 to-black'
            : 'from-slate-800/50 via-gray-900/70 to-black/80',
          bloom: 'shadow-white/10'
        };
      default:
        return { primary: '#ffffff', secondary: '#888888', accent: '#ffffff', bgGradient: 'from-black to-black', bloom: '' };
    }
  };

  const theme = getThemeConfig(season, timeOfDay);

  // --- Canvas Neural Network Engine ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let nodes: any[] = [];
    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    // Resize handler
    const resize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        // High DPI support
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        width = rect.width;
        height = rect.height;
        initNodes();
      }
    };

    // Node Factory
    const initNodes = () => {
      nodes = [];
      const centerX = width * 0.2; 
      const centerY = height * 0.35;

      // Central Hub
      nodes.push({
        x: centerX,
        y: centerY,
        vx: 0,
        vy: 0,
        radius: 60,
        type: 'core',
        color: theme.primary
      });

      // Satellite Nodes - adaptive count based on screen width
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 8 : 15;
      
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          type: 'satellite',
          color: Math.random() > 0.5 ? theme.primary : theme.secondary
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node, i) => {
        if (node.type !== 'core') {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          if (isHovered) {
            const dx = nodes[0].x - node.x;
            const dy = nodes[0].y - node.y;
            node.x += dx * 0.002;
            node.y += dy * 0.002;
          }
        }

        nodes.forEach((otherNode, j) => {
          if (i === j) return;
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const range = (node.type === 'core' || otherNode.type === 'core') ? 250 : 80;
          
          if (dist < range) {
            ctx.beginPath();
            ctx.strokeStyle = node.type === 'core' ? theme.primary : theme.secondary;
            ctx.globalAlpha = (1 - dist / range) * 0.3;
            ctx.lineWidth = 1;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });

        ctx.globalAlpha = node.type === 'core' ? 0 : 0.8; 
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        if (node.type !== 'core') {
          ctx.shadowBlur = 10;
          ctx.shadowColor = node.color;
        } else {
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isHovered]);

  return (
    <HoloCard className="group h-full w-full overflow-hidden border border-white/10 shadow-2xl">
      <div 
        ref={containerRef}
        className={`relative h-full w-full bg-gradient-to-br ${theme.bgGradient} transition-colors duration-1000`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 z-0 opacity-40 pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        />

        <div className="absolute inset-0 bg-noise opacity-[0.1] z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-[1] pointer-events-none mix-blend-overlay" />

        <div className="relative z-10 p-5 md:p-8 h-full flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
          
          {/* Visual Identity Anchor (Left Side) */}
          <div className="relative flex-shrink-0">
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <div className={`absolute inset-[-8px] rounded-full border border-dashed opacity-40 animate-[spin_10s_linear_infinite]`} style={{ borderColor: theme.primary }} />
              <div className={`absolute inset-[-16px] rounded-full border border-dotted opacity-20 animate-[spin_15s_linear_infinite_reverse]`} style={{ borderColor: theme.secondary }} />
              
              <div className={`w-full h-full rounded-full overflow-hidden border-2 bg-black transition-colors duration-500 shadow-[0_0_30px_rgba(0,0,0,0.6)] ${theme.bloom}`} style={{ borderColor: theme.primary }}>
                 <img 
                   src="https://github.com/divicoded.png" 
                   alt="Neural Persona" 
                   className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                 />
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="absolute bottom-1 right-1 flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-black rounded-full border border-white/20">
                <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse`} style={{ backgroundColor: theme.primary }} />
              </div>
            </div>
          </div>

          {/* Signature Content (Right Side) */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left min-w-0 w-full">
            
            <div className="mb-2 md:mb-4">
               <h3 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tighter leading-none mb-1 group-hover:tracking-normal transition-all duration-500">
                 Div
               </h3>
               <div className="flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm font-mono opacity-80" style={{ color: theme.secondary }}>
                  <Fingerprint size={12} />
                  <span>@divicoded</span>
               </div>
            </div>

            <div className="mb-4 md:mb-6 space-y-2">
               <div className="inline-flex items-center gap-2 px-3 py-1 md:px-3 md:py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                  <Sparkles size={12} style={{ color: theme.primary }} />
                  <span className="text-[10px] md:text-xs font-medium text-white tracking-wide">Creative Developer</span>
               </div>
               <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest font-mono hidden md:block">
                 Frontend Systems // Neural Interfaces
               </p>
            </div>

            <div className="flex items-center gap-4 mt-auto w-full justify-center md:justify-start">
               <div className="flex flex-col items-center md:items-start px-3 py-1.5 md:px-4 md:py-2 border-l border-white/10 bg-gradient-to-r from-white/5 to-transparent rounded-r-xl">
                  <span className="text-base md:text-lg font-bold text-white leading-none">10+</span>
                  <span className="text-[8px] md:text-[9px] uppercase tracking-wider text-white/30 mt-1">Repository</span>
               </div>
               
               <div className="h-6 md:h-8 w-[1px] bg-white/10" />

               <div className="flex gap-3">
                  <Network size={16} className="text-white/20 group-hover:text-white transition-colors" />
                  <Code2 size={16} className="text-white/20 group-hover:text-white transition-colors" />
                  <Zap size={16} className="text-white/20 group-hover:text-white transition-colors" />
               </div>
            </div>
          </div>

          <div className="w-full md:w-auto md:ml-auto flex justify-center md:block mt-2 md:mt-0">
             <a 
               href="https://github.com/divicoded" 
               target="_blank" 
               rel="noreferrer"
               className="relative group/btn flex items-center justify-center w-full md:w-14 h-10 md:h-14 rounded-lg md:rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all overflow-hidden"
             >
                <div className={`absolute inset-0 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300 blur-md`} style={{ backgroundColor: theme.primary }} />
                <span className="md:hidden text-xs font-mono mr-2">OPEN GITHUB</span>
                <Github size={20} className="relative z-10 text-white group-hover/btn:scale-110 transition-transform" />
                
                <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full animate-ping opacity-50 hidden md:block`} style={{ backgroundColor: theme.secondary }} />
             </a>
          </div>

          {/* GIF Display Module */}
          <div className="absolute bottom-0 right-3 md:bottom-0 md:right-6 z-20 pointer-events-none">
            <div className="relative w-[110px] h-[110px] md:w-[150px] md:h-[150px] lg:w-[165px] lg:h-[165px]">

              {/* glow aura */}
              <div
                className="absolute inset-0 blur-2xl opacity-40"
                style={{ backgroundColor: theme.primary }}
              />

              {/* transparent gif */}
              <img
                src="https://divicoded.github.io/portfoliodivi/images/bocchi.gif"
                alt="Hehehe..."
                className="relative w-full h-full object-contain opacity-95 group-hover:scale-110 transition-transform duration-700"
              />

            </div>
          </div>

        </div>
      </div>
    </HoloCard>
  );
};

export default GithubCard;
