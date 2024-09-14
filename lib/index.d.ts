import { HTMLAttributes, ReactElement, ReactNode } from "react";

export interface CursorProviderProps {
  children: ReactNode;
  thickness?: number;
}

export interface ElementProps extends HTMLAttributes<HTMLElement> {
  children: ReactElement;
  type?: "outline" | "underline";
  color?: string;
  offset?: number;
  className?: string;
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

export interface CursorCoordinates {
  x: number;
  y: number;
}
export interface CursorSize {
  width: number;
  height: number;
}
