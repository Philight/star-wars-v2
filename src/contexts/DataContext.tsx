import { PropsWithChildren, useReducer, createContext, useContext } from 'react';
import { dataInitialState, IData, IDataState, dataReducer } from '@data';

import { IGenericComponent } from '@@types/generic-types';

interface IContextType extends IDataState {
  setLoading: (_loading: boolean) => void;
  setError: (_error: Error | null) => void;
  setData: (_data: IData) => void;
  setCurrentPage: (_: number | unknown) => void;
  setTotalCount: (_count: number | unknown) => void;
}

export const DataContext = createContext<IContextType>({} as IContextType);

export const DataProvider = ({ children }: PropsWithChildren): IGenericComponent => {
  const [state, dispatch] = useReducer(dataReducer, dataInitialState);

  const setLoading = (loading: boolean): void => {
    dispatch({
      type: 'SET_LOADING',
      payload: {
        loading,
      },
    });
  };

  const setError = (error: Error | null): void => {
    dispatch({
      type: 'SET_ERROR',
      payload: {
        error,
      },
    });
  };

  const setData = (data: IData): void => {
    dispatch({
      type: 'SET_DATA',
      payload: {
        data,
      },
    });
  };

  const setCurrentPage = (currentPage: number | unknown): void => {
    dispatch({
      type: 'SET_CURRENT_PAGE',
      payload: {
        currentPage,
      },
    });
  };

  const setTotalCount = (count: number | unknown): void => {
    dispatch({
      type: 'SET_TOTAL_COUNT',
      payload: {
        count,
      },
    });
  };

  const contextValue = {
    data: state.data,
    currentPage: state.currentPage,
    totalCount: state.totalCount,
    loading: state.loading,
    error: state.error,
    setLoading,
    setError,
    setData,
    setCurrentPage,
    setTotalCount,
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export const useDataContext = (): IContextType => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useDataContext must be used inside the DataProvider');
  }

  return context;
};
