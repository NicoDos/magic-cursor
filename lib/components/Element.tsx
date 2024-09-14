import React, { MouseEvent, useCallback, useContext, Children, cloneElement } from 'react';

import { CursorContext } from '../contexts/CursorContext';
import type { ElementProps } from '../index.d';
import { DEFAULT_COLOR, DEFAULT_OFFSET, DEFAULT_TYPE, HOVER_CLASSNAME } from '../constants';

const Element = ({
  children,
  type = DEFAULT_TYPE,
  color = DEFAULT_COLOR,
  offset = DEFAULT_OFFSET,
  className,
  ...props
}: ElementProps) => {
  const { cursorRef, outlineElement, underlineElement, reset } = useContext(CursorContext);
  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      cursorRef.current.classList.add(HOVER_CLASSNAME);
      type === DEFAULT_TYPE
        ? outlineElement(e.currentTarget, color, offset)
        : underlineElement(e.currentTarget, color);
    },
    [children]
  );

  return Children.map(children, (child) =>
    cloneElement(child, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: reset,
      className: `${className} ${child.props.className}`,
      ...props,
    })
  );
};

export default Element;
