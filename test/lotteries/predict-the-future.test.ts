import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei } from '../utils';

describe('GuessNewNumber', function () {
  it('should guess the new number', async function () {
    const Challenge = await ethers.getContractFactory('PredictTheFuture');
    const challenge = await Challenge.deploy({ value: etherToWei(1) });
    await challenge.deployed();

    const lockInGuessTx = await challenge.lockInGuess(0, {
      value: etherToWei(1),
    });
    await lockInGuessTx.wait();

    /**
     * To complete this challenge we actually need to brute force it
     * because to know in advance the blockhash would be practically impossible for *non-miners*
     * and we also notice the answer is modulo 10 so there are only 10 possibilities [0, 9]
     * At some point, the random answer will match our guess
     */

    // Repeat until challenge.isComplete() returns true
    // await challenge.settle()

    // expect(await challenge.isComplete()).to.be.true;
  });
});
