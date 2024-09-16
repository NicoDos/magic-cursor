import React, { MouseEvent, useCallback, useContext, Children, cloneElement } from 'react';

import { ApiCursorContext, DataCursorContext } from '../contexts/CursorContext';
import type { ElementProps } from '../index.d';
import { DEFAULT_COLOR, DEFAULT_OFFSET, DEFAULT_TYPE, HOVER_CLASSNAME } from '../constants';

const Element = ({
  children,
  type = DEFAULT_TYPE,
  color = DEFAULT_COLOR,
  offset = DEFAULT_OFFSET,
  className = '',
  ...props
}: ElementProps) => {
  const { cursorRef } = useContext(DataCursorContext);
  const { outlineElement, underlineElement, reset } = useContext(ApiCursorContext);

  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (cursorRef.current) {
        cursorRef.current.classList.add(HOVER_CLASSNAME);
      }

      if (type === DEFAULT_TYPE) {
        outlineElement(e.currentTarget, color, offset);
      } else {
        underlineElement(e.currentTarget, color);
      }
    },
    [cursorRef, outlineElement, underlineElement, color, offset, type]
  );

  const handleMouseLeave = useCallback(() => {
    reset();
  }, [reset]);

  return Children.map(children, (child) =>
    cloneElement(child, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      className: `${className} ${child.props.className || ''}`.trim(),
      ...props,
    })
  );
};

export default React.memo(Element);
