import { useState } from 'react';
import buildClient from '../tools/api';
import { IError } from '../utils/types/IError';

interface IRequest<T> {
  url: string;
  method: 'get' | 'post';
  body: { [key: string]: unknown };
  onSuccess: (data: T) => void;
}

function useRequest<T>({ url, method, body, onSuccess }: IRequest<T>) {
  /*
   * Local errors from axios request
   */
  const [errors, setErrors] = useState<React.ReactNode | null>(null);

  /*
   * Hook to make a request to the API.
   * Will return data or add errors to the local state.
   */
  const doRequest = async (props = {}): Promise<T | void> => {
    try {
      setErrors(null);
      const api = buildClient();
      const response = await api[method]<T>(url, {
        ...body,
        ...props,
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        console.error(err);
        setErrors(
          <div className="alert alert-danger">
            <h4>Oops...</h4>
            <ul className="my-0">
              {err.response.data.errors.map((err: IError, i: number) => (
                <li key={i}>{err.message}</li>
              ))}
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
    errors,
  };
}

export default useRequest;
