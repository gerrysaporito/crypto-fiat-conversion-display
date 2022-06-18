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
    let res = await testHandler(exchangeRateHandlers, {
      method: 'GET',
      query: {
        base: 'CHF',
        desired: 'BTC',
      },
    });
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().message).toEqual(
      `Base value is not supported: 'CHF'`
    );
  });

  it('should fail and reject base crypto currency which is not offered from list of offerings defined in this app', async () => {
    let res = await testHandler(exchangeRateHandlers, {
      method: 'GET',
      query: {
        base: 'BTCC',
        desired: 'USD',
      },
    });
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().message).toEqual(
      "Base value is not supported: 'BTCC'"
    );
  });

  /*
   * Can't test Coinbase's unsupported coins without triggering other guards first.
   */
  // it('should fail and reject base crypto currency which is not supported by Coinbase', async () => {
  //   const rejected = 'DOGE';
  //   let res = await testHandler(exchangeRateHandlers, {
  //     method: 'GET',
  //     query: {
  //       base: 'USD',
  //       desired: rejected,
  //     },
  //   });
  //   expect(res.statusCode).toBe(400);
  //   expect(res._getJSONData().message).toEqual(
  //     `'${rejected}' is not supported by the Coinbase API`
  //   );
  // });

  it('should succedd and return current price for desired currency in base currency provided', async () => {
    const query = {
      base: 'USD',
      desired: 'BTC',
    };
    let res = await testHandler(exchangeRateHandlers, {
      method: 'GET',
      query: query,
    });
    const data = res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(data.base).toEqual(query.base);
    expect(data.desired).toEqual(query.desired);
    expect(!isNaN(Number(data.rate))).toBeTruthy();
    expect(data.rate >= 0).toBeTruthy();
  });
});
