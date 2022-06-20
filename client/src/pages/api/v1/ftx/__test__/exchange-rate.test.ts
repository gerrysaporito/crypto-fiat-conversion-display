import { testHandler } from '../../../../../test/setup';
import exchangeRateHandlers from '../exchange-rate';

/*
 * To use the mock stripe, remove the .old extension on the stripe.ts file in the __mocks__ folder.
 */
describe(`'/api/v1/coinbase/get-exchange-rate' API Endpoint`, () => {
  it('should fail and return information about missing data', async () => {
    let res = await testHandler(exchangeRateHandlers, {
      method: 'GET',
      query: {
        base: '',
        desired: 'BTC',
      },
    });
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().message).toEqual(
      'Missing base parameter from query'
    );

    res = await testHandler(exchangeRateHandlers, {
      method: 'GET',
      query: {
        base: 'USD',
        desired: '',
      },
    });
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().message).toEqual(
      'Missing desired parameter from query'
    );
  });

  it('should fail and reject base fiat currency which is not offered from list of offerings defined in this app', async () => {
    const invalid = 'CHF';
    let res = await testHandler(exchangeRateHandlers, {
      method: 'GET',
      query: {
        base: invalid,
        desired: 'BTC',
      },
    });
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().message).toEqual(
      `Base value is not supported: '${invalid}'`
    );
  });

  it('should fail and reject base crypto currency which is not offered from list of offerings defined in this app', async () => {
    const invalid = 'BCC';
    let res = await testHandler(exchangeRateHandlers, {
      method: 'GET',
      query: {
        base: invalid,
        desired: 'USD',
      },
    });
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().message).toEqual(
      `Base value is not supported: '${invalid}'`
    );
  });

  it('should fail and reject base crypto currency which is not supported by Coinbase', async () => {
    const fiat = 'BTC';
    const crypto = 'CAD';
    let res = await testHandler(exchangeRateHandlers, {
      method: 'GET',
      query: {
        base: fiat,
        desired: crypto,
      },
    });

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().message).toEqual(
      `Market cannot be found for: '${fiat}-${crypto}'`
    );
  });

  it('should succeed and return current price for desired currency in base currency provided', async () => {
    const fiat = 'BTC';
    const crypto = 'USD';
    let res = await testHandler(exchangeRateHandlers, {
      method: 'GET',
      query: {
        base: crypto,
        desired: fiat,
      },
    });
    const data = res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(data.base).toEqual(crypto);
    expect(data.desired).toEqual(fiat);
    expect(!isNaN(Number(data.rate))).toBeTruthy();
    expect(data.rate >= 0).toBeTruthy();
  });

  it('should succeed and ensure that the prices are correct with respect to their crypto/fiat counterparts', async () => {
    const fiat = 'USD';
    const crypto = 'BTC';
    let desireCryptoRes = await testHandler(exchangeRateHandlers, {
      method: 'GET',
      query: {
        base: fiat,
        desired: crypto,
      },
    });
    let desireFiatRes = await testHandler(exchangeRateHandlers, {
      method: 'GET',
      query: {
        base: crypto,
        desired: fiat,
      },
    });
    const desireFiatData = desireFiatRes._getJSONData();
    const desireCryptoData = desireCryptoRes._getJSONData();

    // Successful Requests
    expect(desireFiatRes.statusCode).toBe(200);
    expect(desireCryptoRes.statusCode).toBe(200);
    // Expected Bases
    expect(desireFiatData.base).toEqual(crypto);
    expect(desireCryptoData.base).toEqual(fiat);
    // Expected Desired
    expect(desireFiatData.desired).toEqual(fiat);
    expect(desireCryptoData.desired).toEqual(crypto);
    // Rates are numbers
    expect(!isNaN(Number(desireFiatData.rate))).toBeTruthy();
    expect(!isNaN(Number(desireCryptoData.rate))).toBeTruthy();
    // Rates are greater than 0
    expect(desireFiatData.rate >= 0).toBeTruthy();
    expect(desireCryptoData.rate >= 0).toBeTruthy();
    // Rate are as expected
    expect(desireFiatData.rate >= desireCryptoData.rate).toBeTruthy();
  });
});
