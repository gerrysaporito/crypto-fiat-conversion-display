import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { InjectedConnector } from '@web3-react/injected-connector';

const { NEXT_PUBLIC_INFURA_ID } = process?.env;

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

// export const sendAmount = async (
//   cryptoAmount: string,
//   account?: string | null
// ) => {
//   console.log('sending ethereum...');
//   const amountToWei = web3.utils.toWei(cryptoAmount, 'ether');
//   const result = contract.methods
//     .transfer(account, amountToWei)
//     .send({})
//     .then((result: string) => {
//       console.log(
//         `✅ Check out your transaction on Etherscan: https://etherscan.io/tx/` +
//           result
//       );
//       return {
//         success: true,
//         status:
//           `✅ Check out your transaction on Etherscan: https://etherscan.io/tx/` +
//           result,
//       };
//     })
//     .catch((err: any) => {
//       console.log('Mint transaction failed!');
//       return {
//         success: false,
//         status: '😥 Something went wrong: ' + err.message,
//       };
//     })
//     .finally((result: any) => {
//       return result;
//     });
//   return result;
// };
