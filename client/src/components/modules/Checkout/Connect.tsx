import { useEffect, useState } from 'react';
import { useDisclosure, Button } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { SelectWalletModal } from './SelectWalletModal';

export const Connect = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deactivate, active } = useWeb3React();

  const disconnect = () => {
    window.localStorage.setItem('provider', '');

    deactivate();
  };

  return (
    <>
      {active ? (
        <Button onClick={disconnect}>Disconnect</Button>
      ) : (
        <Button onClick={onOpen}>Connect Wallet</Button>
      )}
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </>
  );
};
