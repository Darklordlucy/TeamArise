import CanvasScroll from '@/components/CanvasScroll';
import Team from '@/components/Team';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#c6c2b6]">
      <CanvasScroll />
      <Team />
    </main>
  );
}
