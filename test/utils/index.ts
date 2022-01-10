import { ethers } from 'hardhat';
import { TransactionResponse } from '@ethersproject/abstract-provider';

export const etherToWei = (etherAmount: number) => {
  return ethers.utils.parseEther(etherAmount.toString());
};

export const mineBlocks = async (n: number) => {
  const [, sender, receiver] = await ethers.getSigners();
  const promises: Promise<TransactionResponse>[] = [];
  for (let i = 0; i < n; i++) {
    const tx = sender.sendTransaction({
      to: receiver.address,
      value: etherToWei(0.0001),
    });
    promises.push(tx);
  }

  return Promise.all(promises);
};
