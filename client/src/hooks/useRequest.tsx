import axios from 'axios';
import { useState } from 'react';
import { IError } from '../utils/types/IError';

interface IRequest<T> {
  url: string;
  method: 'get' | 'post';
  body?: { [key: string]: unknown };
  onSuccess?: (data: T) => void;
}

export function useRequest<T>({ url, method, body, onSuccess }: IRequest<T>) {
  /*
   * Local errors from axios request
   */
  const [_errors, set_Errors] = useState<React.ReactNode | null>(null);

  /*
   * Hook to make a request to the API.
   * Will return data or add errors to the local state.
   */
  const doRequest = async (props = {}): Promise<T | void> => {
    try {
      // set_Errors(null);
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
        set_Errors(
          <div className="alert alert-danger">
            <h4>Oops...</h4>
            <ul className="my-0">
              <li>{err.response.data.message}</li>
            </ul>
          </div>
        );
      } else if (err?.response?.data) {
        console.error(
          'Something is wrong with the request :(',
          err.response.data
        );
      } else {
        console.error('Something went wrong :(', err);
      }
    }
  };

  return {
    doRequest,
    errors: _errors,
  };
}
