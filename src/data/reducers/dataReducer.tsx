import { IState } from './initialState';

export interface IAction {
  type: string;
  payload: { 
    [key: string]: unknown | { [key: string]: unknown };
  };
}

export const dataReducer = (state: IState, action: IAction): IState => {
  const { type, payload } = action;
  const { loading, error, user, updatedFields } = payload;

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
    case 'SET_USER':
      console.log('SET_USER', payload);
      return {
        ...state,
        user,
      };
    case 'UPDATE_FIELDS':
      console.log('UPDATE_FIELDS', payload);
      return {
        ...state,
        formData: {
          ...updatedFields,
        },
      };

    default:
      throw new Error(`No case for type ${type} found in dataReducer.`);
  }
};
