import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei } from '../utils';

const answer = 42;

describe('GuessNumber', function () {
  it(`should guess the answer is ${answer}`, async function () {
    const Challenge = await ethers.getContractFactory('GuessNumber');
    const challenge = await Challenge.deploy({ value: etherToWei(1) });
    await challenge.deployed();

    const tx = await challenge.guess(answer, {
      value: etherToWei(1),
    });
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
