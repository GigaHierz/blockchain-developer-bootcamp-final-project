// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./SetTokenUri.sol";

contract Nft is ERC721, Ownable, ERC721Enumerable, SetTokenUri("Nft", "NFT") {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    uint256 public constant MAX_SUPPLY = 50000;
    uint256 public constant PRICE = 0.0001 ether;
    uint256 public constant MAX_PER_MINT = 100;
    string public baseTokenURI = "https://ipfs.io/ipfs/";

    mapping(uint256 => address) tokensToOwner;

    Counters.Counter private _tokenIds;
    mapping(string => bool) _tokenExists;
    mapping(address => bool) _userExists;

    function mint(string memory cid) public returns (uint256 _id) {
        require(!_tokenExists[cid], "Object already exists");

        _id = _tokenIds.current();
        _mint(msg.sender, _id);
        tokensToOwner[_id] = msg.sender;
        tokenURIs[_id] = cid;
        _tokenExists[cid] = true;
        _setTokenURI(_id, cid);
        _tokenIds.increment();

        return _id;
    }

    function tokensOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokensId = new uint256[](tokenCount);
        // string[] memory  userTokens = new string[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
            // if(tokensId[i]  == i){
            //    userTokens[i] = tokensList[i];
            // }
        }
        return tokensId;
    }

    function _baseURI()
        internal
        view
        virtual
        override(ERC721, SetTokenUri)
        returns (string memory)
    {
        return baseTokenURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721, SetTokenUri)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // The following functions are overrides for ERC721Enumerable required by Solidity.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
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
