import {
  ButtonHTMLAttributes,
  MouseEvent,
  ReactNode,
  useCallback,
  useContext,
} from "react";

import { CursorContext } from "contexts/CursorContext";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  color = "#000000",
  ...props
}) => {
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
