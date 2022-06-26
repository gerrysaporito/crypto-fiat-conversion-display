import {
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { connectors, TProvider } from './web3';

import COINBASE_WALLET_LOGO from '../../../assets/logos/coinbase-wallet.png';
import METAMASK_LOGO from '../../../assets/logos/metamask.png';
import WALLETCONNECT_LOGO from '../../../assets/logos/walletconnect.png';
import Image from 'next/image';
import { WALLETCONNECT } from 'web3modal/dist/providers/providers';

interface IModal {
  isOpen: boolean;
  closeModal: () => void;
}

export const SelectWalletModal: React.FC<IModal> = ({ isOpen, closeModal }) => {
  const { activate } = useWeb3React();

  const setProvider = (type: TProvider) => {
    window.localStorage.setItem('provider', type);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent w="300px">
        <ModalHeader>Select Wallet</ModalHeader>
        <ModalCloseButton
          _focus={{
            boxShadow: 'none',
          }}
        />
        <ModalBody paddingBottom="1.5rem">
          <VStack>
            <Button
              variant="outline"
              onClick={() => {
                activate(connectors.coinbaseWallet);
                setProvider('coinbaseWallet');
                closeModal();
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center">
                <Box position="relative" display="flex" alignItems="center">
                  <Image
                    src={COINBASE_WALLET_LOGO}
                    alt="Coinbase Wallet Logo"
                    width={25}
                    height={25}
                  />
                </Box>
                <Text>Coinbase Wallet</Text>
              </HStack>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                activate(connectors.walletConnect);
                setProvider('walletConnect');
                closeModal();
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center">
                <Box position="relative" display="flex" alignItems="center">
                  <Image
                    src={WALLETCONNECT_LOGO}
                    alt="Wallet Connect Logo"
                    width={26}
                    height={26}
                  />
                </Box>
                <Text>Wallet Connect</Text>
              </HStack>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                activate(connectors.injected);
                setProvider('injected');
                closeModal();
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center" alignItems="center">
                <Box position="relative" display="flex" alignItems="center">
                  <Image
                    src={METAMASK_LOGO}
                    alt="Metamask Logo"
                    width={25}
                    height={25}
                  />
                </Box>
                <Text>Metamask</Text>
              </HStack>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
