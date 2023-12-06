import { useState, useEffect } from 'react';

export interface IScrollData {
  x: number;
  y: number;
  lastX: number;
  lastY: number;
  scrollDirection: number;
}

/**
 * Hook for tracking scroll position and direction.
 * Dependencies: React (useState, useEffect)
 */
export default function useScrollListener(): IScrollData {
  const [scrollData, setScrollData] = useState<IScrollData>({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    scrollDirection: 0, // 1 = down, -1 = up
  });

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollData(prevScrollData => ({
        x: window.scrollX,
        y: window.scrollY,
        lastX: prevScrollData.x,
        lastY: prevScrollData.y,
        scrollDirection: prevScrollData.y > window.scrollY ? 1 : -1,
      }));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollData;
}
