import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('FuzzyIdentity', function () {
  it('should find a private key whose first tx matches requirements', async function () {
    const challengeAddress = '0x86e0a4516aB734fd1F7DdA48863fca917C8D88D0';

    const Challenge = await ethers.getContractFactory('FuzzyIdentity');
    const challenge = Challenge.attach(challengeAddress);

    const [, , player] = await ethers.getSigners();

    const Solution = await ethers.getContractFactory('SolutionFuzzyIdentity');
    const solution = await Solution.connect(player).deploy(challengeAddress);
    await solution.deployed();

    let tx = await solution.attack();
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
