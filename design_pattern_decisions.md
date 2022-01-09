# Design Pattern

1. [Inheritance and Interfaces](#inheritance-and-interfaces)

2. [Access Control](#access-control)

## 1. Inheritance and Interfaces

- Libraries: Strings, SafeMath, Counter
- as \_setTokenURI() was disconinued in ERC721 with pragma ^0.8.0 I used the proposition for a contract that implements this function from this [thread](https://forum.openzeppelin.com/t/function-settokenuri-in-erc721-is-gone-with-pragma-0-8-0/5978/2) and made made Nft contract inherit form this one. Later I realized that the URIStorage and the ERC721Enumerable Contract would have been enough but it was for practive. and now everything that has to do woth the URi is in that contract. also great that my main contract is not so huge because of this.

## 2. Access Control

I added access control, as in the future this contract is a game and a playing field for people who are getting into smart contract development. Like this it will be easy to inhehand it over to the next generation.
