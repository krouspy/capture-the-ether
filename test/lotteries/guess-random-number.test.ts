import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei } from '../utils';

describe('GuessRandomNumber', function () {
  it(`should guess the secret number`, async function () {
    const Challenge = await ethers.getContractFactory('GuessRandomNumber');
    const challenge = await Challenge.deploy({ value: etherToWei(1) });
    await challenge.deployed();

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
