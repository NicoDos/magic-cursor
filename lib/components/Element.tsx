import React, {
  MouseEvent,
  useCallback,
  useContext,
  Children,
  cloneElement,
} from "react";

import { CursorContext } from "../contexts/CursorContext";
import type { ElementProps } from "../index.types";

const Element: React.FC<ElementProps> = ({
  children,
  type = "outline",
  color = "#000000",
  offset = 0,
  className,
  ...props
}) => {
  const { outlineElement, underlineElement, reset } = useContext(CursorContext);
  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      type === "outline"
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
