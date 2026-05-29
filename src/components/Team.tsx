export default function Team() {
  const teamMembers = [
    {
      name: "Alex Mercer",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Jordan Lee",
      role: "Lead Animator",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Sam Taylor",
      role: "Technical Artist",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Morgan Chen",
      role: "VFX Specialist",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <section className="min-h-screen bg-[#c6c2b6] py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-black/90 mb-6">
            The Minds Behind the Magic
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto">
            A collective of visionaries, artists, and engineers pushing the boundaries of what's possible in digital storytelling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5] bg-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-black/90 mb-1">{member.name}</h3>
              <p className="text-lg font-medium text-black/50">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
