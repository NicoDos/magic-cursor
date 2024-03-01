import { createContext } from "react";
import type { ICursorContext } from "../index.types";

export const CursorContext = createContext<ICursorContext>({
  x: 0,
  y: 0,
  width: 30,
  height: 30,
  borderColor: "#000000",
  borderWidth: 30,
  borderRadius: 9999,
  outlineElement: (e) => e,
  underlineElement: (e) => e,
  reset: () => {},
});
