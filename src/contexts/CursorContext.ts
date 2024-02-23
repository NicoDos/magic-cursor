import { createContext } from "react";

export interface ICursorContext {
  cursorX: number;
  cursorY: number;
  cursorWidth: number;
  cursorHeight: number;
  cursorBorderColor: string;
  cursorBorderWidth: number;
  cursorBorderRadius: number;
  outlineElementWithCursor: (
    e: EventTarget,
    color?: string,
    radius?: string
  ) => void;
  underlineElementWithCursor: (
    e: EventTarget,
    color?: string,
    radius?: string
  ) => void;
  resetCursor: () => void;
}

export const CursorContext = createContext<ICursorContext>({
  cursorX: 0,
  cursorY: 0,
  cursorWidth: 30,
  cursorHeight: 30,
  cursorBorderColor: "#000000",
  cursorBorderWidth: 30,
  cursorBorderRadius: 9999,
  outlineElementWithCursor: (e) => e,
  underlineElementWithCursor: (e) => e,
  resetCursor: () => {},
});
