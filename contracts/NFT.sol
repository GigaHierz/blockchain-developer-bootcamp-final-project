// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./BaseContract.sol";

contract Nft is ERC721, BaseContract("Nft", "NFT") {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

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
        _setTokenUri(_id, cid);
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
        uint256 counter = 0;
        for (uint256 i = 0; i < tokenCount; i++) {
            // tokensId[i] = tokenOfOwnerByIndex(_owner, i);
            if (tokensToOwner[i] == _owner) {
                //    userTokens[i] = tokensList[i];
                tokensId[counter] = i;
                counter++;
            }
        }
        return tokensId;
    }

    function _baseURI()
        internal
        view
        virtual
        override(ERC721, BaseContract)
        returns (string memory)
    {
        return baseTokenURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721, BaseContract)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
