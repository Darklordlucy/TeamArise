'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "TasteSkill Framework",
    category: "Web Architecture",
    description: "An anti-slop frontend framework for AI agents ensuring pristine and scalable code generation.",
    color: "bg-[#2C2D2E]"
  },
  {
    id: 2,
    title: "Crimson Plume",
    category: "Creative Storytelling",
    description: "High-end scrollytelling landing page pushing the boundaries of web animation and visual design.",
    color: "bg-[#1f2022]"
  },
  {
    id: 3,
    title: "Nexus Dashboard",
    category: "UI/UX Design",
    description: "A comprehensive data visualization dashboard handling massive real-time data streams with elegance.",
    color: "bg-[#3a3b3d]"
  },
  {
    id: 4,
    title: "Aura Mobile",
    category: "Mobile Application",
    description: "Award-winning iOS and Android application with fluid gesture-based interactions and sleek minimalism.",
    color: "bg-[#18191a]"
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} id="projects" className="relative bg-[#c6c2b6] pb-[10vh]">
      <div className="pt-24 pb-4 relative z-0 px-8 w-full flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-left">
          <p className="text-lg font-semibold tracking-widest text-black/60 mb-4 uppercase">Our Work</p>
          <h2 className="text-7xl md:text-[130px] lg:text-[160px] font-extrabold tracking-tighter text-black/90 leading-none">
            Projects
          </h2>
        </div>
        <div className="text-center max-w-4xl flex flex-col justify-center">
          <p className="text-2xl md:text-3xl text-black/60 font-medium leading-relaxed">
            A curated selection of our finest engineering and design achievements. Each project is built for massive scale and crafted with obsessive precision.
          </p>
        </div>
      </div>

      <div className="relative z-10">
        {projects.map((project, i) => {
          // Calculate scale. As new cards come on top, the older cards shrink slightly into the background.
          const targetScale = 1 - ( (projects.length - i) * 0.05 );
          // The scroll range where this specific card starts shrinking (when it hits the top).
          // Since there are 4 cards, each takes roughly 25% of the scroll space.
          const range = [i * 0.25, 1];
          const scale = useTransform(scrollYProgress, range, [1, targetScale]);
          
          return (
            <div key={project.id} className="h-screen w-full flex items-center justify-center sticky top-0">
              <motion.div 
                style={{ 
                  scale, 
                  top: `calc(10vh + ${i * 30}px)` 
                }} 
                className={`w-[90vw] max-w-[1100px] h-[70vh] rounded-[40px] p-10 md:p-16 shadow-2xl flex flex-col justify-between ${project.color} border border-white/5 relative origin-top`}
              >
                <div>
                   <p className="text-white/40 tracking-widest uppercase font-bold text-sm md:text-base mb-4">{project.category}</p>
                   <h3 className="text-5xl md:text-7xl font-bold text-white/90 tracking-tight">{project.title}</h3>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl leading-relaxed">{project.description}</p>
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md cursor-pointer hover:bg-white/20 transition-colors border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-80"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
