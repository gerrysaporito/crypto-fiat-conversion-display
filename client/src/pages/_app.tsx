import '../styles/globals.scss';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import React from 'react';

// Necessary for Next.js to Render React 18
const { toast, ToastContainer } = createStandaloneToast();
export const standaloneToast = toast;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </ChakraProvider>
  );
};

export default App;
