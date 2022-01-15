pragma solidity ^0.4.21;

import "./FuzzyIdentity.sol";

contract SolutionFuzzyIdentity is IName {
    address public owner;
    FuzzyIdentity private _fuzzyIdentity;

    function SolutionFuzzyIdentity(address fuzzyIdentityAddress) public {
        owner = msg.sender;
        _fuzzyIdentity = FuzzyIdentity(fuzzyIdentityAddress);
    }

    function name() external view returns (bytes32) {
        return bytes32("smarx");
    }

    function attack() external {
        require(msg.sender == owner);

        _fuzzyIdentity.authenticate();
    }
}
