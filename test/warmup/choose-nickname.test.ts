import { expect } from 'chai';
import { ethers } from 'hardhat';

const nickname = 'my_nickname';

describe('ChooseNickname', function () {
  it(`should set nickname to ${nickname}`, async function () {
    const [deployer] = await ethers.getSigners();

    const Challenge = await ethers.getContractFactory(
      'CaptureTheEtherNickname'
    );
    const ChooseNickname = await ethers.getContractFactory('ChooseNickname');

    const challenge = await Challenge.deploy();
    const chooseNickname = await ChooseNickname.deploy(
      deployer.address,
      challenge.address
    );

    await challenge.deployed();
    await chooseNickname.deployed();

    const param = ethers.utils.formatBytes32String(nickname);
    const tx = await challenge.setNickname(param);
    await tx.wait();

    expect(await chooseNickname.isComplete()).to.be.true;
  });
});
