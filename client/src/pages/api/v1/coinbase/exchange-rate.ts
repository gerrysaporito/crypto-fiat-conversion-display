import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ECrypto } from '../../../../utils/enums/ECrypto';
import { EFiat } from '../../../../utils/enums/EFiat';
import { IExchangeRate } from '../../../../utils/types/IExchangeRate';
import { Conversion } from '../../../../utils/utility/Conversion';

const ENDPOINT = `https://api.coinbase.com`;

/*
 * @Endpoint: returns the current price for a currency from a base currency.
 * @Param: base - The owned currency.
 * @Param: desired - The desired currency.
 */
const exchangeRateHandlers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { base, desired } = req.query;
  try {
    checkValidQueryParams(base, desired);

    // Checked types above
    // @ts-ignore
    const data: IExchangeRate = await getConversionData(
      base as string,
      desired as string
    );

    await res.status(200).json(data);
  } catch (err: any) {
    let message: string | null = null;

    // Check if axios error
    if (err?.response?.data) {
      const _desired = (desired as string).toUpperCase();
      const _base = (base as string).toUpperCase();
      const errorMessage = err.response.data.errors[0].message;

      // Check if known Coinbase error
      switch (errorMessage) {
        case 'Invalid desired': {
          message = `'${_desired}' is not supported by the Coinbase API`;
          break;
        }
        case 'Invalid base desired': {
          message = `'${_base}' is not supported by the Coinbase API`;
          break;
        }
        default: {
          message = `Axios Error: ${errorMessage}`;
        }
      }
    }

    res.status(400).json({
      message: message || (err as any)?.message || 'Something went wrong.',
    });
  }
};

/*
 * Query validation.
 *
 * Checks if the parameters passed are valid.
 */
const checkValidQueryParams = (
  base: string | string[],
  desired: string | string[]
) => {
  // Check if all parameters are present
  if (!!!base) throw new Error(`Missing base parameter from query`);
  if (!!!desired) throw new Error(`Missing desired parameter from query`);

  // Check if amount is a valid number
  // if (isNaN(Number(amount)))
  //   throw new Error(`Amount must be of type number: '${amount}'`);

  // Check if selected currencies are of type string
  if (typeof base !== 'string')
    throw new Error(`Base must be a string: '${base}'`);
  if (typeof desired !== 'string')
    throw new Error(`desired must be a string: '${desired}'`);

  // Check if selected currencies have a supported symbol
  if (!Conversion.isValidCurrencySymbol(base))
    throw new Error(`Base value is not supported: '${base}'`);
  if (!Conversion.isValidCurrencySymbol(desired))
    throw new Error(`desired value is not supported: '${desired}'`);
};

/*
 * Data conversion request.
 *
 * Calls the coinbase API to get the current prices for for the user.
 */
const getConversionData = async (
  base: string,
  desired: string
): Promise<IExchangeRate> => {
  let endpoint = ENDPOINT + `/v2/exchange-rates?desired=${base.toUpperCase()}`;
  if (Conversion.isCrypto(desired))
    endpoint = ENDPOINT + `/v2/exchange-rates?desired=${desired.toUpperCase()}`;

  const {
    data: { data },
  } = await axios.get(endpoint);

  // Rates are based in USD so they must be converted from USD to native currency
  let rate =
    parseFloat(data.rates[desired.toUpperCase()]) /
    parseFloat(data.rates[base.toUpperCase()]);
  if (Conversion.isCrypto(base))
    rate = rate =
      parseFloat(data.rates[base.toUpperCase()]) /
      parseFloat(data.rates[desired.toUpperCase()]);

  const info = {
    base: base.toUpperCase(),
    desired: desired.toUpperCase(),
    rate: Conversion.isFiat(base) ? rate : 1 / rate,
  };

  return info;
};

export default exchangeRateHandlers;
