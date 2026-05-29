'use client';
import { motion } from 'framer-motion';

export default function Moto() {
  return (
    <section id="moto" className="min-h-[90vh] bg-[#c6c2b6] py-32 px-4 sm:px-8 flex items-center justify-center relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative group max-w-6xl w-full mx-auto"
      >
        {/* Outer diffuse glow that expands on hover */}
        <div className="absolute -inset-4 sm:-inset-6 rounded-[3rem] sm:rounded-[4rem] bg-gradient-to-r from-gray-400 via-[#c6c2b6] to-gray-500 opacity-0 group-hover:opacity-60 blur-2xl transition duration-1000"></div>
        
        {/* Sharp Border Glow */}
        <div className="absolute -inset-[2px] rounded-[2.5rem] sm:rounded-[3.5rem] bg-gradient-to-br from-white/10 via-white/30 to-black/40 opacity-70 group-hover:opacity-100 transition duration-700"></div>
        
        {/* Main content background */}
        <div className="relative bg-[#1f2022] rounded-[2.5rem] sm:rounded-[3.5rem] p-10 sm:p-20 md:p-32 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden">
          
          {/* Subtle noise/texture or light beam inside the card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px] bg-gradient-to-b from-white/5 to-transparent opacity-50 blur-3xl rounded-[100%] pointer-events-none"></div>

          <p className="text-white/40 tracking-widest uppercase font-bold text-sm md:text-lg mb-8 relative z-10">
            The Moto
          </p>
          
          <h2 className="text-5xl sm:text-7xl lg:text-[110px] font-extrabold text-white/90 tracking-tighter leading-[1.05] mb-12 relative z-10">
            "Where winning is<br />everything"
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full mb-12 relative z-10"></div>
          
          <p className="text-white/60 text-lg sm:text-2xl font-medium max-w-4xl leading-relaxed relative z-10">
            We don't just build software. We craft elite digital experiences designed to dominate the market and captivate users at first glance. Excellence isn't an option—it's our standard.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
