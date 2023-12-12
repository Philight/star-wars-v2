import axios, { Method, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IFetchArgs {
  url: string | URL;
  method: Method;
  data?: unknown;
  headers?: { [key: string]: string };
}

export const fetchData = async ({
  url,
  method = 'GET',
  data,
  headers,
}: IFetchArgs): Promise<AxiosResponse> => {
  const options: AxiosRequestConfig = {
    url: url as string,
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    data,
  };

  return await axios(options);
};
