import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei } from '../utils';

describe('GuessNewNumber', function () {
  it('should guess the new number', async function () {
    const challengeAddress = '0xf47C0F20543e34cC0A179B402dB300d977ee0Eb6';

    const Challenge = await ethers.getContractFactory('GuessNewNumber');
    const challenge = Challenge.attach(challengeAddress);

    const Solution = await ethers.getContractFactory('SolutionGuessNewNumber');
    const solution = await Solution.deploy(challengeAddress);
    await solution.deployed();

    const tx = await solution.attack({ value: etherToWei(1) });
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
