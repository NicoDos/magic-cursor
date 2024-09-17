import { useLayoutEffect, useState } from 'react';

export function useWindowScroll() {
  const [scrollPosition, setScrollPosition] = useState({
    scrollX: 0,
    scrollY: 0,
  });

  useLayoutEffect(() => {
    if (!window) return;

    const handleScroll = () => {
      setScrollPosition({ scrollX: window.scrollX, scrollY: window.scrollY });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
}
