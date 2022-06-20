import { ECrypto } from '../enums/ECrypto';
import { EFiat } from '../enums/EFiat';
import { IExchangeRate } from '../types/IExchangeRate';

export class Conversion {
  constructor() {}

  static isValidCurrencySymbol(currency: string) {
    const symbols = new Set([
      ...Object.keys(EFiat).map((item) => item.toLowerCase()),
      ...Object.keys(ECrypto).map((item) => item.toLowerCase()),
    ]);
    return symbols.has(currency.toLowerCase());
  }

  static isFiat(currency: string) {
    const symbols = new Set(
      Object.keys(EFiat).map((item) => item.toLowerCase())
    );
    return symbols.has(currency.toLowerCase());
  }

  static isCrypto(currency: string) {
    const symbols = new Set(
      Object.keys(ECrypto).map((item) => item.toLowerCase())
    );
    return symbols.has(currency.toLowerCase());
  }

  static getDesiredAmount(exchangeRate: IExchangeRate, amount: number) {
    console.log(exchangeRate);
    if (this.isFiat(exchangeRate.desired))
      return (amount * exchangeRate.rate).toFixed(2);

    return (amount * exchangeRate.rate).toFixed(10);
  }
}
