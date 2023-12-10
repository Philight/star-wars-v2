import { API_BASE, API_ROUTES } from '@data';
import { fetchData } from '@utils';

const GET_OBJECTS = API_BASE + API_ROUTES.API.GET_OBJECTS;
const GET_OBJECT = API_BASE + API_ROUTES.API.GET_OBJECT;

export type ResponseType = { [key: string]: unknown };

export const getPaginatedData = async (objects, page): Promise<ResponseType> => {
  const API_URL = new URL(GET_OBJECTS.replace('$objects', objects));
  API_URL.searchParams.set('page', page);
  try {
    const response = await fetchData({
      method: 'GET',
      url: API_URL,
      //      data: reqBody,
    });
    // eslint-disable-next-line no-console
    console.log('getPaginatedData response', response);
    return response.data;
  } catch (err) {
    console.error('getPaginatedData err', err);
    return err;
  }
};

export const getObject = async (object, id): Promise<ResponseType> => {
  const API_URL = new URL(GET_OBJECT.replace('$object', object).replace(':id', id));
  try {
    const response = await fetchData({
      method: 'GET',
      url: API_URL,
      //      data: reqBody,
    });
    // eslint-disable-next-line no-console
    console.log('getObject response', response);
    return response.data;
  } catch (err) {
    console.error('getObject err', err);
    return err;
  }
};
