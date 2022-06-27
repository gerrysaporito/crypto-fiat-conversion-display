import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { connectors, TProvider } from './web3';
import { Connect } from './Connect';
import CheckoutForm from './CheckoutForm';

interface ICheckout {}

/*
 * Main react component to allow user to buy crypto.
 * Used to handle data, api calls, etc.
 * Sub-components recieve data from here and handle their respective requirements.
 */
export const Checkout: React.FC<ICheckout> = () => {
  const { activate } = useWeb3React();

  useEffect(() => {
    const provider = window.localStorage.getItem('provider') as TProvider;
    if (!!provider) activate(connectors[provider]);
  }, []);

  return (
    <div>
      <CheckoutForm />
      <Connect />
    </div>
  );
};
