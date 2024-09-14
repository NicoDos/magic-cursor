import { useLayoutEffect, useState } from 'react';

export function useWindowScroll() {
  const [scrollPosition, setScrollPosition] = useState({
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  });

  useLayoutEffect(() => {
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
