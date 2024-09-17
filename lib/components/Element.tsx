import React, { Children, cloneElement, MouseEvent, useCallback } from 'react';

import { DEFAULT_COLOR, DEFAULT_OFFSET, DEFAULT_TYPE } from '@/constants';
import { useCursorApi } from '@/contexts/CursorContext';
import type { ElementProps } from '@/index.types';

const Element: React.FC<ElementProps> = ({
  children,
  type = DEFAULT_TYPE,
  color = DEFAULT_COLOR,
  offset = DEFAULT_OFFSET,
  className = '',
  ...props
}) => {
  const { outlineElement, underlineElement, leaveElement } = useCursorApi();

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
    leaveElement();
  }, [leaveElement]);

  return Children.map(children, (child) =>
    cloneElement(child, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      className: `${className} ${child.props.className || ''}`.trim(),
      ...props,
    })
  );
};

export default Element;
