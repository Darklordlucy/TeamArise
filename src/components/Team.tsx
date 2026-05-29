'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    id: 4,
    name: "Uallas Reddy",
    role: "Creative Developer",
    description: "Specializes in WebGL, Three.js and high-performance animations.",
    image: "/team/Uallas Reddy.png",
    skills: ["WebGL", "Three.js", "GLSL", "React Three Fiber", "Performance Optimization"],
    github: "https://github.com/Darklordlucy",
    linkedin: "https://www.linkedin.com/in/uallasreddy"
  },
  {
    id: 3,
    name: "Saideep Paladi",
    role: "Lead Designer",
    description: "Creating award-winning digital experiences since 2012.",
    image: "/team/Saideep Paladi.png",
    skills: ["UI/UX Design", "Figma", "Prototyping", "Design Systems", "Interaction Design"],
    github: "https://github.com/Saideep72",
    linkedin: "https://www.linkedin.com/in/saideep-paladi/"
  },
  {
    id: 1,
    name: "Aadesh Singh",
    role: "Engineering Manager",
    description: "Lead engineering teams at Figma, Pitch, and Protocol Labs.",
    image: "/team/Aadesh Singh.png",
    skills: ["React", "TypeScript", "Node.js", "System Architecture", "Team Leadership"],
    github: "https://github.com/Aadeshsingh-11",
    linkedin: "https://www.linkedin.com/in/aadeshsingh11/"
  },
  {
    id: 2,
    name: "Anushka Prayagkar",
    role: "Product Manager",
    description: "Former PM for Airtable, Medium, Ghost, and Lumi.",
    image: "/team/Anushka Prayagkar.png",
    skills: ["Product Strategy", "Agile", "User Research", "Roadmapping", "Data Analysis"],
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
            <h3 className="text-xl font-semibold tracking-tight text-white/90 truncate w-full">{member.name}</h3>
            <p className="text-sm text-white/40 mb-3 truncate w-full">{member.role}</p>
            
            <div className="flex gap-3 mt-auto">
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17 0-1.56-.5-2.8-1.5-3.8.16-.38.65-1.79-.15-3.75 0 0-1.25-.4-4 1.5-1.2-.33-2.5-.5-3.8-.5s-2.6.17-3.8.5c-2.75-1.9-4-1.5-4-1.5-.8 1.96-.31 3.37-.15 3.75-1 .1-1.5 1.24-1.5 3.8 0 5.77 3.35 6.79 6.5 7.17-.6.3-1.1.9-1.3 2.03-.6.3-2.1.8-3-1.2 0 0-.6-1.1-1.6-1.2 0 0-1-.1-.1.9 0 0 1.1.9 1.6 2.5 0 0 .9 2.6 3 2.1v2.9"/></svg>
              </a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
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
          <h3 className="text-2xl font-medium mb-4 tracking-tight text-white/90">Skill Set</h3>
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
