import { expect } from 'chai';
import { ethers } from 'hardhat';
import { etherToWei } from '../utils';

const answer = 170;
const answer_hash =
  '0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365';

function guessSecretNumber() {
  let result = 0;
  for (let num = 0; num < 300; num++) {
    const hash = ethers.utils.keccak256([num]);

    if (hash === answer_hash) {
      result = num;
      break;
    }
  }

  return result;
}

describe('GuessSecretNumber', function () {
  it(`should guess the secret number is ${answer}`, async function () {
    const Challenge = await ethers.getContractFactory('GuessSecretNumber');
    const challenge = await Challenge.deploy({ value: etherToWei(1) });
    await challenge.deployed();

    const secretNumber = guessSecretNumber();

    const tx = await challenge.guess(secretNumber, {
      value: etherToWei(1),
    });
    await tx.wait();

    expect(await challenge.isComplete()).to.be.true;
  });
});
