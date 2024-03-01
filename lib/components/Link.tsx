import React, { MouseEvent, useCallback, useContext } from "react";

import { CursorContext } from "../contexts/CursorContext";
import type { LinkProps } from "../index.types";

const Link: React.FC<LinkProps> = ({
  children,
  color = "#000000",
  ...props
}) => {
  const { underlineElement, reset } = useContext(CursorContext);

  const handleMouseEnter = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    underlineElement(e.currentTarget, color);
  }, []);

  const handleMouseLeave = useCallback(reset, []);

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

export default Link;
