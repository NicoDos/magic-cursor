import React, { MouseEvent, useCallback, useContext, Children, cloneElement } from 'react';

import { CursorContext } from '../contexts/CursorContext';
import type { ElementProps } from '../index.d';
import { DEFAULT_COLOR, DEFAULT_TYPE } from '../constants';

const Element = ({
  children,
  type = DEFAULT_TYPE,
  color = DEFAULT_COLOR,
  offset = 0,
  className,
  ...props
}: ElementProps) => {
  const { outlineElement, underlineElement, reset } = useContext(CursorContext);
  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      document.getElementById('rmc').classList.add('cursor-hover');
      type === DEFAULT_TYPE
        ? outlineElement(e.currentTarget, color, offset)
        : underlineElement(e.currentTarget, color);
    },
    [children]
  );

  const handleMouseLeave = useCallback(reset, []);

  return Children.map(children, (child) =>
    cloneElement(child, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      className: `${className} ${child.props.className}`,
      ...props,
    })
  );
};

export default Element;
