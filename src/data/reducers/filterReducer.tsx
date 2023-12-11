import { IState } from './filterInitialState';

export interface IAction {
  type: string;
  payload: {
    [key: string]: unknown;
  };
}

export const filterReducer = (state: IState, action: IAction): IState => {
  const { type, payload } = action;
  const { column, data } = payload ?? {};

  switch (type) {
    case 'INITIALIZE':
      console.log('INITIALIZE', payload);
    case 'RESET':
      console.log('RESET', payload);
      return data;
    case 'UPDATE_COLUMN':
      console.log('UPDATE_COLUMN', payload);
      return {
        ...state,
        [column]: data,
      };
    default:
      return state;
  }
};
