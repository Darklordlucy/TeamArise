export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 pt-6 pb-4 flex items-center justify-between w-full">
      {/* Brand Name */}
      <div className="flex items-center h-[52px]">
        <span className="text-xl font-bold tracking-tight text-black/90">Team Arise</span>
      </div>

      {/* Glass Navbar */}
      <nav className="flex items-center h-[52px] gap-8 px-8 rounded-full bg-white/10 backdrop-blur-md border border-black/5 shadow-lg text-black/70 font-medium tracking-tight">
        <a href="#" className="hover:text-black transition-colors duration-300">Home</a>
        <a href="#" className="hover:text-black transition-colors duration-300">Members</a>
        <a href="#" className="hover:text-black transition-colors duration-300">Achievements</a>
        <a href="#" className="hover:text-black transition-colors duration-300">Projects</a>
        <a href="#" className="hover:text-black transition-colors duration-300">Moto</a>
      </nav>
    </header>
  );
}
