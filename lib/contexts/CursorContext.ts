import { createContext, useContext } from 'react';
import type { IDataCursorContext, IApiCursorContext } from '../index.d';
import {
  DEFAULT_COLOR,
  DEFAULT_HEIGHT,
  DEFAULT_RADIUS,
  DEFAULT_THICKNESS,
  DEFAULT_WIDTH,
} from '../constants';

export const DataCursorContext = createContext<IDataCursorContext>({
  cursorRef: null,
  cursorPositions: {
    x: 0,
    y: 0,
  },
  cursorSizes: {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  cursorStyles: {
    borderColor: DEFAULT_COLOR,
    borderWidth: DEFAULT_THICKNESS,
    borderRadius: DEFAULT_RADIUS,
  },
});

export const ApiCursorContext = createContext<IApiCursorContext>({
  outlineElement: (e) => e,
  underlineElement: (e) => e,
  reset: () => {},
});

export const useDataCursor = () => useContext(DataCursorContext);
export const useApiCursor = () => useContext(ApiCursorContext);
