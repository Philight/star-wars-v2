type TGenericObject = { [key: string]: unknown };

export interface IData {
  avatars: TGenericObject[];
  films: TGenericObject[];
  planets: TGenericObject[];
  species: TGenericObject[];
  starships: TGenericObject[];
  vehicles: TGenericObject[];
}

export interface IState {
  data: IData;
  totalCount: number;
  currentPage: number;
  loading: boolean;
  error?: unknown;
}

export const initialState: IState = {
  data: {},
  totalCount: null,
  currentPage: 1,
  loading: false,
  error: null,
};
