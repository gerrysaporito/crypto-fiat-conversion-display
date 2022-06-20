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

  static getExchangedAmount({
    exchangeRate,
    amount,
    base,
    desired,
  }: {
    exchangeRate: IExchangeRate;
    amount: number;
    base: EFiat | ECrypto;
    desired: EFiat | ECrypto;
  }): string {
    let rate = exchangeRate.rate;

    // Ensure all currencies are present
    if (
      !!!base ||
      !!!exchangeRate.base ||
      !!!desired ||
      !!!exchangeRate.desired
    )
      return (-1).toString();

    // Check if rate aligns with the conversion direction between currencies
    const sameFiatBase =
      this.isFiat(base || '') && this.isFiat(exchangeRate.base || '');
    const sameCryptoBase =
      this.isCrypto(base || '') && this.isCrypto(exchangeRate.base || '');

    if (!sameFiatBase && !sameCryptoBase) rate = 1 / exchangeRate.rate;

    // Return valid amount with appropriate decimal count
    if (this.isFiat(desired)) return (amount * rate).toFixed(2);
    else if (this.isCrypto(desired)) return (amount * rate).toFixed(5);

    return (-1).toString();
  }
}
