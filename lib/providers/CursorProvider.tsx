import React, { useCallback, useRef, useState } from 'react';
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
import { ApiCursorContext, DataCursorContext } from '../contexts/CursorContext';

const CursorProvider = ({ thickness = DEFAULT_THICKNESS, children }: CursorProviderProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [cursorStyles, setCursorStyles] = useState({
    borderWidth: thickness,
    borderRadius: DEFAULT_RADIUS,
    borderColor: DEFAULT_COLOR,
  });

  const outlineElement = useCallback(
    (
      element: DOMRect,
      elementStyles: CSSStyleDeclaration,
      color = DEFAULT_COLOR,
      offset = DEFAULT_OFFSET
    ) => {
      const radius = +elementStyles.borderRadius.replace('px', '') + 1;

      setX(element.x + window.scrollX - (offset ? offset / 2 : offset) + thickness / 2 - 1);
      setY(element.y + window.scrollY - (offset ? offset / 2 : offset) + thickness / 2 - 1);
      setHeight(element.height + offset - thickness);
      setWidth(element.width + offset - thickness);
      setCursorStyles((previous) => ({
        ...previous,
        borderWidth: thickness,
        borderRadius: radius + thickness + offset / Math.PI,
        borderColor: color,
      }));
    },
    [thickness]
  );

  const underlineElement = useCallback(
    (element: DOMRect, color = DEFAULT_COLOR, offset = DEFAULT_OFFSET) => {
      setX(element.x + window.scrollX);
      setY(element.y + element.height + window.scrollY + offset || 10);
      setHeight(0);
      setWidth(element.width);
      setCursorStyles((previous) => ({
        ...previous,
        borderWidth: thickness / 2,
        borderColor: color,
      }));
    },
    [thickness]
  );

  const reset = useCallback(() => {
    setHeight(DEFAULT_HEIGHT);
    setWidth(DEFAULT_WIDTH);
    setX(0);
    setY(0);
    setCursorStyles((previous) => ({
      ...previous,
      borderWidth: thickness,
      borderRadius: DEFAULT_RADIUS,
      borderColor: DEFAULT_COLOR,
    }));

    if (cursorRef.current) {
      cursorRef.current.classList.remove(HOVER_CLASSNAME);
    }
  }, [thickness]);

  const dataValue = {
    cursorRef,
    x,
    y,
    height,
    width,
    cursorStyles,
  };

  const apiValue = {
    outlineElement,
    underlineElement,
    reset,
  };

  return (
    <DataCursorContext.Provider value={dataValue}>
      <ApiCursorContext.Provider value={apiValue}>{children}</ApiCursorContext.Provider>
    </DataCursorContext.Provider>
  );
};

export default CursorProvider;
