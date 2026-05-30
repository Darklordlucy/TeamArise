'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const FRAME_COUNT = 271;

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
    let active = true;

    const loadImages = async () => {
      // Create a fixed-size array to hold images as they load
      const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
      if (!active) return;
      setImages(loadedImages);

      // 1. Explicitly load the first frame to unblock the UI instantly
      const loadFirstFrame = () => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = '/frames/ezgif-frame-001.jpg';
          img.onload = () => {
            if (!active) {
              resolve();
              return;
            }
            loadedImages[0] = img;
            setImagesLoaded(true);
            setLoadProgress(Math.round((1 / FRAME_COUNT) * 100));
            resolve();
          };
          img.onerror = () => {
            if (!active) {
              resolve();
              return;
            }
            // Even on error, unblock the UI so the user can interact
            setImagesLoaded(true);
            resolve();
          };
        });
      };

      await loadFirstFrame();
      if (!active) return;

      // 2. Load the remaining frames in a controlled background queue (concurrency limit of 6)
      // This prevents browser network starvation and keeps the channel free for other critical assets.
      const CONCURRENCY = 6;
      let nextIndex = 1; // start from second frame (index 1)
      let loadedCount = 1;

      const worker = async () => {
        while (active && nextIndex < FRAME_COUNT) {
          const index = nextIndex++;
          if (index >= FRAME_COUNT) break;

          await new Promise<void>((resolve) => {
            const img = new Image();
            const frameNum = String(index + 1).padStart(3, '0');
            img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
            img.onload = () => {
              if (active) {
                loadedImages[index] = img;
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
              }
              resolve();
            };
            img.onerror = () => {
              if (active) {
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
              }
              resolve();
            };
          });
        }
      };

      // Spawn parallel worker queues
      const workers = Array.from({ length: CONCURRENCY }, () => worker());
      await Promise.all(workers);
    };

    loadImages();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const renderFrame = (index: number) => {
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(index)));
      let img = images[idx];

      // Fallback: If current frame isn't loaded yet due to fast scrolling, 
      // find the most recent loaded frame so the canvas doesn't flash empty.
      if (!img) {
        for (let i = idx; i >= 0; i--) {
          if (images[i]) {
            img = images[i];
            break;
          }
        }
      }

      if (img && context) {
        // Use client width/height which represents CSS pixels
        const canvasW = canvas.clientWidth;
        const canvasH = canvas.clientHeight;

        context.clearRect(0, 0, canvasW, canvasH);

        // cover fit logic
        const hRatio = canvasW / img.width;
        const vRatio = canvasH / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvasW - img.width * ratio) / 2;
        const centerShift_y = (canvasH - img.height * ratio) / 2;

        context.drawImage(
          img, 
          0, 
          0, 
          img.width, 
          img.height,
          Math.floor(centerShift_x), 
          Math.floor(centerShift_y), 
          Math.floor(img.width * ratio), 
          Math.floor(img.height * ratio)
        );
      }
    };

    // Resize canvas to match screen and scale by DPR
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      if (context) {
        context.scale(dpr, dpr);
      }
      
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
          {/* Background Text */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none">
            <h1 className="text-[16vw] font-serif font-bold tracking-tighter text-[#1a1a1a] leading-none whitespace-nowrap flex justify-center gap-[8vw] md:gap-[12vw]">
              <span>Team</span>
              <span>Arise</span>
            </h1>
          </div>

          <canvas ref={canvasRef} className="w-full h-full block relative z-10 mix-blend-multiply" />

          {/* Bottom Labels */}
          <div className="absolute bottom-8 left-0 w-full px-6 md:px-12 z-50 flex justify-between items-end pointer-events-none">
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
      )}
    </div>
  );
}
