import { ethers } from 'hardhat';

export const etherToWei = (etherAmount: number) => {
  return ethers.utils.parseEther(etherAmount.toString());
};
