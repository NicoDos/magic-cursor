import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  color?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: string;
  outline?: number;
}

export interface CursorProviderProps {
  children: ReactNode;
}

export interface ICursorContext {
  x: number;
  y: number;
  width: number;
  height: number;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  outlineElement: (e: EventTarget, color?: string, outline?: number) => void;
  underlineElement: (e: EventTarget, color?: string) => void;
  reset: () => void;
}
