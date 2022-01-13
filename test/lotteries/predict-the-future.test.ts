import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei } from '../utils';

describe('PredictTheFuture', function () {
  it('should guess the random answer', async function () {
    const challengeAddress = '0xE9d00F2aBd41F392726860559Fa1B63719c95699';

    const Challenge = await ethers.getContractFactory('PredictTheFuture');
    const challenge = Challenge.attach(challengeAddress);

    console.log('locking guess...');
    const guess = 0;
    let tx = await challenge.lockInGuess(guess, { value: etherToWei(1) });
    await tx.wait();

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
