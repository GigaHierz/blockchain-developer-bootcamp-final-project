// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Nft is ERC721, Ownable {

   string[] public colors;
   mapping(string => bool) _colorExists;
   uint counter = 0;
   constructor() ERC721("Nft", "NFT") {}

  function mint(string memory _color) public {
    require(!_colorExists[_color]);
    uint _id = counter++;
    colors.push(_color);
    _mint(msg.sender, _id);
    _colorExists[_color] = true;
  }
}