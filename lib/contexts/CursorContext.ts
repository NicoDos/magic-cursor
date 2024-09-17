import { createContext, useContext } from 'react';
import type { IApiCursorContext, IDataCursorContext } from '@/index.types';

export const DataCursorContext = createContext<IDataCursorContext>(null);

export const ApiCursorContext = createContext<IApiCursorContext>(null);

export const useDataCursor = () => useContext(DataCursorContext);
export const useApiCursor = () => useContext(ApiCursorContext);
