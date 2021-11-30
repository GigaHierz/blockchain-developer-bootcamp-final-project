// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/// @title An NFT game for newcomer to the blockchain world. Can be used complementary to Bootcamps to get used to MetaMask and Dapps.
/// @author Lena Hierzi
/// @notice This contract is not aiming for security as it is designed for testing and only to be deployed on testnet.
/// @dev All Contract imports can be found in the BaseContract. I think it might be quite heavy and expensive to compile. But it's on the testnet. So go crazy.
/// @custom:experimental This is an experimental contract.

import "./BaseContract.sol";

contract Nft is BaseContract {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    // <tokenIdCounter mapping>
    CountersUpgradeable.Counter internal _tokenIdCounter;
    // <tokensToOWner mapping>
    mapping(uint256 => address) tokensToOwner;
    // <tokenExist mapping>
    mapping(string => bool) _tokenExists;
    // <userExist mapping>
    mapping(address => bool) _userExists;

    /*
     * Events
     */

    /*
     * Modifiers
     */
    modifier tokenUnique(string memory token) {
        require(!_tokenExists[token], "Object already exists");
        _;
    }
    modifier userDoesntExists(address user) {
        require(!_userExists[user], "User doesn't exists");
        _;
    }
    modifier userExists(address user) {
        require(_userExists[user], "User doesn't exists");
        _;
    }

    /// only called once when contract is initialized. Same s constructor.
    /// @inheritdoc BaseContract
    function initialize(
        string memory _name,
        string memory _symbol,
        string memory _baseTokenURI
    ) public override(BaseContract) initializer {
        BaseContract.initialize(_name, _symbol, _baseTokenURI);
    }

    /// @notice assigns MinterRolle to msg.sender so msg.sender can mint the NFT. Then Token is minted. Can only be called once by every user.
    /// @dev unfortunatly it dosn't work yet to mint from another address
    /// @param to The address, the Token should be transfered to
    /// @param cid The CID of the Tokens metadata
    /// @return _id
    function mint(address to, string memory cid)
        public
        tokenUnique(cid)
        userDoesntExists(to)
        returns (uint256 _id)
    {
        _id = _tokenIdCounter.current();
        _grantRole(MINTER_ROLE, to);
        safeMint(to, cid);

        return _id;
    }

    /// @notice The handshake function is called when a user interacts with another user and a new token is created. The token will only be issued for the caller of the function.
    /// @dev should only work once per user pair
    /// @param user1 The address, of the user the token will be asigned too
    /// @param user2 The address of the user user1 interacted with.
    /// @param cid The CID of the Tokens metadata
    /// @return _id

    function handShake(
        address user1,
        address user2,
        string memory cid
    )
        public
        payable
        userExists(user1)
        userExists(user2)
        tokenUnique(cid)
        returns (uint256 _id)
    {
        _id = _tokenIdCounter.current();
        safeMint(user1, cid);
        return _id;
    }

    /// @notice checks if the msg.sender has the minter role, if so the token is assigned to several mappings so you can later check who it belongs to, if it exists.
    /// @dev unfortunatly it dosn't work yet to mint from another address
    /// @param to The address, the Token should be transfered to
    /// @param uri The CID of the Tokens metadata
    function safeMint(address to, string memory uri)
        public
        onlyRole(MINTER_ROLE)
    {
        uint256 tokenId = _tokenIdCounter.current();
        _setTokenURI(tokenId, uri);
        tokensToOwner[tokenId] = to;
        tokenURIs[tokenId] = uri;
        _tokenExists[uri] = true;

        _setTokenURI(tokenId, uri);
        _safeMint(to, tokenId);
        _tokenIdCounter.increment();
    }

    /// @notice Returns the cids of one owner without the BaseUri
    /// @param _owner The person that wants to know which tokens belong to them
    /// @return userTokens  all cids of tokens belonging to one owner
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

    /// @notice all tokenIds of tokens belonging to one owner
    /// @param _owner The person that wants to know which tokens belong to them
    /// @return tokensId
    function tokenIdsOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokensId = new uint256[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }

    /// @notice Returns the tokenUri of a token
    /// @inheritdoc BaseContract
    function tokenURI(uint256 tokenId)
        public
        view
        override(BaseContract)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /// @notice Returns the _baseURI of the contract
    /// @inheritdoc BaseContract
    function _baseURI()
        internal
        view
        virtual
        override(BaseContract)
        returns (string memory)
    {
        return super._baseURI();
    }

    /// @notice Burns tokens
    /// @inheritdoc BaseContract
    function _burn(uint256 tokenId) internal virtual override(BaseContract) {
        super._burn(tokenId);
    }

    ///  @notice The following functions are overrides for ERC721Enumerable required by Solidity.
    /// @inheritdoc BaseContract

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(BaseContract) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    /// @inheritdoc BaseContract
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(BaseContract)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
