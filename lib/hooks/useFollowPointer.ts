import { useEffect, useState } from 'react';
import { useWindowScroll } from './useWindowScroll';

export function useFollowPointer() {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const { scrollX, scrollY } = useWindowScroll();

  useEffect(() => {
    if (!window) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      setPoint({ x: clientX + scrollX, y: clientY + scrollY });
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [scrollX, scrollY]);

  return point;
}
