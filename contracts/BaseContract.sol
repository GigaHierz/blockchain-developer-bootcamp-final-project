// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";

contract BaseContract is
    Initializable,
    ERC721Upgradeable,
    ERC721URIStorageUpgradeable,
    AccessControlUpgradeable,
    ERC721EnumerableUpgradeable,
    OwnableUpgradeable
{
    using StringsUpgradeable for uint256;
    using SafeMathUpgradeable for uint256;

    uint256 public constant MAX_SUPPLY = 50000;
    uint256 public constant PRICE = 0.0001 ether;
    uint256 public constant MAX_PER_MINT = 100;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // Base URI
    string private _baseURIextended;
    string public baseTokenURI;

    // <tokenURIs mapping>
    mapping(uint256 => string) internal tokenURIs;

    /*
     * Modifiers
     */
    modifier tokenExists(uint256 _tokenId, string memory message) {
        require(_exists(_tokenId), message);
        _;
    }

    /// @notice Instead of the constructor we need this function as we are using the upgreadable plugin. Only called once when contract is initialized. Same s constructor.
    /// @dev upgrade will hopefully work soon
    /// @param _name The address, the Token should be transfered to
    /// @param _symbol The CID of the Tokens metadata
    /// @param _baseTokenURI The CID of the Tokens metadata
    function initialize(
        string memory _name,
        string memory _symbol,
        string memory _baseTokenURI
    ) public virtual initializer {
        __ERC721_init(_name, _symbol);
        baseTokenURI = _baseTokenURI;
        _grantRole(DEFAULT_ADMIN_ROLE, owner());
        _grantRole(MINTER_ROLE, owner());
    }

    /// @notice Sets the _baseURI of the contract
    /// @param baseURI_ baseUri for Token (ipfs)
    function setBaseURI(string memory baseURI_) external onlyOwner {
        _baseURIextended = baseURI_;
    }

    /// @notice Set tokenUri of a token
    /// @inheritdoc ERC721URIStorageUpgradeable
    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
        override(ERC721URIStorageUpgradeable)
        tokenExists(tokenId, "ERC721Metadata: URI set of nonexistent token")
    {
        tokenURIs[tokenId] = _tokenURI;
    }

    /// @notice Returns the _baseURI of the contract
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    /// @notice Burns tokens
    /// @param tokenId of Token that should be burned
    /// @inheritdoc ERC721Upgradeable
    function _burn(uint256 tokenId)
        internal
        virtual
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
    {
        super._burn(tokenId);
    }

    /// @notice Returns tokenURI. If baseURI is set, concatenate the baseURI and tokenURI (via abi.encodePacked).
    /// @dev If there is no base URI, return the token URI. If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
    /// @param tokenId of Token that should be burned
    /// @return tokenURI
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        tokenExists(tokenId, "ERC721Metadata: URI query for nonexistent token")
        returns (string memory)
    {
        string memory _tokenURI = tokenURIs[tokenId];
        string memory base = _baseURI();

        if (bytes(base).length == 0) {
            return _tokenURI;
        }

        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return string(abi.encodePacked(base, tokenId.toString()));
    }

    // The following functions are overrides for ERC721Enumerable required by Solidity.
    /// @inheritdoc ERC721Upgradeable
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    )
        internal
        virtual
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    /// @inheritdoc ERC721Upgradeable
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(
            ERC721Upgradeable,
            ERC721EnumerableUpgradeable,
            AccessControlUpgradeable
        )
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
