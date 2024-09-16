import { createContext, useContext } from 'react';
import type { IApiCursorContext, IDataCursorContext } from '@/index.d';

export const DataCursorContext = createContext<IDataCursorContext>(null);

export const ApiCursorContext = createContext<IApiCursorContext>(null);

export const useDataCursor = () => useContext(DataCursorContext);
export const useApiCursor = () => useContext(ApiCursorContext);
