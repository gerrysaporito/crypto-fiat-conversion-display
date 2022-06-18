import '../styles/globals.css';
import { AppProps } from 'next/app';
import React from 'react';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';

const { toast, ToastContainer } = createStandaloneToast();

export const standaloneToast = toast;

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </ChakraProvider>
  );
}

export default App;
