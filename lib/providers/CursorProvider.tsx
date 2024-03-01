import React, { useCallback, useState } from "react";
import { CursorContext } from "../contexts/CursorContext";
import type { CursorProviderProps } from "../index.types";

const CursorProvider: React.FC<CursorProviderProps> = ({ children }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [height, setHeight] = useState(30);
  const [width, setWidth] = useState(30);
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderWidth, setBorderWidth] = useState(1);
  const [borderRadius, setBorderRadius] = useState(9999);

  const outlineElement = useCallback(
    (e: HTMLButtonElement, color = "#000000", outline = 0) => {
      const rect: DOMRect = e.getBoundingClientRect();
      const radius = +getComputedStyle(e).borderRadius.replace("px", "") + 1;
      setBorderRadius(radius);
      setX(rect.x);
      setY(rect.y + window.scrollY);
      setHeight(rect.height + outline);
      setWidth(rect.width + outline);
      setBorderColor(color);
    },
    [children]
  );

  const underlineElement = useCallback(
    (e: HTMLButtonElement, color = "#000000") => {
      const rect: DOMRect = e.getBoundingClientRect();
      setX(rect.x);
      setY(rect.y + rect.height + window.scrollY + 10);
      setHeight(0);
      setWidth(rect.width);
      setBorderColor(color);
      setBorderWidth(0.5);
    },
    []
  );

  const reset = useCallback(() => {
    setBorderRadius(9999);
    setHeight(30);
    setWidth(30);
    setX(0);
    setY(0);
    setBorderColor("#000000");
    setBorderWidth(1);
  }, []);

  const value = {
    x,
    y,
    height,
    width,
    borderColor,
    borderWidth,
    borderRadius,
    outlineElement,
    underlineElement,
    reset,
  };

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
};

export default CursorProvider;
