'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

// Generates random particles
const generateParticles = (count: number) => {
  return Array.from({ length: count }).map((_, i) => {
    const x = Math.random(); // 0 to 1
    const y = Math.random(); // 0 to 1
    // The burn starts at bottom-right (x=1, y=1) and ends at top-left (x=0, y=0).
    // A point's "burn delay" is purely based on how close it is to top-left.
    const normalizedDelay = ((1 - x) + (1 - y)) / 2; // 0 at bottom-right, 1 at top-left
    return {
      id: i,
      x: x * 100, // percentage
      y: y * 100, // percentage
      delay: normalizedDelay,
      size: Math.random() * 5 + 2, // 2px to 7px
      color: Math.random() > 0.4 ? '#ff4500' : (Math.random() > 0.5 ? '#ffa500' : '#222222'),
    };
  });
};

// Render a single particle so hooks are called at the component level
function Particle({ p, scrollYProgress }: { p: any, scrollYProgress: any }) {
  const startTrigger = 0.1 + (p.delay * 0.6); // mapped to 0.1 - 0.7
  const endTrigger = startTrigger + 0.15;
  
  const xMove = useTransform(scrollYProgress, [startTrigger, endTrigger], [0, -150 - (Math.random() * 200)]); // fly left
  const yMove = useTransform(scrollYProgress, [startTrigger, endTrigger], [0, -200 - (Math.random() * 200)]); // fly up
  const pOpacity = useTransform(scrollYProgress, [startTrigger, startTrigger + 0.05, endTrigger], [0, 1, 0]); // fade in then out quickly
  const scale = useTransform(scrollYProgress, [startTrigger, endTrigger], [1, 0]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        backgroundColor: p.color,
        borderRadius: '50%',
        opacity: pOpacity,
        x: xMove,
        y: yMove,
        scale
      }}
      className="shadow-sm"
    />
  );
}

export default function Moto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(generateParticles(120)); // Generate 120 ash particles
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // The card reveals from scroll progress 0.2 to 0.8
  // mask percent goes from -10 to 110
  const maskPercent = useTransform(scrollYProgress, [0.1, 0.8], [-10, 110]);
  const maskImage = useMotionTemplate`linear-gradient(to top left, transparent ${maskPercent}%, black calc(${maskPercent}% + 4%))`;
  const burnEdge = useMotionTemplate`linear-gradient(to top left, transparent ${maskPercent}%, #ff4500 calc(${maskPercent}% + 1%), #ffaa00 calc(${maskPercent}% + 2%), transparent calc(${maskPercent}% + 5%))`;

  return (
    <section ref={containerRef} id="moto" className="h-[300vh] bg-[#c6c2b6] relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-8 md:px-16">
        
        {/* Main Card Wrapper with the Mask applied */}
        <motion.div 
          style={{ WebkitMaskImage: maskImage, maskImage }}
          className="relative group max-w-7xl w-full mx-auto"
        >
          {/* Outer diffuse glow */}
          <div className="absolute -inset-4 sm:-inset-6 rounded-[3rem] sm:rounded-[4rem] bg-white opacity-50 blur-3xl transition duration-1000"></div>
          
          {/* Sharp Border Glow */}
          <div className="absolute -inset-[3px] rounded-[2.5rem] sm:rounded-[3.5rem] bg-white opacity-100 transition duration-700 shadow-[0_0_40px_rgba(255,255,255,1)]"></div>
          
          {/* Main content background */}
          <div className="relative bg-[#1f2022] rounded-[2.5rem] sm:rounded-[3.5rem] py-16 px-8 md:py-24 md:px-16 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden">
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px] bg-gradient-to-b from-white/5 to-transparent opacity-50 blur-3xl rounded-[100%] pointer-events-none"></div>

            <p className="text-white/40 tracking-widest uppercase font-bold text-sm md:text-lg mb-6 relative z-10">
              The Moto
            </p>
            
            <h2 className="text-5xl sm:text-7xl lg:text-[100px] font-extrabold text-white/90 tracking-tighter leading-[1.05] mb-8 relative z-10 w-full max-w-5xl">
              "Where winning is everything"
            </h2>
            
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full mb-12 relative z-10"></div>
            
            <p className="text-white/60 text-lg sm:text-2xl font-medium max-w-4xl leading-relaxed relative z-10">
              We don't just build software. We craft elite digital experiences designed to dominate the market and captivate users at first glance. Excellence isn't an option—it's our standard.
            </p>

            {/* Fiery Burn Edge Overlay */}
            <motion.div 
              style={{ backgroundImage: burnEdge }} 
              className="absolute inset-0 z-50 pointer-events-none mix-blend-screen opacity-90 blur-[2px]"
            ></motion.div>
          </div>
        </motion.div>

        {/* Ash Particles overlay */}
        <div className="absolute inset-0 pointer-events-none max-w-7xl w-full mx-auto px-8 md:px-16 flex items-center justify-center h-screen">
          <div className="relative w-full h-[60vh]">
            {particles.map((p) => (
              <Particle key={p.id} p={p} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
