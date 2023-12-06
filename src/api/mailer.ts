import { CONFIG } from '@data/CONFIG';
import { fetchData } from '@utils';

export type ResponseType = {
  token: string;
  expire: number;
  signature: string;
};

export const signUpUser = async (reqBody): Promise<ResponseType> => {
  const API_URL = new URL('http://127.0.0.1:8000/auth/v1/sign-up');
  try {
    const response = await fetchData({
      method: 'POST',
      url: API_URL,
      data: reqBody,
    });
    // eslint-disable-next-line no-console
    console.log('signUpUser response', response);
    return response.data;
  } catch (err) {
    console.error('signUpUser err', err);
    return err;
  }
};

export const signInUser = async (reqBody): Promise<ResponseType> => {
  const API_URL = new URL('http://127.0.0.1:8000/auth/v1/sign-in');

  try {
    const response = await fetchData({
      method: 'POST',
      url: API_URL,
      data: reqBody,
    });
    // eslint-disable-next-line no-console
    console.log('signInUser response', response);
    return response.data;
  } catch (err) {
    console.error('signInUser err', err);
    return err;
  }
};

export const getMe = async (reqBody): Promise<ResponseType> => {
  const API_URL = new URL('http://127.0.0.1:8000/auth/v1/me');

  try {
    const response = await fetchData({
      method: 'POST',
      url: API_URL,
      data: reqBody,
      headers: {
        //        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:8000',
      },
    });
    // eslint-disable-next-line no-console
    console.log('getMe response', response);
    return response.data;
  } catch (err) {
    console.error('getMe err', err);
    return err;
  }
};

export const sendEmail = async (reqBody): Promise<ResponseType> => {
  const API_URL = new URL('http://127.0.0.1:8000/api/v1/mail');

  try {
    const response = await fetchData({
      method: 'POST',
      url: API_URL,
      data: reqBody,
    });
    // eslint-disable-next-line no-console
    console.log('sendEmail response', response);
    return response.data;
  } catch (err) {
    console.error('sendEmail err', err);
    return err;
  }
};
