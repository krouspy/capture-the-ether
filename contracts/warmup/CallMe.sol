pragma solidity ^0.4.21;

contract CallMe {
    bool public isComplete = false;

    function callme() public {
        isComplete = true;
    }
}
