pragma solidity ^0.4.21;

// Relevant part of the CaptureTheEther contract.
contract CaptureTheEtherNickname {
    mapping(address => bytes32) public nicknameOf;

    function setNickname(bytes32 nickname) public {
        nicknameOf[msg.sender] = nickname;
    }
}

// Challenge contract. You don't need to do anything with this; it just verifies
// that you set a nickname for yourself.
contract ChooseNickname {
    CaptureTheEtherNickname cte;
    address player;

    // Your address gets passed in as a constructor parameter.
    function ChooseNickname(address _player, address cteAddress) public {
        player = _player;
        cte = CaptureTheEtherNickname(cteAddress);
    }

    // Check that the first character is not null.
    function isComplete() public view returns (bool) {
        return cte.nicknameOf(player)[0] != 0;
    }
}
