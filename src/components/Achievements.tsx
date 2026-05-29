'use client';
import { motion } from 'framer-motion';

const achievements = [
  {
    id: 1,
    title: "First Hackathon Victory",
    date: "Late 2023",
    description: "Secured first place in our debut hackathon by building a high-performance web application under extreme time constraints.",
    dotColor: "bg-gradient-to-br from-yellow-300 to-yellow-500 border-black shadow-[0_0_15px_rgba(250,204,21,0.5)]",
  },
  {
    id: 2,
    title: "Innovation Award",
    date: "Early 2024",
    description: "Won our second major hackathon, recognized specifically for exceptional UI/UX design and creative problem solving.",
    dotColor: "bg-gradient-to-br from-gray-200 to-gray-400 border-black shadow-[0_0_15px_rgba(156,163,175,0.5)]",
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="min-h-screen bg-[#c6c2b6] py-32 px-8 relative">
      <div className="max-w-[1200px] mx-auto w-full relative">
        <div className="text-center mb-24">
           <p className="text-lg font-semibold tracking-widest text-black/60 mb-4 uppercase">Our Journey</p>
           <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-black/90">Achievements</h2>
        </div>

        <div className="relative">
          {/* Timeline Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-black/15 transform -translate-x-1/2 hidden md:block rounded-full"></div>

          <div className="flex flex-col gap-16 md:gap-24 relative z-10">
            {achievements.map((achievement, index) => {
              // First achievement on the right, so if index is 0 -> right side.
              // That means left is empty, right is content.
              const isRightSide = index % 2 === 0;
              
              return (
                <div key={achievement.id} className={`flex flex-col md:flex-row items-center justify-between w-full ${!isRightSide ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Empty Space for the opposite side */}
                  <div className="hidden md:block md:w-5/12"></div>

                  {/* Timeline Dot */}
                  <div className="hidden md:flex w-2/12 justify-center relative">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className={`w-7 h-7 rounded-full border-4 shadow-md z-10 ${achievement.dotColor}`}
                    ></motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isRightSide ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                    className="w-full md:w-5/12"
                  >
                    <div className="bg-[#2C2D2E] rounded-3xl p-8 sm:p-10 shadow-xl border border-white/5 relative group hover:-translate-y-2 transition-transform duration-300">
                      {/* Triangle pointer for desktop */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent ${isRightSide ? '-left-4 border-r-[16px] border-r-[#2C2D2E]' : '-right-4 border-l-[16px] border-l-[#2C2D2E]'}`}></div>
                      
                      <span className="text-sm font-bold text-white/40 tracking-widest uppercase mb-3 block">{achievement.date}</span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white/90 mb-4 tracking-tight">{achievement.title}</h3>
                      <p className="text-white/60 leading-relaxed font-medium text-base sm:text-lg">
                        {achievement.description}
                      </p>
                    </div>
                  </motion.div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
