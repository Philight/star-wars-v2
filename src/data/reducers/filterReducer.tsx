import { IFilterState } from './filterInitialState';

export interface IAction {
  type: string;
  payload: {
    [key: string]: any;
  };
}

export const filterReducer = (state: IFilterState, action: IAction): IFilterState => {
  const { type, payload } = action;
  const { column, data } = payload ?? {};

  switch (type) {
    // @ts-ignore
    case 'INITIALIZE':
      console.log('INITIALIZE', payload);
    // eslint-disable-next-line no-fallthrough
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
