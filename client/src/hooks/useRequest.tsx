import axios from 'axios';
import { useState } from 'react';

interface IRequest<T> {
  url: string;
  method: 'get' | 'post';
  body?: { [key: string]: unknown };
  onSuccess?: (data: T) => void;
}

/*
 * Hook which standardizes api calls.
 * Also handles errors if present which can be displayed to the user.
 */
export function useRequest<T>({ url, method, body, onSuccess }: IRequest<T>) {
  /*
   * State variables.
   */
  const [_error, set_Error] = useState<string>(''); // Local errors from api interface (axios)

  /*
   * Hook to make a request to the API.
   * Will return data or add errors to the local state.
   */
  const doRequest = async (props = {}): Promise<T | void> => {
    try {
      set_Error('');
      const response = await axios[method]<T>(url, {
        ...body,
        ...props,
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err: any) {
      if (err?.response?.data?.message) {
        console.error(err);
        set_Error(err.response.data.message);
      } else if (err?.response?.data) {
        const message = 'Something went wrong with the API request :(';
        console.error(message, err.response.data);
        set_Error(err.response.data.message);
      } else {
        const message = 'Something went wrong :(';
        console.error(message, err);
        set_Error(message);
      }
    }
  };

  return {
    doRequest,
    error: _error,
  };
}
