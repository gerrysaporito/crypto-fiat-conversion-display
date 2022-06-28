import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { connectors, TProvider } from './_web3';
import { Connect } from './Connect';
import CheckoutForm from './CheckoutForm';

interface ICheckout {}

/*
 * Main react component to allow user to buy crypto.
 * Used to handle data, api calls, etc.
 * Sub-components recieve data from here and handle their respective requirements.
 */
export const Checkout: React.FC<ICheckout> = () => {
  const { activate, account } = useWeb3React();

  useEffect(() => {
    const provider = window.localStorage.getItem('provider') as TProvider;
    if (!!provider) activate(connectors[provider]);
  }, []);

  return (
    <div
      className={[
        'relative w-full max-w-[90%] sm:max-w-md min-h-[475px]',
        'rounded-2xl overflow-hidden',
        'text-sm',
        'shadow-md',
      ].join(' ')}
      style={{ backgroundColor: '#111111', color: 'white' }}
    >
      <div className={['mx-10 my-10', 'grid grid-cols-1 gap-5'].join(' ')}>
        {account && <CheckoutForm />}
        <Connect />
      </div>
    </div>
  );
};
