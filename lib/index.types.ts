import { HTMLAttributes, ReactElement, ReactNode } from "react";

export interface LinkProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  color?: string;
}

export interface ButtonProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  color?: string;
  outline?: number;
}

export interface MagnetProps extends HTMLAttributes<HTMLElement> {
  children: ReactElement;
  type?: "outline" | "underline";
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

export interface AnimatedCursorCoordinates {
  x: number;
  y: number;
}
export interface AnimatedCursorSize {
  width: number;
  height: number;
}
