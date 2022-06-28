import { buffer } from 'micro';
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import Web3 from 'web3';

import { getConversionData } from '../coinbase/exchange-rate';
import { ECrypto } from '../../../../utils/enums/ECrypto';
import { Conversion } from '../../../../utils/utility/Conversion';
import { EFiat } from '../../../../utils/enums/EFiat';
import { ABI } from '../../../../../data/abi';

const stripe = new Stripe(`${process.env.STRIPE_API_SECRET}`, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
});

const webhookSecret: string = `${process.env.STRIPE_WEBHOOK_SECRET}`;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

/*
 * @Endpoint: Listens for real-time events from the stripe API.
 */
export default cors((async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!;

    // Verify event is from stripe
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);
      res.status(400).send(`Webhook Error: ${errorMessage}`);
      return;
    }

    // Successfully recieved and constructed event.
    console.log('✅ Success:', event.id);

    // Cast event data to Stripe object.
    if (event.type === 'checkout.session.completed') {
      const charge = event.data.object as any;
      // TODO: Run function to buy crypto after chekcing if this is a charge
      try {
        const obj = event?.data?.object as any;
        const { amount, currency, recipientWalletAddress } = obj?.metadata;
        await loadWallet(amount, currency, recipientWalletAddress);
      } catch (err: any) {
        console.error(err);
        res.status(400).send(err);
      }
      console.log(`💵 Checkout session completed id: ${charge.id}`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}) as any);

/*
 * Validates the parameters and converts dollar amount to ETH.
 */
const loadWallet = async (
  amount: string,
  currency: string,
  walletAddress: string
) => {
  // Validates parameters
  if (!amount) throw new Error('No amount in metadata');
  if (!currency) throw new Error('No currency in metadata');
  if (!walletAddress) throw new Error('No wallet address in metadata');

  // Checks for valid parameters
  if (parseFloat(amount) <= 0)
    throw new Error(`Amount must be greater than 0. Recieved: '${amount}'`);
  if (!Conversion.isFiat(currency))
    throw new Error(`Currency is not valid. Recieved: '${currency}'`);

  // Converts fiat amount to ETH amount
  const exchangeRate = await getConversionData(currency, ECrypto.ETH);
  const ethAmount = Conversion.getExchangedAmount({
    exchangeRate,
    amount: parseFloat(amount),
    base: currency as EFiat,
    desired: ECrypto.ETH,
  });

  // Transfers eth amount from contract to recipient wallet address
  await send(walletAddress, ethAmount);
  console.log(
    `Successfully loaded wallet: '${walletAddress}' with ${amount} ETH`
  );
};

/*
 * Executes the transfer function on the contract to transfer eth to a recipient.
 */
const send = async (receiver: string, value: string) => {
  // Initialize the provider
  const provider = new Web3.providers.HttpProvider(
    process.env.RINKEBY_API_URL as string
  );

  // Create contract and event.
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(
    ABI as any,
    process.env.CONTRACT_ADDRESS
  );
  let transfer = contract.methods.transfer(receiver, web3.utils.toWei(value));
  const encodedABI = transfer.encodeABI();

  // Sign the transaction with the wallet that owns the contract
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      data: encodedABI,
      from: process.env.PUBLIC_KEY,
      gas: 2000000,
      to: contract.options.address,
    },
    `0x${process.env.PRIVATE_KEY}`
  );

  //
  return await web3.eth.sendSignedTransaction((signedTx as any).rawTransaction);
};
