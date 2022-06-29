/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-waffle');
require('hardhat-gas-reporter');
require('solidity-coverage');

const {
  RINKEBY_API_URL,
  GOERLI_API_URL,
  KOVAN_API_URL,
  ROPSTEN_API_URL,
  MAINNET_API_URL,
  PRIVATE_KEY,
  ETHERSCAN_API_KEY,
} = process.env;

module.exports = {
  solidity: '0.8.7',
  defaultNetwork: 'rinkeby',
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
  networks: {
    hardhat: {},
    rinkeby: {
      url: RINKEBY_API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 10000000000, // 10 gwei
    },
    // ropsten: {
    //   url: ROPSTEN_API_URL,
    //   accounts: [`0x${PRIVATE_KEY}`],
    //   gasPrice: 10000000000, // 10 gwei
    // },
    // mainnet: {
    //   url: MAINNET_API_URL,
    //   accounts: [`0x${PRIVATE_KEY}`],
    //   gasPrice: 55000000000, // 55 gwei
    // },
    // kovan: {
    //   url: KOVAN_API_URL,
    //   accounts: [`0x${PRIVATE_KEY}`],
    //   gasPrice: 80000000000, // 10 gwei
    // },
    // goerli: {
    //   url: GOERLI_API_URL,
    //   accounts: [`0x${PRIVATE_KEY}`],
    //   gasPrice: 10000000000, // 10 gwei
    // },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
};
