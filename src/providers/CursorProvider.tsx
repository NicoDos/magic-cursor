import { CursorContext } from "contexts/CursorContext";
import { useCallback, useState } from "react";
import { CursorProviderProps } from "typings";

export function CursorProvider({ children }: CursorProviderProps) {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [cursorHeight, setCursorHeight] = useState(30);
  const [cursorWidth, setCursorWidth] = useState(30);
  const [cursorBorderColor, setCursorBorderColor] = useState("#000000");
  const [cursorBorderWidth, setCursorBorderWidth] = useState(1);
  const [cursorBorderRadius, setCursorBorderRadius] = useState(9999);

  const outlineElementWithCursor = useCallback(
    (e: HTMLButtonElement, color = "#000000") => {
      const rect: DOMRect = e.getBoundingClientRect();
      const radius = +getComputedStyle(e).borderRadius.replace("px", "") + 2;
      setCursorBorderRadius(radius);
      setCursorX(rect.x);
      setCursorY(rect.y + window.scrollY);
      setCursorHeight(rect.height);
      setCursorWidth(rect.width);
      setCursorBorderColor(color);
    },
    [children]
  );

  const underlineElementWithCursor = useCallback(
    (e: HTMLButtonElement, color = "#000000") => {
      const rect: DOMRect = e.getBoundingClientRect();
      setCursorX(rect.x);
      setCursorY(rect.y + rect.height + window.scrollY + 10);
      setCursorHeight(0);
      setCursorWidth(rect.width);
      setCursorBorderColor(color);
      setCursorBorderWidth(0.5);
    },
    []
  );

  const resetCursor = useCallback(() => {
    setCursorBorderRadius(9999);
    setCursorHeight(30);
    setCursorWidth(30);
    setCursorX(0);
    setCursorY(0);
    setCursorBorderColor("#000000");
    setCursorBorderWidth(1);
  }, []);

  const value = {
    cursorX,
    cursorY,
    cursorHeight,
    cursorWidth,
    cursorBorderColor,
    cursorBorderWidth,
    cursorBorderRadius,
    outlineElementWithCursor,
    underlineElementWithCursor,
    resetCursor,
  };

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}
