import { useFollowPointer } from '../hooks/useFollowPointer';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CursorContext } from '../contexts/CursorContext';
import { CursorCoordinates, CursorSize } from '../index.d';

import '../styles/global.css';
import { DEFAULT_TRAILINGSPEED } from '../constants';

const Cursor = () => {
  const { cursorRef, x, y, height, width, borderColor, borderWidth, borderRadius } =
    useContext(CursorContext);
  const endX = useRef(0);
  const endY = useRef(0);
  const endWidth = useRef(0);
  const endHeight = useRef(0);
  const requestAnimationRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const { x: pointerX, y: pointerY } = useFollowPointer();
  const [coords, setCoords] = useState<CursorCoordinates>({
    x: pointerX,
    y: pointerY,
  });
  const [size, setSize] = useState<CursorSize>({
    width,
    height,
  });

  const animateCursor = useCallback(
    (time: number) => {
      if (previousTimeRef.current) {
        coords.x += (endX.current - coords.x) / DEFAULT_TRAILINGSPEED;
        coords.y += (endY.current - coords.y) / DEFAULT_TRAILINGSPEED;
        size.width += endWidth.current - size.width;
        size.height += endHeight.current - size.height;

        if (cursorRef.current) {
          cursorRef.current.style.top = `${coords.y}px`;
          cursorRef.current.style.left = `${coords.x}px`;
          cursorRef.current.style.width = `${size.width}px`;
          cursorRef.current.style.height = `${size.height}px`;
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

    setCoords({ x: x !== 0 ? x : pointerX, y: y || pointerY });
    setSize({ width, height });
    endX.current = x !== 0 ? x : pointerX;
    endY.current = y || pointerY;
    endWidth.current = width;
    endHeight.current = height;
    cursorRef.current.style.borderColor = borderColor;
    cursorRef.current.style.borderWidth = `${borderWidth}px`;
    cursorRef.current.style.borderRadius = `${borderRadius}px`;
  }, [
    cursorRef?.current,
    pointerX,
    pointerY,
    x,
    y,
    height,
    width,
    borderColor,
    borderWidth,
    borderRadius,
  ]);

  return <div id="rmc" className="cursor" ref={cursorRef} />;
};

export default Cursor;
