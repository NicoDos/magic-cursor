import { useLayoutEffect, useState } from 'react';
import { useWindowScroll } from './useWindowScroll';

export const useFollowPointer = () => {
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const { scrollX, scrollY } = useWindowScroll();

  useLayoutEffect(() => {
    if (!window) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      setPointerPosition({ x: clientX + scrollX, y: clientY + scrollY });
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [scrollX, scrollY]);

  return pointerPosition;
};
