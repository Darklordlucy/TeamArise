'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
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
    id: 4,
    name: "Uallas Reddy",
    role: "Creative Developer",
    description: "Specializes in WebGL, Three.js and high-performance animations.",
    image: "/team/Uallas Reddy.png",
    skills: ["WebGL", "Three.js", "GLSL", "React Three Fiber", "Performance Optimization"],
    github: "https://github.com/Darklordlucy",
    linkedin: "https://www.linkedin.com/in/uallasreddy"
  }
];

function TeamCard({ member }: { member: any }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full aspect-[4/5] perspective-1000 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden overflow-hidden bg-black/10 rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          
          <div className="absolute bottom-4 left-4 right-4 p-5 bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-xl flex flex-col justify-end">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold tracking-tight">{member.name}</h3>
              <div className="w-5 h-5 flex items-center justify-center opacity-70">
                ↗
              </div>
            </div>
            <p className="font-semibold text-sm opacity-90 mb-3">{member.role}</p>
            <p className="text-xs opacity-90 mb-4 leading-relaxed font-medium">{member.description}</p>
            
            <div className="flex gap-4">
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17 0-1.56-.5-2.8-1.5-3.8.16-.38.65-1.79-.15-3.75 0 0-1.25-.4-4 1.5-1.2-.33-2.5-.5-3.8-.5s-2.6.17-3.8.5c-2.75-1.9-4-1.5-4-1.5-.8 1.96-.31 3.37-.15 3.75-1 .1-1.5 1.24-1.5 3.8 0 5.77 3.35 6.79 6.5 7.17-.6.3-1.1.9-1.3 2.03-.6.3-2.1.8-3-1.2 0 0-.6-1.1-1.6-1.2 0 0-1-.1-.1.9 0 0 1.1.9 1.6 2.5 0 0 .9 2.6 3 2.1v2.9"/></svg>
              </a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden bg-black/90 border border-white/10 text-white p-8 flex flex-col justify-center items-center text-center rounded-sm"
          style={{ transform: "rotateY(180deg)" }}
        >
          <h3 className="text-2xl font-bold mb-6 tracking-tight text-white/90">Skill Set</h3>
          <ul className="space-y-3">
            {member.skills.map((skill: string, index: number) => (
              <li key={index} className="text-lg font-medium text-white/70">
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
    <section className="min-h-screen bg-[#c6c2b6] py-32 px-8 flex items-center">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-24 items-center">
        
        {/* Left Side: Text */}
        <div className="flex flex-col justify-center max-w-xl xl:ml-12 order-2 xl:order-1">
          <p className="text-xl font-bold tracking-widest text-black/90 mb-6">The team</p>
          <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-black/90 mb-10 leading-[1.1]">
            A small team with impressive cred.
          </h2>
          <p className="text-2xl text-black/70 leading-relaxed font-medium">
            Want to work with some of the best global talent and build software used by all the companies you know and love? Join the team — we're hiring remotely all over the world!
          </p>
        </div>

        {/* Right Side: 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:pr-12 order-1 xl:order-2">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

      </div>
    </section>
  );
}
