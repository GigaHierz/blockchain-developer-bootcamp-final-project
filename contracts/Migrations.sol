// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

/// @title An NFT game for newcomer to the blockchain world. Can be used complementary to Bootcamps to get used to MetaMask and Dapps.
/// @author Lena Hierzi
/// @notice This contract is not aiming for security as it is designed for testing and only to be deployed on testnet.
/// @dev All Contract imports can be found in the BaseContract. I think it might be quite heavy and expensive to compile. But it's on the testnet. So go crazy.
/// @custom:experimental This is an experimental contract.

contract Migrations {
    address public owner = msg.sender;
    uint256 public last_completed_migration;

    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    function setCompleted(uint256 completed) public restricted {
        last_completed_migration = completed;
    }
}
