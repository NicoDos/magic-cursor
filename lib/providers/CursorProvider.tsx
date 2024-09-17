import React, { useCallback, useMemo, useRef, useState } from 'react';

import { type CursorProviderProps, Position } from '@/index.types';
import {
  DEFAULT_COLOR,
  DEFAULT_HEIGHT,
  DEFAULT_OFFSET,
  DEFAULT_OFFSET_UNDERLINE,
  DEFAULT_RADIUS,
  DEFAULT_THICKNESS,
  DEFAULT_WIDTH,
  HOVER_CLASSNAME,
} from '@/constants';
import { ApiCursorContext, DataCursorContext } from '@/contexts/CursorContext';

const CursorProvider: React.FC<CursorProviderProps> = ({
  thickness = DEFAULT_THICKNESS,
  children,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  const [cursorFrozenPosition, setCursorFrozenPosition] = useState<Position>(null);
  const [cursorSize, setCursorSize] = useState({
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
      borderColor = DEFAULT_COLOR,
      offset = DEFAULT_OFFSET
    ) => {
      if (!cursorRef.current) return;

      const { borderRadius, borderWidth } = elementStyles;
      const elementBorderRadius = +borderRadius.replace('px', '');
      const elementBorderWidth = +borderWidth || 0;
      const positionPolish = offset + thickness / 2;
      const sizePolish = elementBorderWidth + offset * 2;

      cursorRef.current.classList.add(HOVER_CLASSNAME);

      setCursorFrozenPosition({
        x: element.x + window.scrollX - positionPolish,
        y: element.y + window.scrollY - positionPolish,
      });
      setCursorSize({
        width: element.width + sizePolish,
        height: element.height + sizePolish,
      });
      setCursorStyles((previous) => ({
        ...previous,
        borderRadius: elementBorderRadius + thickness + (offset * 2) / Math.PI,
        borderColor,
      }));
    },
    [thickness]
  );

  const underlineElement = useCallback(
    (element: DOMRect, borderColor = DEFAULT_COLOR, offset = DEFAULT_OFFSET_UNDERLINE) => {
      if (!cursorRef.current) return;

      const borderWidth = thickness / 2;

      cursorRef.current.classList.add(HOVER_CLASSNAME);

      setCursorFrozenPosition({
        x: element.x + window.scrollX,
        y: element.y + element.height + window.scrollY + offset,
      });
      setCursorSize({
        width: element.width,
        height: 0,
      });
      setCursorStyles((previous) => ({
        ...previous,
        borderWidth,
        borderColor,
      }));
    },
    [thickness]
  );

  const leaveElement = useCallback(() => {
    setCursorFrozenPosition(null);
    setCursorSize({
      height: DEFAULT_HEIGHT,
      width: DEFAULT_WIDTH,
    });
    setCursorStyles((previous) => ({
      ...previous,
      borderWidth: thickness,
      borderRadius: DEFAULT_RADIUS,
      borderColor: DEFAULT_COLOR,
    }));

    cursorRef.current?.classList.remove(HOVER_CLASSNAME);
  }, [thickness]);

  const dataValue = useMemo(
    () => ({
      cursorRef,
      cursorFrozenPosition,
      cursorSize,
      cursorStyles,
    }),
    [cursorRef, cursorFrozenPosition, cursorSize, cursorStyles]
  );

  const apiValue = useMemo(
    () => ({
      outlineElement,
      underlineElement,
      leaveElement,
    }),
    [outlineElement, underlineElement, leaveElement]
  );

  return (
    <DataCursorContext.Provider value={dataValue}>
      <ApiCursorContext.Provider value={apiValue}>{children}</ApiCursorContext.Provider>
    </DataCursorContext.Provider>
  );
};

export default CursorProvider;
