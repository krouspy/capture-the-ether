import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei, mineBlocks } from '../utils';

describe('PredictBlockHash', function () {
  it('should guess the block hash', async function () {
    const Challenge = await ethers.getContractFactory('PredictTheBlockHash');
    const challenge = await Challenge.deploy({ value: etherToWei(1) });
    await challenge.deployed();

    const answer =
      '0x0000000000000000000000000000000000000000000000000000000000000000';
    const lockIsGuessTx = await challenge.lockInGuess(answer, {
      value: etherToWei(1),
    });
    await lockIsGuessTx.wait();

    /**
     * blockhash() only works for the 256 most recent blocks and will return 0x0000000000000000000000000000000000000000000000000000000000000000
     * for older blocks so we mine 257 blocks so that it will match our guess
     */
    const blocksToMine = 257;
    await mineBlocks(blocksToMine);

    await challenge.settle();
    expect(await challenge.isComplete()).to.be.true;
  });
});
