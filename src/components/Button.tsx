import { MouseEvent, useCallback, useContext } from "react";

import { CursorContext } from "contexts/CursorContext";
import { ButtonProps } from "typings";

export const Button = ({
  children,
  color = "#000000",
  ...props
}: ButtonProps) => {
  const { outlineElementWithCursor, resetCursor } = useContext(CursorContext);
  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      outlineElementWithCursor(e.currentTarget, color);
    },
    [children]
  );

  const handleMouseLeave = useCallback(resetCursor, []);

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
