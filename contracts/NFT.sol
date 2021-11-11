// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Nft is ERC721, Ownable, ERC721Enumerable {
   using Counters for Counters.Counter;

   Counters.Counter private _tokenIdCounter;
   string[] public colors;
   mapping(string => bool) _colorExists;
   constructor() ERC721("Nft", "NFT") {}


// add color, require uniqie color, call mint funciton, trak the color
  function mint(string memory _color) public {
    require(!_colorExists[_color]);
    uint _id = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    colors.push(_color);
    _mint(msg.sender, _id);
    _colorExists[_color] = true;
  }

     // The following functions are overrides for ERC721Enumerable required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}