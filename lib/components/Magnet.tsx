import React, {
  MouseEvent,
  useCallback,
  useContext,
  Children,
  cloneElement,
} from "react";

import { CursorContext } from "../contexts/CursorContext";
import type { MagnetProps } from "../index.types";

const Magnet: React.FC<MagnetProps> = ({
  children,
  type = "outline",
  color = "#000000",
  outline = 0,
  ...props
}) => {
  const { outlineElement, underlineElement, reset } = useContext(CursorContext);
  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      type === "outline"
        ? outlineElement(e.currentTarget, color, outline)
        : underlineElement(e.currentTarget, color);
    },
    [children]
  );

  const handleMouseLeave = useCallback(reset, []);

  return Children.map(children, (child) =>
    cloneElement(child, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      ...props,
    })
  );
};

export default Magnet;
