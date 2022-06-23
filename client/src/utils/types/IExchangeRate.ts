/*
 * Definition for exchange rate object which passes information between server and client.
 */
export interface IExchangeRate {
  base: string;
  desired: string;
  rate: number;
}
