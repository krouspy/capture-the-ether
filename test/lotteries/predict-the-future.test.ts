import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei } from '../utils';

describe('PredictTheFuture', function () {
  it('should guess the random answer', async function () {
    const challengeAddress = '0x17A2aa16d1F1F63681bb8e30FdDb71eda9280bcA';
    const solutionAddress = '0xBb760ce72e96Ae9035e159bD6Bd3f513999a1554';

    const Challenge = await ethers.getContractFactory('PredictTheFuture');
    const challenge = Challenge.attach(challengeAddress);

    const Solution = await ethers.getContractFactory(
      'SolutionPredictTheFuture'
    );
    const solution = Solution.attach(solutionAddress);

    console.log('locking guess...');
    const guess = 0;
    let tx = await solution.lockInGuess(guess, { value: etherToWei(1) });
    await tx.wait();

    // spam until challenge.isComplete() returns true
    tx = await solution.attack({
      gasLimit: 1000000,
      gasPrice: 10000000000,
    });
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
