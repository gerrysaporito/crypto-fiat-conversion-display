import '../styles/globals.scss';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import {
  Web3Provider,
  ExternalProvider,
  JsonRpcFetchFunc,
} from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { AppProps } from 'next/app';
import React from 'react';

// Necessary for Next.js to Render React 18
const { toast, ToastContainer } = createStandaloneToast();
export const standaloneToast = toast;

const App = ({ Component, pageProps }: AppProps) => {
  // Necessary for Web3
  function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
    return new Web3Provider(provider);
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </ChakraProvider>
    </Web3ReactProvider>
  );
};

export default App;
