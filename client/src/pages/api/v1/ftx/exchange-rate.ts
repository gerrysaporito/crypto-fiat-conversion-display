import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IExchangeRate } from '../../../../utils/types/IExchangeRate';
import { Conversion } from '../../../../utils/utility/Conversion';

const ENDPOINT = `https://ftx.com/api`;

/*
 * @Endpoint: returns the current price for a currency from a base currency.
 * @Param: Query - The owned currency.
 * @Param: Query - The desired currency.
 */
const exchangeRateHandlers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { base, desired } = req.query;
  try {
    checkValidQueryParams(base as string, desired as string);

    // Checked types above
    // @ts-ignore
    const data = await getConversionData(base as string, desired as string);

    await res.status(200).json(data);
  } catch (err: any) {
    let message: string | null = null;

    // Check if axios error
    if (err?.response?.data) {
      const _desired = (desired as string).toUpperCase();
      const _base = (base as string).toUpperCase();
      const errorMessage = err.response.data.error;

      // Check if known Coinbase error
      switch (true) {
        case errorMessage.includes('No such market:'): {
          message = `Market cannot be found for: '${_base}-${_desired}'`;
          break;
        }
        case errorMessage.includes('hello'): {
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
 * Calls the Coinbase API to get the current prices for for the user.
 */
const getConversionData = async (
  base: string,
  desired: string
): Promise<IExchangeRate> => {
  let market = `${desired}/${base}`;

  if (Conversion.isFiat(desired)) market = `${base}/${desired}`;
  const endpoint = ENDPOINT + `/markets/${market}/orderbook?depth=1`;

  const {
    data: {
      result: { bids, asks },
    },
  } = await axios.get(endpoint);

  const rate = (bids[0][0] + asks[0][0]) / 2; // Average between highest bid and lowest ask

  const info = {
    base: base.toUpperCase(),
    desired: desired.toUpperCase(),
    rate: Conversion.isFiat(desired) ? rate : 1 / rate,
  };

  return info;
};

export default exchangeRateHandlers;
