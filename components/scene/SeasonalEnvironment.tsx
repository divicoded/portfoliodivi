import React, { useEffect, useRef } from 'react';
import { Season } from '../../types';

interface SeasonalEnvironmentProps {
  season: Season;
}

interface Particle {
  x: number;
  y: number;
  z: number; // Depth 0 (far) to 1 (near)
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  type: 'circle' | 'line' | 'petal' | 'leaf' | 'fog' | 'flare';
  trail: { x: number; y: number }[]; // For velocity trails
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

const SeasonalEnvironment: React.FC<SeasonalEnvironmentProps> = ({ season }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const ripples = useRef<Ripple[]>([]);
  const requestRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0 });

  // Physics & Visual Config per Season
  const getSeasonConfig = (s: Season) => {
    switch (s) {
      case Season.Vasant: // Spring - Petals
        return { 
          count: 50, 
          type: 'petal', 
          colors: ['#ffb7b2', '#ffdac1', '#e2f0cb'], 
          gravity: 0.2, 
          wind: 0.5, 
          blur: 0,
          trails: false 
        };
      case Season.Grishma: // Summer - Dust/Heat/Flares
        return { 
          count: 80, 
          type: 'flare', 
          colors: ['#fff9c4', '#ffffff', '#ffeb3b'], 
          gravity: -0.1, 
          wind: 0.1, 
          blur: 1,
          trails: false 
        };
      case Season.Varsha: // Monsoon - Rain
        return { 
          count: 400, 
          type: 'line', 
          colors: ['#81d4fa', '#4fc3f7', '#b3e5fc'], 
          gravity: 20, 
          wind: -2, 
          blur: 0,
          trails: true 
        };
      case Season.Sharad: // Autumn - Leaves
        return { 
          count: 40, 
          type: 'leaf', 
          colors: ['#ffab91', '#ffcc80', '#d7ccc8'], 
          gravity: 0.8, 
          wind: 1.2, 
          blur: 0,
          trails: false 
        };
      case Season.Hemant: // Pre-winter - Haze
        return { 
          count: 30, 
          type: 'fog', 
          colors: ['#cfd8dc', '#b0bec5', '#78909c'], 
          gravity: 0.05, 
          wind: 0.2, 
          blur: 20,
          trails: false 
        };
      case Season.Shishir: // Winter - Snow
        return { 
          count: 150, 
          type: 'circle', 
          colors: ['#ffffff', '#e1f5fe'], 
          gravity: 1.5, 
          wind: 0.3, 
          blur: 2,
          trails: false 
        };
      default:
        return { count: 100, type: 'circle', colors: ['#ffffff'], gravity: 0.5, wind: 0, blur: 0, trails: false };
    }
  };

  const createParticle = (width: number, height: number, config: any): Particle => {
    const z = Math.random(); // Depth: 0 = far, 1 = near
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      z,
      vx: (Math.random() - 0.5) * 0.5 + config.wind * 0.5,
      vy: (Math.random() * 0.5 + 0.5) * config.gravity,
      size: config.type === 'fog' 
        ? Math.random() * 100 + 50 
        : Math.random() * 3 + (1 + z * 2),
      opacity: config.type === 'fog' 
        ? Math.random() * 0.1 
        : Math.random() * 0.5 + 0.1,
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
      type: config.type as any,
      trail: []
    };
  };

  const initParticles = (width: number, height: number, config: any) => {
    particles.current = [];
    for (let i = 0; i < config.count; i++) {
      particles.current.push(createParticle(width, height, config));
    }
  };

  const drawPetal = (ctx: CanvasRenderingContext2D, p: Particle) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(p.size, -p.size, p.size * 2, 0, 0, p.size * 2);
    ctx.bezierCurveTo(-p.size * 2, 0, -p.size, -p.size, 0, 0);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.restore();
  };

  const drawLeaf = (ctx: CanvasRenderingContext2D, p: Particle) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * 2, p.size, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.restore();
  };

  const drawFlare = (ctx: CanvasRenderingContext2D, p: Particle) => {
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`);
    gradient.addColorStop(0.5, `rgba(255, 255, 255, ${p.opacity * 0.3})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
    ctx.fill();
  };

  const update = (config: any, width: number, height: number) => {
    // Update Particles
    particles.current.forEach(p => {
      // Delta time sim & Depth
      const depthFactor = p.z * 0.8 + 0.2; 
      
      // Wind field simulation based on cursor interaction
      const dx = p.x - mouseRef.current.x;
      const dy = p.y - mouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const interactRadius = 250;
      
      let forceX = 0;
      let forceY = 0;

      if (dist < interactRadius) {
        const force = (interactRadius - dist) / interactRadius;
        const angle = Math.atan2(dy, dx);
        forceX = Math.cos(angle) * force * 3 * p.z;
        forceY = Math.sin(angle) * force * 3 * p.z;
        
        // Velocity inheritance from cursor
        forceX += mouseRef.current.vx * 0.08 * force;
        forceY += mouseRef.current.vy * 0.08 * force;
      }

      p.x += (p.vx + config.wind * depthFactor) + forceX;
      p.y += (p.vy * depthFactor) + forceY;
      p.rotation += p.rotationSpeed;

      // Trail Logic
      if (config.trails) {
        p.trail.unshift({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.pop();
      }

      // Wrap around logic
      if (p.x > width + 50) p.x = -50;
      if (p.x < -50) p.x = width + 50;
      if (p.y > height + 50) {
        p.y = -50;
        // Ripple on rain hitting bottom
        if (config.type === 'line' && Math.random() > 0.85) {
          ripples.current.push({ x: p.x, y: height - Math.random() * 20, radius: 0, opacity: 0.6 });
        }
      }
      if (p.y < -50) p.y = height + 50;
    });

    // Update Ripples
    for (let i = ripples.current.length - 1; i >= 0; i--) {
      const r = ripples.current[i];
      r.radius += 2;
      r.opacity -= 0.03;
      if (r.opacity <= 0) {
        ripples.current.splice(i, 1);
      }
    }
  };

  const draw = (ctx: CanvasRenderingContext2D, config: any) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Background Mist Layer
    if (config.type === 'fog') {
      ctx.filter = `blur(40px)`;
    } else {
      ctx.filter = 'none';
    }

    // Sort by depth for correct occlusion
    particles.current.sort((a, b) => a.z - b.z);

    particles.current.forEach(p => {
      ctx.globalAlpha = p.opacity * p.z;
      
      // Simulated depth blur
      const blurAmount = (1 - p.z) * 2;
      if (config.type !== 'fog' && blurAmount > 0.5) {
        ctx.globalAlpha *= 0.6; 
      }

      if (config.type === 'line') {
        // Draw Rain with Trails
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.5 * p.z;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        // Elongate based on speed
        const len = 15 * (1 + Math.abs(p.vy) * 0.1); 
        ctx.lineTo(p.x + p.vx * 2, p.y + len);
        ctx.stroke();

      } else if (config.type === 'petal') {
        drawPetal(ctx, p);
      } else if (config.type === 'leaf') {
        drawLeaf(ctx, p);
      } else if (config.type === 'flare') {
        drawFlare(ctx, p);
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw Ripples
    ctx.filter = 'none';
    ctx.lineWidth = 1.5;
    ripples.current.forEach(r => {
      ctx.save();
      ctx.strokeStyle = `rgba(129, 212, 250, ${r.opacity})`;
      // Squeeze Y to look perspective-correct on the "ground"
      ctx.scale(1, 0.3); 
      ctx.beginPath();
      ctx.arc(r.x, r.y * 3.33, r.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const config = getSeasonConfig(season);
    initParticles(width, height, config);

    const animate = () => {
      // Calculate mouse velocity for interactivity
      mouseRef.current.vx = mouseRef.current.x - mouseRef.current.lastX;
      mouseRef.current.vy = mouseRef.current.y - mouseRef.current.lastY;
      mouseRef.current.lastX = mouseRef.current.x;
      mouseRef.current.lastY = mouseRef.current.y;

      update(config, width, height);
      draw(ctx, config);
      requestRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles(width, height, config);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [season]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default SeasonalEnvironment;