import '../styles/globals.css';
import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { AppProps } from 'next/app';
import React from 'react';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';

// Necessary for Next.js to Render React 18
const { toast, ToastContainer } = createStandaloneToast();
export const standaloneToast = toast;

export default ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </ChakraProvider>
  );
};
