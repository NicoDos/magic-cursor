import { HTMLAttributes, MutableRefObject, ReactElement, ReactNode } from 'react';

export interface CursorProviderProps {
  children: ReactNode;
  thickness?: number;
}

export interface ElementProps extends HTMLAttributes<HTMLElement> {
  children: ReactElement;
  type?: 'outline' | 'underline';
  color?: string;
  offset?: number;
  className?: string;
}

export interface IDataCursorContext {
  cursorRef: MutableRefObject<HTMLDivElement> | null;
  cursorPositions: {
    x: number;
    y: number;
  };
  cursorSizes: {
    width: number;
    height: number;
  };
  cursorStyles: {
    borderColor: string;
    borderWidth: number;
    borderRadius: number;
  };
}

export interface IApiCursorContext {
  outlineElement: (
    element: DOMRect,
    elementStyles: CSSStyleDeclaration,
    color?: string,
    outline?: number
  ) => void;
  underlineElement: (element: DOMRect, color?: string) => void;
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
