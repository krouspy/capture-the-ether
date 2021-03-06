import * as dotenv from 'dotenv';

import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

dotenv.config();

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: '0.4.21',
  networks: {
    ropsten: {
      url: process.env.PROVIDER_URL || '',
      accounts:
        process.env.PRIVATE_KEY !== undefined &&
        process.env.PRIVATE_KEY_ACCOMPLICE !== undefined &&
        process.env.PRIVATE_KEY_FUZZY_ACCOUNT !== undefined
          ? [
              process.env.PRIVATE_KEY,
              process.env.PRIVATE_KEY_ACCOMPLICE,
              process.env.PRIVATE_KEY_FUZZY_ACCOUNT,
            ]
          : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 60000,
  },
};

export default config;
