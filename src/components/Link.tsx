import { MouseEvent, useCallback, useContext } from "react";

import { CursorContext } from "contexts/CursorContext";
import { LinkProps } from "typings";

export const Link = ({ children, color = "#000000", ...props }: LinkProps) => {
  const { underlineElementWithCursor, resetCursor } = useContext(CursorContext);

  const handleMouseEnter = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    underlineElementWithCursor(e.currentTarget, color);
  }, []);

  const handleMouseLeave = useCallback(resetCursor, []);

  return (
    <a
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </a>
  );
};
