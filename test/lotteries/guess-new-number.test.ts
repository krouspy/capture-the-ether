import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei } from '../utils';

describe('GuessNewNumber', function () {
  it('should guess the new number', async function () {
    const Challenge = await ethers.getContractFactory('GuessNewNumber');
    const Solution = await ethers.getContractFactory('SolutionGuessNewNumber');

    const challenge = await Challenge.deploy({ value: etherToWei(1) });
    await challenge.deployed();

    const solution = await Solution.deploy(challenge.address);
    await solution.deployed();

    const tx = await solution.attack({ value: etherToWei(1) });
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
