import { ECrypto } from '../../enums/ECrypto';
import { EFiat } from '../../enums/EFiat';
import { Conversion } from '../Conversion';
/*
 * To use the mock stripe, remove the .old extension on the stripe.ts file in the __mocks__ folder.
 */
describe(`Tests Conversion utility classes static functions`, () => {
  it('tests isValidCurrencySymbol edge cases', async () => {
    expect(Conversion.isValidCurrencySymbol(EFiat.USD)).toBeTruthy();
    expect(Conversion.isValidCurrencySymbol(ECrypto.BTC)).toBeTruthy();
    expect(Conversion.isValidCurrencySymbol('BLT')).toBeFalsy();
    expect(Conversion.isValidCurrencySymbol('')).toBeFalsy();
  });

  it('tests isFiat edge cases', async () => {
    expect(Conversion.isFiat(EFiat.USD)).toBeTruthy();
    expect(Conversion.isFiat(ECrypto.BTC)).toBeFalsy();
    expect(Conversion.isFiat('BLT')).toBeFalsy();
    expect(Conversion.isFiat('')).toBeFalsy();
  });

  it('tests isCrypto edge cases', async () => {
    expect(Conversion.isCrypto(EFiat.USD)).toBeFalsy();
    expect(Conversion.isCrypto(ECrypto.BTC)).toBeTruthy();
    expect(Conversion.isCrypto('BLT')).toBeFalsy();
    expect(Conversion.isCrypto('')).toBeFalsy();
  });

  it('tests getExchangedAmount edge cases', async () => {
    const amount = 100;
    const crypto = ECrypto.BTC;
    const fiat = EFiat.USD;
    const crypto2FiatRate = 20000;
    // Invalid desired currency
    expect(
      Conversion.getExchangedAmount({
        exchangeRate: { base: '', desired: '', rate: crypto2FiatRate },
        amount,
        base: fiat,
        desired: crypto,
      })
    ).toEqual('-1');
    expect(
      Conversion.getExchangedAmount({
        exchangeRate: { base: fiat, desired: '', rate: crypto2FiatRate },
        amount,
        base: fiat,
        desired: crypto,
      })
    ).toEqual('-1');
    expect(
      Conversion.getExchangedAmount({
        exchangeRate: { base: crypto, desired: '', rate: crypto2FiatRate },
        amount,
        base: crypto,
        desired: fiat,
      })
    ).toEqual('-1');
    expect(
      Conversion.getExchangedAmount({
        exchangeRate: { base: fiat, desired: crypto, rate: crypto2FiatRate },
        amount,
        base: null as unknown as ECrypto,
        desired: crypto,
      })
    ).toEqual('-1');
    expect(
      Conversion.getExchangedAmount({
        exchangeRate: { base: crypto, desired: fiat, rate: crypto2FiatRate },
        amount,
        base: crypto,
        desired: undefined as unknown as ECrypto,
      })
    ).toEqual('-1');

    // Valid exchange directions
    expect(
      Conversion.getExchangedAmount({
        exchangeRate: { base: crypto, desired: fiat, rate: crypto2FiatRate },
        amount,
        base: crypto,
        desired: fiat,
      })
    ).toEqual((amount * crypto2FiatRate).toFixed(2));
    expect(
      Conversion.getExchangedAmount({
        exchangeRate: { base: crypto, desired: fiat, rate: crypto2FiatRate },
        amount,
        base: fiat,
        desired: crypto,
      })
    ).toEqual(((amount * 1) / crypto2FiatRate).toFixed(5));

    // Return type is a string
    expect(
      typeof Conversion.getExchangedAmount({
        exchangeRate: { base: crypto, desired: fiat, rate: crypto2FiatRate },
        amount,
        base: crypto,
        desired: fiat,
      })
    ).toEqual('string');
  });
});
