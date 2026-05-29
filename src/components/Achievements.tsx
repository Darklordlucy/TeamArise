'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const achievements = [
  {
    id: 1,
    title: "Techithon - 26",
    date: "28-Jan-26",
    location: "Atharva University, Mumbai",
    position: "2nd Place (Fintech)",
    prize: "15,000",
  },
  {
    id: 2,
    title: "Nexus-2.0",
    date: "25-Apr-26",
    location: "IIIT Pune, Pune",
    position: "1st Place",
    prize: "14,000",
  }
];

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(400);

  useEffect(() => {
    const updateRadius = () => {
      setRadius(window.innerWidth < 768 ? 200 : 400);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Rotate the wheel horizontally as the user scrolls (1 full rotation)
  const wheelRotation = useTransform(smoothProgress, [0, 1], [0, -360]);
  const numItems = achievements.length;

  return (
    <section id="achievements" ref={containerRef} className="bg-[#c6c2b6] relative w-full h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col perspective-[1200px]">
        
        {/* Header */}
        <div className="w-full text-center py-12 md:py-16 shrink-0 z-20 relative">
           <p className="text-lg font-semibold tracking-widest text-black/60 mb-2 md:mb-4 uppercase">Our Journey</p>
           <h2 className="text-6xl md:text-[100px] lg:text-[150px] font-extrabold tracking-tighter text-black/90 leading-none">
             Achievements
           </h2>
        </div>

        {/* 3D Horizontal Carousel */}
        <div className="flex-1 w-full relative flex items-center justify-center pb-12" style={{ perspective: '1200px' }}>
          <motion.div 
            style={{ 
              rotateY: wheelRotation,
              transformStyle: "preserve-3d"
            }}
            className="relative w-full max-w-5xl mx-auto flex items-center justify-center"
          >
            {achievements.map((achievement, index) => {
              const angle = (360 / numItems) * index;
              
              const counterRotation = useTransform(wheelRotation, (val) => -val - angle);

              const opacity = useTransform(wheelRotation, (val) => {
                const currentAngle = (val + angle) % 360;
                const normalizedAngle = currentAngle < 0 ? currentAngle + 360 : currentAngle;
                const dist = Math.min(normalizedAngle, 360 - normalizedAngle);
                
                if (dist < 60) return 1;
                if (dist > 120) return 0;
                return 1 - ((dist - 60) / 60);
              });
              
              const scale = useTransform(wheelRotation, (val) => {
                const currentAngle = (val + angle) % 360;
                const normalizedAngle = currentAngle < 0 ? currentAngle + 360 : currentAngle;
                const dist = Math.min(normalizedAngle, 360 - normalizedAngle);
                
                return 1 - (dist / 180) * 0.3;
              });

              return (
                <div 
                  key={achievement.id} 
                  className="absolute flex justify-center"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    transformStyle: "preserve-3d"
                  }}
                >
                  <motion.div 
                    style={{ 
                      rotateY: counterRotation,
                      opacity: opacity,
                      scale: scale
                    }}
                    className="w-[280px] sm:w-[340px] md:w-[380px]"
                  >
                    {/* Minimal Black & White Card Design */}
                    <div className="bg-[#1e1f22] rounded-3xl overflow-hidden shadow-2xl border border-white/5 relative group transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                      
                      {/* Top Accent Line - White */}
                      <div className="absolute top-0 left-0 w-full h-[4px] bg-white/20"></div>

                      <div className="p-6 sm:p-8 flex flex-col items-start text-left h-full">
                        
                        {/* Header: Date & Position Badge */}
                        <div className="w-full flex justify-between items-start mb-5">
                          <span className="text-xs font-bold text-white/50 tracking-widest uppercase bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                            {achievement.date}
                          </span>
                          <span className="text-xs font-bold text-white/80 bg-white/10 px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
                            {achievement.position}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white/95 mb-3 tracking-tight leading-tight">
                          {achievement.title}
                        </h3>
                        
                        {/* Location */}
                        <div className="flex items-center gap-2 mb-8 text-white/60">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          <span className="text-sm font-medium">{achievement.location}</span>
                        </div>

                        {/* Highlighted Prize Money - Pure White */}
                        <div className="w-full mt-auto pt-5 border-t border-white/10">
                          <p className="text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Prize Money</p>
                          <div className="flex items-center gap-1">
                            <span className="text-4xl sm:text-5xl font-black text-white tracking-tighter drop-shadow-md">
                              ₹{achievement.prize}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
