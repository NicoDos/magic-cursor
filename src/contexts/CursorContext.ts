import { createContext } from "react";
import { ICursorContext } from "typings";

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
