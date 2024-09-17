import { useFollowPointer } from '@/hooks/useFollowPointer';
import React, { useEffect, useRef } from 'react';
import { useCursorData } from '@/contexts/CursorContext';
import { Position, Size } from '@/index.types';

import { DEFAULT_TRAILINGSPEED } from '@/constants';

import '@/styles/global.css';

const Cursor: React.FC = () => {
  const { cursorRef, cursorFrozenPosition, cursorSize, cursorStyles } = useCursorData();

  const pointerPosition = useFollowPointer();

  const targetPosition = useRef<Position>(null);
  const targetSize = useRef<Size>(null);
  const requestAnimationRef = useRef<number | null>(null);

  const currentPosition = pointerPosition;

  useEffect(() => {
    if (!cursorRef.current) return;

    const nextPosition = {
      x: cursorFrozenPosition.x || pointerPosition.x,
      y: cursorFrozenPosition.y || pointerPosition.y,
    };

    targetPosition.current = nextPosition;
    targetSize.current = cursorSize;

    Object.assign(cursorRef.current.style, {
      ...cursorStyles,
      width: `${targetSize.current.width}px`,
      height: `${targetSize.current.height}px`,
      borderWidth: `${cursorStyles.borderWidth}px`,
      borderRadius: `${cursorStyles.borderRadius}px`,
    });
  }, [cursorRef, pointerPosition, cursorFrozenPosition, cursorSize, cursorStyles]);

  useEffect(() => {
    const animateCursor = () => {
      if (!cursorRef.current) return;

      currentPosition.x += (targetPosition.current.x - currentPosition.x) / DEFAULT_TRAILINGSPEED;
      currentPosition.y += (targetPosition.current.y - currentPosition.y) / DEFAULT_TRAILINGSPEED;

      Object.assign(cursorRef.current.style, {
        top: `${currentPosition.y}px`,
        left: `${currentPosition.x}px`,
      });

      requestAnimationRef.current = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    return () => {
      if (requestAnimationRef.current) {
        cancelAnimationFrame(requestAnimationRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="cursor" ref={cursorRef} data-testid="cursor" />;
};

export default Cursor;
