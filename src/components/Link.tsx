import {
  AnchorHTMLAttributes,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useCallback,
  useContext,
} from "react";

import { HTMLMotionProps, motion } from "framer-motion";
import { CursorContext } from "contexts/CursorContext";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  color?: string;
}

export const Link: React.FC<LinkProps> = ({
  children,
  color = "#000000",
  ...props
}) => {
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
