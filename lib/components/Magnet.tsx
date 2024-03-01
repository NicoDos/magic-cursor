import React, { MouseEvent, useCallback, useContext } from "react";

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

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </span>
  );
};

export default Magnet;
