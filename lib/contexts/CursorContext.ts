import { createContext, useContext } from 'react';
import type { IDataCursorContext, IApiCursorContext } from '../index.d';
import {
  DEFAULT_COLOR,
  DEFAULT_HEIGHT,
  DEFAULT_RADIUS,
  DEFAULT_THICKNESS,
  DEFAULT_WIDTH,
} from '../constants';

export const DataCursorContext = createContext<IDataCursorContext>(null);

export const ApiCursorContext = createContext<IApiCursorContext>(null);

export const useDataCursor = () => useContext(DataCursorContext);
export const useApiCursor = () => useContext(ApiCursorContext);
