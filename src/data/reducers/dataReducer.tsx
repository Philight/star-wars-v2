import { IDataState } from './dataInitialState';

export interface IAction {
  type: string;
  payload: {
    [key: string]: any;
  };
}

export const dataReducer = (state: IDataState, action: IAction): IDataState => {
  const { type, payload } = action;
  const { loading, error, data, currentPage, totalCount } = payload;

  switch (type) {
    case 'SET_LOADING':
      console.log('SET_LOADING', payload);
      return {
        ...state,
        loading,
      };
    case 'SET_ERROR':
      console.log('SET_ERROR', payload);
      return {
        ...state,
        error,
      };
    case 'SET_DATA':
      console.log('SET_DATA', payload);
      return {
        ...state,
        data,
      };
    case 'SET_CURRENT_PAGE':
      console.log('SET_CURRENT_PAGE', payload);
      return {
        ...state,
        currentPage,
      };
    case 'SET_TOTAL_COUNT':
      console.log('SET_TOTAL_COUNT', payload);
      return {
        ...state,
        totalCount,
      };
    default:
      throw new Error(`No case for type ${type} found in dataReducer.`);
  }
};
