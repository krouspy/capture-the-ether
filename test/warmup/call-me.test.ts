import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('CallMe', function () {
  it('Should call the method callme()', async function () {
    const challengeAddress = '0xabc61edBdc2E473563fEE36C9E20eC2C05e4E849';

    const Challenge = await ethers.getContractFactory('CallMe');
    const challenge = Challenge.attach(challengeAddress);

    const tx = await challenge.callme();
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
