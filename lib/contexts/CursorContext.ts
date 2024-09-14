import { createContext } from 'react';
import type { ICursorContext } from '../index.d';
import {
  DEFAULT_COLOR,
  DEFAULT_HEIGHT,
  DEFAULT_RADIUS,
  DEFAULT_THICKNESS,
  DEFAULT_WIDTH,
} from '../constants';

export const CursorContext = createContext<ICursorContext>({
  cursorRef: null,
  x: 0,
  y: 0,
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  borderColor: DEFAULT_COLOR,
  borderWidth: DEFAULT_THICKNESS,
  borderRadius: DEFAULT_RADIUS,
  outlineElement: (e) => e,
  underlineElement: (e) => e,
  reset: () => {},
});
