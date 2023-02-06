import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import env from './env';

import type { HardhatUserConfig } from "hardhat/config";

const {
  // hardhat globals
  HARDHAT_NETWORK,
} = env;

const createNetworkConfig = (network: string | void) => {
  // @ts-ignore
  const gasPrice: (number | 'auto') = parseInt(network && env[`ETH_GAS_PRICE_${ network.toUpperCase() }`] || env.ETH_GAS_PRICE) || 'auto';

  return {
    url: network && env[`ETH_NODE_URI_${ network.toUpperCase() }`] || env.ETH_NODE_URI,
    accounts: [`0x${ env.PRIVATE_KEY }`],
    gasPrice
  };
};

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      }
    }
  },
  defaultNetwork: HARDHAT_NETWORK,
  networks:{
    hardhat: {},
    polygonMumbai: createNetworkConfig('polygonMumbai'),
  }
};

export default config;
