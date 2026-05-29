'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';

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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const loadImages = () => {
      // Create a fixed-size array to hold images as they load
      const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
      let loadedCount = 0;
      let hasUnblocked = false;

      setImages(loadedImages); // Set reference immediately

      // Dispatch all image load requests concurrently (parallel loading)
      Array.from({ length: FRAME_COUNT }).forEach((_, i) => {
        const img = new Image();
        const frameNum = String(i + 1).padStart(3, '0');
        img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
        
        img.onload = () => {
          loadedImages[i] = img;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
          
          // Unblock the UI as soon as the first frame is ready
          if (loadedImages[0] && !hasUnblocked) {
            hasUnblocked = true;
            setImagesLoaded(true);
          }
        };
        
        img.onerror = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
          if (i === 0 && !hasUnblocked) {
            hasUnblocked = true;
            setImagesLoaded(true);
          }
        };
      });
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

          {/* Left & Right Text Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-8 z-50 flex justify-between pointer-events-none">
            <h1 className="text-7xl md:text-[100px] lg:text-[150px] font-extrabold tracking-normal text-black/90 leading-none -ml-6 md:-ml-12">
              Team
            </h1>
            <h1 className="text-7xl md:text-[100px] lg:text-[150px] font-extrabold tracking-normal text-black/90 leading-none">
              Arise
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
