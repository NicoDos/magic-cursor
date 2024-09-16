import { useFollowPointer } from '../hooks/useFollowPointer';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDataCursor } from '../contexts/CursorContext';
import { CursorCoordinates, CursorSize } from '../index.d';

import '../styles/global.css';
import { DEFAULT_TRAILINGSPEED } from '../constants';

const Cursor = () => {
  const { cursorRef, x, y, height, width, borderColor, borderWidth, borderRadius } =
    useDataCursor();

  const { x: pointerX, y: pointerY } = useFollowPointer();

  const endX = useRef(0);
  const endY = useRef(0);
  const endWidth = useRef(0);
  const endHeight = useRef(0);
  const requestAnimationRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  const [coords, setCoords] = useState<CursorCoordinates>({ x: pointerX, y: pointerY });
  const [size, setSize] = useState<CursorSize>({ width, height });

  const animateCursor = useCallback(
    (time: number) => {
      if (previousTimeRef.current) {
        coords.x += (endX.current - coords.x) / DEFAULT_TRAILINGSPEED;
        coords.y += (endY.current - coords.y) / DEFAULT_TRAILINGSPEED;
        size.width += endWidth.current - size.width;
        size.height += endHeight.current - size.height;

        if (cursorRef.current) {
          Object.assign(cursorRef.current.style, {
            top: `${coords.y}px`,
            left: `${coords.x}px`,
            width: `${size.width}px`,
            height: `${size.height}px`,
          });
        }
      }
      previousTimeRef.current = time;
      requestAnimationRef.current = requestAnimationFrame(animateCursor);
    },
    [requestAnimationRef]
  );

  useEffect(() => {
    requestAnimationRef.current = requestAnimationFrame(animateCursor);
    return () => {
      if (requestAnimationRef.current) {
        cancelAnimationFrame(requestAnimationRef.current);
      }
    };
  }, [animateCursor]);

  useEffect(() => {
    if (!cursorRef.current) return;

    const newX = x !== 0 ? x : pointerX;
    const newY = y || pointerY;
    setCoords({ x: newX, y: newY });
    setSize({ width, height });

    endX.current = newX;
    endY.current = newY;
    endWidth.current = width;
    endHeight.current = height;

    Object.assign(cursorRef.current.style, {
      borderColor,
      borderWidth: `${borderWidth}px`,
      borderRadius: `${borderRadius}px`,
    });
  }, [cursorRef, pointerX, pointerY, x, y, height, width, borderColor, borderWidth, borderRadius]);

  return <div className="cursor" ref={cursorRef} />;
};

export default React.memo(Cursor);
