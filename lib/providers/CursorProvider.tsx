import React, { useCallback, useRef, useState } from 'react';
import { CursorContext } from '../contexts/CursorContext';
import type { CursorProviderProps } from '../index.d';
import {
  DEFAULT_COLOR,
  DEFAULT_HEIGHT,
  DEFAULT_OFFSET,
  DEFAULT_RADIUS,
  DEFAULT_THICKNESS,
  DEFAULT_WIDTH,
  HOVER_CLASSNAME,
} from '../constants';

const CursorProvider = ({ thickness = DEFAULT_THICKNESS, children }: CursorProviderProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [borderColor, setBorderColor] = useState(DEFAULT_COLOR);
  const [borderWidth, setBorderWidth] = useState(thickness);
  const [borderRadius, setBorderRadius] = useState(DEFAULT_RADIUS);

  const outlineElement = useCallback(
    (e: HTMLElement, color = DEFAULT_COLOR, offset = DEFAULT_OFFSET) => {
      const element = e.getBoundingClientRect();
      const radius = +getComputedStyle(e).borderRadius.replace('px', '') + 1;

      setBorderRadius(radius + thickness + offset / Math.PI);
      setX(element.x + window.scrollX - (offset ? offset / 2 : offset) + thickness / 2 - 1);
      setY(element.y + window.scrollY - (offset ? offset / 2 : offset) + thickness / 2 - 1);
      setHeight(element.height + offset - thickness);
      setWidth(element.width + offset - thickness);
      setBorderColor(color);
    },
    [thickness]
  );

  const underlineElement = useCallback(
    (e: HTMLButtonElement, color = DEFAULT_COLOR, offset = DEFAULT_OFFSET) => {
      const element = e.getBoundingClientRect();

      setX(element.x + window.scrollX);
      setY(element.y + element.height + window.scrollY + offset || 10);
      setHeight(0);
      setWidth(element.width);
      setBorderColor(color);
      setBorderWidth(thickness / 2);
    },
    [thickness]
  );

  const reset = useCallback(() => {
    setBorderRadius(DEFAULT_RADIUS);
    setHeight(DEFAULT_HEIGHT);
    setWidth(DEFAULT_WIDTH);
    setX(0);
    setY(0);
    setBorderColor(DEFAULT_COLOR);
    setBorderWidth(thickness);

    if (cursorRef.current) {
      cursorRef.current.classList.remove(HOVER_CLASSNAME);
    }
  }, [thickness]);

  const value = {
    cursorRef,
    x,
    y,
    height,
    width,
    borderColor,
    borderWidth,
    borderRadius,
    outlineElement,
    underlineElement,
    reset,
  };

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
};

export default CursorProvider;
