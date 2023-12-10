import React, { PropsWithChildren, useReducer, createContext, useContext } from 'react';
import { initialState, IData, IState, dataReducer } from '@data';

export const DataContext = createContext();

interface IContextType extends IState {
  setLoading: (_loading: boolean) => void;
  setError: (_error: Error | null) => void;
  setData: (_data: IData) => void;
  setTotalCount: (_count: number) => void;
}

export const DataProvider = ({ children }: PropsWithChildren<T>): React.FC<React.ReactNode> => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

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

  const setTotalCount = (count: number): void => {
    dispatch({
      type: 'SET_TOTAL_COUNT',
      payload: {
        count,
      },
    });
  };

  const contextValue = {
    currentPage: state.currentPage,
    data: state.data,
    totalCount: state.totalCount,
    loading: state.loading,
    error: state.error,
    setLoading,
    setError,
    setData,
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
