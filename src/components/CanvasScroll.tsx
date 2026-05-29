'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const FRAME_COUNT = 50;

export default function CanvasScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    // Preload all images
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        const frameNum = String(i + 1).padStart(3, '0');
        img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
        await new Promise((resolve) => {
          img.onload = () => {
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
            resolve(null);
          };
          img.onerror = () => {
            // Handle error, just skip or resolve to keep going
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
            resolve(null);
          };
        });
        loadedImages.push(img);
      }
      setImages(loadedImages);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const renderFrame = (index: number) => {
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(index)));
      const img = images[idx];
      if (img && context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // cover fit logic
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        
        context.drawImage(img, 0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
    };

    // Resize canvas to match screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(frameIndex.get());
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // initial size

    const unsubscribe = frameIndex.on('change', (latest) => {
      renderFrame(latest);
    });

    // Draw first frame immediately
    renderFrame(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      unsubscribe();
    };
  }, [imagesLoaded, images, frameIndex]);

  return (
    <div id="home" ref={containerRef} className={`${imagesLoaded ? 'h-[400vh]' : 'h-screen'} relative bg-[#c6c2b6]`}>
      {!imagesLoaded ? (
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-[#c6c2b6] z-50">
          <div className="w-16 h-16 border-4 border-black/10 border-t-black/90 rounded-full animate-spin"></div>
          <p className="mt-4 text-black/60 font-medium tracking-wide">
            Loading Cinematic... {loadProgress}%
          </p>
        </div>
      ) : (
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full block" />
          
          {/* Bottom Right Content */}
          <div className="absolute bottom-8 right-8 z-50 flex flex-col items-end text-right">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black/90">Team Arise</h1>
            <p className="text-lg md:text-xl font-medium text-black/60 mt-1">" Where winning is everything"</p>
          </div>
        </div>
      )}
    </div>
  );
}
