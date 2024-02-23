import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  color?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: string;
}

export interface CursorProviderProps {
  children: ReactNode;
}

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
