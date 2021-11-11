// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Nft is ERC721, Ownable, ERC721Enumerable {
   using SafeMath for uint256;
   using Counters for Counters.Counter;

   uint public constant MAX_SUPPLY = 50000;
   uint public constant PRICE = 0.0001 ether;
   uint public constant MAX_PER_MINT = 100;
   string public baseTokenURI = "ipfs://20mff5OGplOZeEo7CoLA1lD6Jcy/";

   Counters.Counter private _tokenIds;
   string[] public colors;
   mapping(string => bool) _colorExists;
   constructor() ERC721("Nft", "NFT") {}

// add color, require uniqie color, call mint funciton, trak the color
  function mint(string memory _color) public {

    require(!_colorExists[_color]);
    uint _id = _tokenIds.current();
    _tokenIds.increment();
    colors.push(_color);
    _mint(msg.sender, _id);
    _colorExists[_color] = true;
  }

  function tokensOfOwner(address _owner) 
         external 
         view 
         returns (uint[] memory) {     uint tokenCount = balanceOf(_owner);
     uint[] memory tokensId = new uint256[](tokenCount);     for (uint i = 0; i < tokenCount; i++) {
          tokensId[i] = tokenOfOwnerByIndex(_owner, i);
     }
     
     return tokensId;
   }

   function _baseURI() internal 
                    view 
                    virtual 
                    override 
                    returns (string memory) {
     return baseTokenURI;
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