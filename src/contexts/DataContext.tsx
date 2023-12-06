import React, { PropsWithChildren, useReducer, createContext, useContext } from 'react';
import { initialState, IState, dataReducer } from '@data';

export const DataContext = createContext();

interface IContextType extends IState {
  updateField: (fieldName: string, fieldValue: unknown) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
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

  const setUser = (user: unknown): void => {
    dispatch({
      type: 'SET_USER',
      payload: {
        user,
      },
    });
  };

  const updateFields = (updatedFields: { [key: string]: string }): void => {
    dispatch({
      type: 'UPDATE_FIELDS',
      payload: {
        updatedFields,
      },
    });
  };

  const contextValue = {
    formData: state.formData,
    user: state.user,
    updateFields,
    setLoading,
    setError,
    setUser,
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
