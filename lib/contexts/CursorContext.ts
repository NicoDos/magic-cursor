import { createContext, useContext } from 'react';
import type { IApiCursorContext, IDataCursorContext } from '@/index.types';

export const DataCursorContext = createContext<IDataCursorContext>(null);
export const ApiCursorContext = createContext<IApiCursorContext>(null);

export const useCursorData = () => useContext(DataCursorContext);
export const useCursorApi = () => useContext(ApiCursorContext);
