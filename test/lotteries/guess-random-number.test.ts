import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei } from '../utils';

describe('GuessRandomNumber', function () {
  it(`should guess the random number`, async function () {
    const challengeAddress = '0x1C89e3F2814505273BF6002419B055c30529F9B3';

    const Challenge = await ethers.getContractFactory('GuessRandomNumber');
    const challenge = Challenge.attach(challengeAddress);

    const answer = Number(
      await challenge.provider.getStorageAt(challenge.address, 0)
    );

    const tx = await challenge.guess(answer, {
      value: etherToWei(1),
    });
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
