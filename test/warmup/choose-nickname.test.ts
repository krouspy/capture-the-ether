import { expect } from 'chai';
import { ethers } from 'hardhat';

const nickname = 'krouspy';

describe('ChooseNickname', function () {
  it(`should set nickname to ${nickname}`, async function () {
    const ctfAddress = '0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee';
    const challengeAddress = '0x1435adbd1caC2f9122438550Dd0A14a9E4f6a320';

    const CTF = await ethers.getContractFactory('CaptureTheEtherNickname');
    const ctf = CTF.attach(ctfAddress);

    const Challenge = await ethers.getContractFactory('ChooseNickname');
    const challenge = Challenge.attach(challengeAddress);

    const param = ethers.utils.formatBytes32String(nickname);
    const tx = await ctf.setNickname(param);
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
