/*
 * Definition for an error message used throughout application (server & client).
 */
export interface IError {
  message: string;
  extra?: { [key: string]: any };
}
