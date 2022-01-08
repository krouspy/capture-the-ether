import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('CallMe', function () {
  it('Should call the method callme()', async function () {
    const Challenge = await ethers.getContractFactory('CallMe');
    const challenge = await Challenge.deploy();
    await challenge.deployed();

    const tx = await challenge.callme();
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
