export interface IError {
  message: string;
  extra?: { [key: string]: any };
}
