import { API_BASE, API_ROUTES } from '@data';
import { fetchData } from '@utils';

const GET_OBJECTS = API_BASE + API_ROUTES.API.GET_OBJECTS;
const GET_OBJECT = API_BASE + API_ROUTES.API.GET_OBJECT;

export type TResponseType = { [key: string]: unknown };

export const getPaginatedData = async (
  objects: string,
  page: string | number = 1,
): Promise<TResponseType> => {
  const API_URL = new URL(GET_OBJECTS.replace('$objects', objects));
  API_URL.searchParams.set('page', String(page));
  try {
    const response = await fetchData({
      method: 'GET',
      url: API_URL,
    });
    // eslint-disable-next-line no-console
    console.log('getPaginatedData response', response);
    return response.data;
  } catch (err: any) {
    console.error('getPaginatedData err', err);
    return err;
  }
};

export const getObject = async (object: string, id: string | number): Promise<TResponseType> => {
  const API_URL = new URL(GET_OBJECT.replace('$object', object).replace(':id', String(id)));
  try {
    const response = await fetchData({
      method: 'GET',
      url: API_URL,
      headers: {
        //        "Access-Control-Allow-Origin": "https://swapi.dev/"
        //        "Access-Control-Allow-Origin": "*"
      },
    });
    // eslint-disable-next-line no-console
    console.log('getObject response', response);
    return response.data;
  } catch (err: any) {
    console.error('getObject err', err);
    return err;
  }
};
