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
  cursorFrozenPosition: {
    x: number;
    y: number;
  };
  cursorSize: {
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
  leaveElement: () => void;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}
