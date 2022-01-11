import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei } from '../utils';

describe('RetirementFund', function () {
  it('should exploit an underflow vulnerability', async function () {
    const [, player] = await ethers.getSigners();

    const Challenge = await ethers.getContractFactory('RetirementFund');
    const challenge = await Challenge.deploy(player.address, {
      value: etherToWei(1),
    });
    await challenge.deployed();

    const Solution = await ethers.getContractFactory('SolutionRetirementFund');
    const solution = await Solution.deploy(challenge.address, {
      value: etherToWei(1),
    });
    await solution.deployed();

    const tx = await challenge.connect(player).collectPenalty();
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
