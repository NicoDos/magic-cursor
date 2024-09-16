import React, { MouseEvent, useCallback, Children, cloneElement } from 'react';

import { useApiCursor } from '../contexts/CursorContext';
import type { ElementProps } from '../index.d';
import { DEFAULT_COLOR, DEFAULT_OFFSET, DEFAULT_TYPE } from '../constants';

const Element = ({
  children,
  type = DEFAULT_TYPE,
  color = DEFAULT_COLOR,
  offset = DEFAULT_OFFSET,
  className = '',
  ...props
}: ElementProps) => {
  const { outlineElement, underlineElement, reset } = useApiCursor();

  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!e.currentTarget) return;

      const element = e.currentTarget.getBoundingClientRect();
      const elementStyles = getComputedStyle(e.currentTarget);

      if (type === DEFAULT_TYPE) {
        outlineElement(element, elementStyles, color, offset);
      } else {
        underlineElement(element, color);
      }
    },
    [outlineElement, underlineElement, color, offset, type]
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
