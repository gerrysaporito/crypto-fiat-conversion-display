import { ECrypto } from '../enums/ECrypto';
import { EFiat } from '../enums/EFiat';

export class Conversion {
  constructor() {}

  static isValidCurrencySymbol(currency: string) {
    const symbols = new Set([
      ...Object.keys(EFiat).map((item) => item.toLowerCase()),
      ...Object.keys(ECrypto).map((item) => item.toLowerCase()),
    ]);

    return symbols.has(currency.toLowerCase());
  }

  static getExchangeRate(amount: string) {
    return 1 / parseFloat(amount);
  }
}
