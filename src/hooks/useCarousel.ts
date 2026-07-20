import { useRef } from 'react';

export function useCarousel<T extends HTMLElement>() {
  const trackRef = useRef<T | null>(null);

  const scrollByPage = (direction: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9;
    el.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' });
  };

  return { trackRef, scrollByPage };
}
