'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    id: 1,
    name: "Uallas Reddy",
    role: "AI ML Engineer",
    description: "Specializes in AI workflows, system designing, and backend engineering.",
    image: "/team/Uallas Reddy.png",
    skills: ["Supervised learning", "UnSupervised learning", "ANN", "CNN", "AI workflows", "System designing", "LLMs", "Backend Engineering"],
    github: "https://github.com/Darklordlucy",
    linkedin: "https://www.linkedin.com/in/uallasreddy"
  },
  {
    id: 2,
    name: "Saideep Paladi",
    role: "IOT and embedding system",
    description: "Hardware architecture designer and Python/Linux expert.",
    image: "/team/Saideep Paladi.png",
    skills: ["pythonist", "Linux operator", "TCP", "IP", "Hardware artitecture designer"],
    github: "https://github.com/Saideep72",
    linkedin: "https://www.linkedin.com/in/saideep-paladi/"
  },
  {
    id: 3,
    name: "Aadesh Singh",
    role: "ML engineer",
    description: "Expert in deep learning, neural networks, and RAG.",
    image: "/team/Aadesh Singh.png",
    skills: ["Supervised learning", "UnSupervised learning", "ANN", "CNN", "RAG"],
    github: "https://github.com/Aadeshsingh-11",
    linkedin: "https://www.linkedin.com/in/aadeshsingh11/"
  },
  {
    id: 4,
    name: "Anushka Prayagkar",
    role: "Web designer",
    description: "Crafting beautiful UI and integrating APIs efficiently.",
    image: "/team/Anushka Prayagkar.png",
    skills: ["Javascript", "react", "Figma", "API Integration"],
    github: "https://github.com/Anushka-prayagkar",
    linkedin: "https://www.linkedin.com/in/anushka-prayagkar/"
  }
];

function TeamCard({ member }: { member: any }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full perspective-1000 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full relative preserve-3d"
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="backface-hidden bg-[#2C2D2E] rounded-3xl p-3 sm:p-5 flex flex-col sm:flex-row items-stretch gap-4 justify-between shadow-xl border border-white/5">
          {/* Details (Left) */}
          <div className="flex flex-col items-start text-left flex-1 min-w-0 pl-2 py-2">
            <div className="w-10 h-10 bg-[#353638] rounded-xl flex items-center justify-center mb-4 sm:mb-8 border border-white/5 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/70"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/95 truncate w-full mb-1">{member.name}</h3>
            <p className="text-base sm:text-lg text-white/50 mb-3 truncate w-full font-medium">{member.role}</p>
            
            <div className="flex gap-5 mt-auto">
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
          
          {/* Image (Right) */}
          <div className="w-full sm:w-[240px] h-[180px] overflow-hidden rounded-2xl relative flex-shrink-0 bg-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden bg-[#2C2D2E] rounded-3xl p-6 shadow-xl border border-white/5 flex flex-col justify-center items-center text-center"
          style={{ transform: "rotateX(180deg)" }}
        >
          <h3 className="text-2xl font-medium mb-4 tracking-tight text-white/90">Tech Stack</h3>
          <ul className="flex flex-wrap justify-center gap-2">
            {member.skills.map((skill: string, index: number) => (
              <li key={index} className="text-sm font-medium text-white/70 bg-white/10 px-3 py-1.5 rounded-full">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default function Team() {
  return (
    <section id="members" className="bg-[#c6c2b6] pt-32 pb-0 px-8 flex items-start w-full">
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20 items-start">
        
        {/* Left Side: Text (1 part) */}
        <div className="flex flex-col justify-start lg:col-span-1 pl-4 lg:pl-8 sticky top-32">
          <p className="text-lg font-semibold tracking-widest text-black/60 mb-4 uppercase">The team</p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-black/90 mb-8 leading-[1.1]">
            A small team with impressive cred.
          </h2>
          <p className="text-xl text-black/70 leading-relaxed font-medium">
            Want to work with some of the best global talent and build software used by all the companies you know and love? Join the team — we're hiring remotely all over the world!
          </p>
        </div>

        {/* Right Side: Cards (2 parts) */}
        <div className="lg:col-span-2 flex flex-col gap-6 xl:pr-12 order-1 xl:order-2">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

      </div>
    </section>
  );
}
