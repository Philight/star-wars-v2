import React, { PropsWithChildren, useReducer, createContext, useContext } from 'react';
import { dataInitialState, IData, IDataState, dataReducer } from '@data';

export const DataContext = createContext();

interface IContextType extends IDataState {
  setLoading: (_loading: boolean) => void;
  setError: (_error: Error | null) => void;
  setData: (_data: IData) => void;
  setTotalCount: (_count: number) => void;
}

export const DataProvider = ({ children }: PropsWithChildren<T>): React.FC<React.ReactNode> => {
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

  const setCurrentPage = (currentPage: number): void => {
    dispatch({
      type: 'SET_CURRENT_PAGE',
      payload: {
        currentPage,
      },
    });
  };

  const setTotalCount = (count: number): void => {
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
