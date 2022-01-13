import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei } from '../utils';

const answer = 42;

describe('GuessNumber', function () {
  it(`should guess the answer is ${answer}`, async function () {
    const challengeAddress = '0xEBa099A1766d59b5bf77e3D0017705D1594FAEDE';

    const Challenge = await ethers.getContractFactory('GuessNumber');
    const challenge = Challenge.attach(challengeAddress);

    const tx = await challenge.guess(answer, {
      value: etherToWei(1),
    });
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
