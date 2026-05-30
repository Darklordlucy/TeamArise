'use client';
import { useState } from 'react';

const links = [
  { name: 'Home', id: 'home' },
  { name: 'Members', id: 'members' },
  { name: 'Achievements', id: 'achievements' },
  { name: 'Projects', id: 'projects' },
  { name: 'Moto', id: 'moto' }
];

export default function Navbar() {
  const [active, setActive] = useState('home');

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActive(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 pt-6 pb-4 flex items-center justify-between w-full">
      {/* Brand Name */}
      <div className="flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Team Arise Logo" className="h-[60px] md:h-[60px] w-auto object-contain" />
      </div>

      {/* Glass Navbar */}
      <nav className="flex items-center h-[52px] gap-1 px-2 rounded-full bg-white/20 backdrop-blur-md border border-black/5 shadow-lg text-sm font-medium tracking-tight">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => handleScroll(e, link.id)}
            className={`px-5 py-2 rounded-full transition-all duration-300 ${
              active === link.id
                ? 'bg-black/15 text-black shadow-sm'
                : 'text-black/70 hover:bg-black/5 hover:text-black'
            }`}
          >
            {link.name}
          </a>
        ))}
      </nav>
    </header>
  );
}
