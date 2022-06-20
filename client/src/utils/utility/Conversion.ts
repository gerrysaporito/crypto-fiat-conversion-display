import { ECrypto } from '../enums/ECrypto';
import { EFiat } from '../enums/EFiat';
import { IExchangeRate } from '../types/IExchangeRate';

export class Conversion {
  constructor() {}

  static isValidCurrencySymbol(currency: string): boolean {
    const symbols = new Set([
      ...Object.keys(EFiat).map((item) => item.toLowerCase()),
      ...Object.keys(ECrypto).map((item) => item.toLowerCase()),
    ]);
    return symbols.has(currency.toLowerCase());
  }

  static isFiat(currency: string): boolean {
    const symbols = new Set(
      Object.keys(EFiat).map((item) => item.toLowerCase())
    );
    return symbols.has(currency.toLowerCase());
  }

  static isCrypto(currency: string): boolean {
    const symbols = new Set(
      Object.keys(ECrypto).map((item) => item.toLowerCase())
    );
    return symbols.has(currency.toLowerCase());
  }

  static getDesiredAmount(exchangeRate: IExchangeRate, amount: number): string {
    if (this.isFiat(exchangeRate.desired))
      return (amount * exchangeRate.rate).toFixed(2);
    else if (this.isCrypto(exchangeRate.desired))
      return (amount * exchangeRate.rate).toFixed(5);

    return (-1).toString();
  }
}
