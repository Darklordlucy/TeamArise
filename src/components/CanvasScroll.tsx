'use client';

import Image from 'next/image';

export default function CanvasScroll() {
  return (
    <div id="home" className="h-screen w-full relative bg-[#c6c2b6] overflow-hidden">
      {/* Background Text */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none select-none">
        <h1 className="text-[16vw] font-serif font-bold tracking-tighter text-[#1a1a1a] leading-none whitespace-nowrap flex justify-center gap-[8vw] md:gap-[12vw]">
          <span>Team</span>
          <span>Arise</span>
        </h1>
      </div>

      {/* Static Background Image with cover positioning and multiply blending */}
      <div className="absolute inset-0 w-full h-full z-10 mix-blend-multiply pointer-events-none select-none">
        <Image
          src="/image.png"
          alt="Team Arise Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Bottom Labels */}
      <div className="absolute bottom-8 left-0 w-full px-6 md:px-12 z-20 flex justify-between items-end pointer-events-none">
        <div className="flex flex-col gap-1 text-black">
          <span className="text-xs md:text-sm font-medium opacity-100">THIS IS </span>
          <span className="text-sm md:text-base font-bold tracking-wide">NOT JUST A TEAM</span>
        </div>
        <div className="flex gap-4 md:gap-8 text-xs md:text-sm font-bold tracking-widest text-black pointer-events-auto">
          <a href="#" className="hover:opacity-50 transition-opacity">THINK</a>
          <a href="#" className="hover:opacity-50 transition-opacity">BUILD</a>
          <a href="#" className="hover:opacity-50 transition-opacity">PRESENT</a>
        </div>
      </div>
    </div>
  );
}

