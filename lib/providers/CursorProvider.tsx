import React, { useCallback, useState } from "react";
import { CursorContext } from "../contexts/CursorContext";
import type { CursorProviderProps } from "../index.d";
import { DEFAULT_COLOR, DEFAULT_THICKNESS } from "../constants";

const CursorProvider = ({
  thickness = DEFAULT_THICKNESS,
  children,
}: CursorProviderProps) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [height, setHeight] = useState(30);
  const [width, setWidth] = useState(30);
  const [borderColor, setBorderColor] = useState(DEFAULT_COLOR);
  const [borderWidth, setBorderWidth] = useState(thickness);
  const [borderRadius, setBorderRadius] = useState(9999);

  const outlineElement = useCallback(
    (e: HTMLButtonElement, color = DEFAULT_COLOR, offset = 0) => {
      const element: DOMRect = e.getBoundingClientRect();
      const radius = +getComputedStyle(e).borderRadius.replace("px", "") + 1;
      setBorderRadius(radius + thickness + offset / 3.14);
      setX(
        element.x +
          window.scrollX -
          (offset ? offset / 2 : offset) +
          thickness / 2 -
          1
      );
      setY(
        element.y +
          window.scrollY -
          (offset ? offset / 2 : offset) +
          thickness / 2 -
          1
      );
      setHeight(element.height + offset - thickness);
      setWidth(element.width + offset - thickness);
      setBorderColor(color);
    },
    [children]
  );

  const underlineElement = useCallback(
    (e: HTMLButtonElement, color = DEFAULT_COLOR, offset = 0) => {
      const element: DOMRect = e.getBoundingClientRect();
      setX(element.x + window.scrollX);
      setY(element.y + element.height + window.scrollY + offset || 10);
      setHeight(0);
      setWidth(element.width);
      setBorderColor(color);
      setBorderWidth(thickness / 2);
    },
    []
  );

  const reset = useCallback(() => {
    setBorderRadius(9999);
    setHeight(30);
    setWidth(30);
    setX(0);
    setY(0);
    setBorderColor(DEFAULT_COLOR);
    setBorderWidth(thickness);

    document.getElementById("rmc").classList.remove("cursor-hover");
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
