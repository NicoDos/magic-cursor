import React, { useCallback, useMemo, useRef, useState } from 'react';
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

  const [cursorPositions, setCursorPositions] = useState({
    x: 0,
    y: 0,
  });
  const [cursorSizes, setCursorSizes] = useState({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  });
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
      if (!cursorRef.current) return;

      const radius = elementStyles.borderRadius;
      const borderRadius = radius ? +radius.replace('px', '') + 1 : 0;
      const positionAdaptation = (offset ? offset / 2 : offset) + thickness / 2 - 1;

      cursorRef.current.classList.add(HOVER_CLASSNAME);

      setCursorPositions({
        x: element.x + window.scrollX - positionAdaptation,
        y: element.y + window.scrollY - positionAdaptation,
      });
      setCursorSizes({
        width: element.width + offset - thickness,
        height: element.height + offset - thickness,
      });
      setCursorStyles((previous) => ({
        ...previous,
        borderWidth: thickness,
        borderRadius: borderRadius + thickness + offset / Math.PI,
        borderColor: color,
      }));
    },
    [thickness]
  );

  const underlineElement = useCallback(
    (element: DOMRect, color = DEFAULT_COLOR, offset = DEFAULT_OFFSET) => {
      cursorRef.current.classList.add(HOVER_CLASSNAME);

      setCursorPositions({
        x: element.x + window.scrollX,
        y: element.y + element.height + window.scrollY + offset || 10,
      });
      setCursorSizes({
        height: 0,
        width: element.width,
      });
      setCursorStyles((previous) => ({
        ...previous,
        borderWidth: thickness / 2,
        borderColor: color,
      }));
    },
    [thickness]
  );

  const reset = useCallback(() => {
    setCursorPositions({
      x: 0,
      y: 0,
    });
    setCursorSizes({
      height: DEFAULT_HEIGHT,
      width: DEFAULT_WIDTH,
    });
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

  const dataValue = useMemo(
    () => ({
      cursorRef,
      cursorPositions,
      cursorSizes,
      cursorStyles,
    }),
    [cursorRef, cursorPositions, cursorSizes, cursorStyles]
  );

  const apiValue = useMemo(
    () => ({
      outlineElement,
      underlineElement,
      reset,
    }),
    [outlineElement, underlineElement, reset]
  );

  return (
    <DataCursorContext.Provider value={dataValue}>
      <ApiCursorContext.Provider value={apiValue}>{children}</ApiCursorContext.Provider>
    </DataCursorContext.Provider>
  );
};

export default CursorProvider;
