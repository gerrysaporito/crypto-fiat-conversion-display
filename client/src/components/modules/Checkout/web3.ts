import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { InjectedConnector } from '@web3-react/injected-connector';

const { NEXT_PUBLIC_INFURA_ID } = process.env;

if (!NEXT_PUBLIC_INFURA_ID) {
  throw new Error(
    `Invalid NEXT_PUBLIC_INFURA_ID passed in: '${NEXT_PUBLIC_INFURA_ID}'`
  );
}

const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${NEXT_PUBLIC_INFURA_ID}`,
  appName: 'Web3-react Demo',
  supportedChainIds: [1, 3, 4, 5, 42],
});

const WalletConnect = new WalletConnectConnector({
  rpc: `https://mainnet.infura.io/v3/${NEXT_PUBLIC_INFURA_ID}`,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});

const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const connectors = {
  coinbaseWallet: CoinbaseWallet,
  walletConnect: WalletConnect,
  injected: Injected,
};

export type TProvider = 'coinbaseWallet' | 'walletConnect' | 'injected';
