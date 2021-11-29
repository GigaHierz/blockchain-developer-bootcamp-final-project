# Avoiding Common Attacks

1. [Inheritance and Interfaces](#inheritance-and-interfaces)

2. [Upgradable Contracts](#upgradable-contracts)

## 1. Inheritance and Interfaces

- Librabries: Strings, SafeMath, Counter
- as \_setTokenURI() was disconinued in ERC721 with pragma ^0.8.0 I used the proposition for a contract that implements this function fomr this [thread](https://forum.openzeppelin.com/t/function-settokenuri-in-erc721-is-gone-with-pragma-0-8-0/5978/2) and made made Nft contract inherit form this one.

## 2. Inheritance and Interfaces

- as this contract is only the MPV and I would like to work further on this proejct (it is actually an idea from my study group from the DLT Talents programm) with other people, there will be changes to the smart contract so it made sense to create an upgradable contract.
