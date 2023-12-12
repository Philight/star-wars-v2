type TGenericObject = { [key: string]: unknown };

export interface IData {
  avatars: TGenericObject[] | unknown;
  films: TGenericObject[] | unknown;
  planets: TGenericObject[] | unknown;
  species: TGenericObject[] | unknown;
  starships: TGenericObject[] | unknown;
  vehicles: TGenericObject[] | unknown;
}

export interface IDataState {
  data: IData | unknown | {};
  totalCount: number | unknown;
  currentPage: number;
  loading: boolean | unknown;
  error?: unknown;
}

export const dataInitialState: IDataState = {
  data: {},
  totalCount: 0,
  currentPage: 1,
  loading: false,
  error: null,
};
