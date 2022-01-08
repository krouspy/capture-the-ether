import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Deploy', function () {
  it('Should deploy the contract', async function () {
    const Challenge = await ethers.getContractFactory('DeployChallenge');
    const challenge = await Challenge.deploy();
    await challenge.deployed();

    expect(await challenge.isComplete()).to.be.true;
  });
});
