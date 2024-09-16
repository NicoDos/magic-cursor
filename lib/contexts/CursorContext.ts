import { createContext } from 'react';
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
  x: 0,
  y: 0,
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  borderColor: DEFAULT_COLOR,
  borderWidth: DEFAULT_THICKNESS,
  borderRadius: DEFAULT_RADIUS,
});

export const ApiCursorContext = createContext<IApiCursorContext>({
  outlineElement: (e) => e,
  underlineElement: (e) => e,
  reset: () => {},
});
