import React, { MouseEvent, useCallback, useContext } from "react";

import { CursorContext } from "../contexts/CursorContext";
import type { ButtonProps } from "../index.types";

const Button: React.FC<ButtonProps> = ({
  children,
  color = "#000000",
  outline = 0,
  ...props
}) => {
  const { outlineElement, reset } = useContext(CursorContext);
  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      outlineElement(e.currentTarget, color, outline);
    },
    [children]
  );

  const handleMouseLeave = useCallback(reset, []);

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
