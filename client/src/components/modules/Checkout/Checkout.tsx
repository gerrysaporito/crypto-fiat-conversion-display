import { useEffect, useState } from 'react';
import {
  VStack,
  useDisclosure,
  Button,
  Text,
  HStack,
  Select,
  Input,
  Box,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { SelectWalletModal } from './SelectWalletModal';
import { useWeb3React } from '@web3-react/core';
import { Tooltip } from '@chakra-ui/react';
import { networkParams } from './networks';
import { connectors, TProvider } from './web3';
import { Cleaning } from '../../../utils/utility/Cleaning';
import { Connect } from './Connect';

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
      <Connect />
    </div>
  );
};
