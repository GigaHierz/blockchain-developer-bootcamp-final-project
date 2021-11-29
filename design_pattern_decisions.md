# Design Pattern

1. [Inheritance and Interfaces](#inheritance-and-interfaces)

2. [Upgradable Contracts](#upgradable-contracts)

3. [Access Control](#access-control)

## 1. Inheritance and Interfaces

- Libraries: Strings, SafeMath, Counter
- as \_setTokenURI() was disconinued in ERC721 with pragma ^0.8.0 I used the proposition for a contract that implements this function fomr this [thread](https://forum.openzeppelin.com/t/function-settokenuri-in-erc721-is-gone-with-pragma-0-8-0/5978/2) and made made Nft contract inherit form this one.

## 2. Upgradable Contracts

- as this contract is only the MPV and I would like to work further on this proejct (it is actually an idea from my study group from the DLT Talents programm) with other people, there will be changes to the smart contract so it made sense to create an upgradable contract.

## 2. Access Control

I addd access contro, as in the future this contract is a game and a playing field for people who are getting into smart contract development. Like this it will be easy to give inherit it to the next generation. I also wanted the minting funciton to be accessible for everyone, so every person that wants to mint their own token gets assigned the role of a minter. Maybe not the best solution, but ht eonly one I could findin my very tight schedule.
