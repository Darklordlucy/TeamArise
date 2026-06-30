'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode } from 'react';

interface SmoothScrollingProps {
  children: ReactNode;
}

export default function SmoothScrolling({ children }: SmoothScrollingProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08, // The lower the number, the smoother/heavier the scroll
        duration: 1.2, // Adjusts the global scroll speed
        smoothWheel: true,
        // Optional: you can enable smooth touch for mobile, but native usually feels better
        // syncTouch: true, 
      }}
    >
      {children as any}
    </ReactLenis>
  );
}
