// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./SetTokenUri.sol";

contract NftV2 is SetTokenUri {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter internal _tokenIdCounter;
    mapping(uint256 => address) tokensToOwner;

    mapping(string => bool) _tokenExists;
    mapping(address => bool) _userExists;

    function initialize(
        string memory _name,
        string memory _symbol,
        string memory _baseTokenURI,
        address _owner
    ) public override(SetTokenUri) initializer {
        SetTokenUri.initialize(_name, _symbol, _baseTokenURI, _owner);
    }

    function mint(address to, string memory cid) public returns (uint256 _id) {
        require(!_tokenExists[cid], "Object already exists");

        _id = _tokenIdCounter.current();
        _grantRole(MINTER_ROLE, to);
        safeMint(to, cid);

        return _id;
    }

    function safeMint(address to, string memory uri)
        public
        onlyRole(MINTER_ROLE)
    {
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        tokensToOwner[tokenId] = to;
        tokenURIs[tokenId] = uri;
        _tokenExists[uri] = true;

        _setTokenURI(tokenId, uri);
        _tokenIdCounter.increment();
    }

    function tokensOfOwner(address _owner)
        public
        view
        returns (string[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokensId = new uint256[](tokenCount);
        string[] memory userTokens = new string[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
            if (tokensId[i] == i) {
                userTokens[i] = tokenURIs[i];
            }
        }
        return userTokens;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(SetTokenUri)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _baseURI()
        internal
        view
        virtual
        override(SetTokenUri)
        returns (string memory)
    {
        return super._baseURI();
    }

    function _burn(uint256 tokenId) internal virtual override(SetTokenUri) {
        super._burn(tokenId);
    }

    // The following functions are overrides for ERC721Enumerable required by Solidity.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(SetTokenUri) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(SetTokenUri)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
