import { useState, useEffect } from 'react';
import axios, { Method, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IAPIArgs {
  url: string;
  method?: Method;
  data?: unknown;
  headers?: { [key: string]: string };
}

export const useAPI = ({
  url,
  method = 'GET',
  data: bodyData,
  headers,
}: IAPIArgs): { response: unknown; isLoading: boolean } => {
  const [response, setResponse] = useState<unknown>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (): Promise<void> => {
      setLoading(true);

      try {
        const options: AxiosRequestConfig = {
          url,
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          data: bodyData,
          timeout: 0,
        };

        const { data }: AxiosResponse = await axios(options);

        if (isMounted) {
          setResponse(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, method, bodyData]);

  return { response, isLoading };
};
