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

  it('tests getDesiredAmount edge cases', async () => {
    const amount = 100;
    // Invalid desired currency
    expect(
      Conversion.getDesiredAmount({ base: '', desired: '', rate: 0.1 }, amount)
    ).toEqual('-1');
    expect(
      Conversion.getDesiredAmount(
        { base: EFiat.USD, desired: '', rate: 0.1 },
        amount
      )
    ).toEqual('-1');
    expect(
      Conversion.getDesiredAmount(
        { base: ECrypto.BTC, desired: '', rate: 0.1 },
        amount
      )
    ).toEqual('-1');

    // Valid desired currency
    const fiat2CryptoRate = 0.00005;
    const crypto2FiatRate = 20000;
    expect(
      Conversion.getDesiredAmount(
        { base: '', desired: EFiat.USD, rate: crypto2FiatRate },
        amount
      )
    ).toEqual((amount * crypto2FiatRate).toFixed(2));
    expect(
      Conversion.getDesiredAmount(
        { base: '', desired: ECrypto.BTC, rate: fiat2CryptoRate },
        amount
      )
    ).toEqual((amount * fiat2CryptoRate).toFixed(5));

    // Return type is a string
    expect(
      typeof Conversion.getDesiredAmount(
        { base: '', desired: ECrypto.BTC, rate: fiat2CryptoRate },
        amount
      )
    ).toEqual('string');
  });
});
