// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;
/// @title An NFT game for newcomer to the blockchain world. Can be used complementary to Bootcamps to get used to MetaMask and Dapps.
/// @author Lena Hierzi
/// @notice This contract is not aiming for security as it is designed for testing and only to be deployed on testnet.
/// @custom:experimental This is an experimental contract.

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BaseContract is ERC721, Ownable {
    using Strings for uint256;

    // <tokenURIs mapping>
    mapping(uint256 => string) internal tokenURIs;

    /*
     * Modifiers
     */
    modifier tokenExists(uint256 _tokenId) {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        _;
    }

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    /// @notice Set tokenUri of a token in the tokenURIs mapping
    /// @param tokenId of Token that you wnt sto set the URI for
    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        tokenURIs[tokenId] = _tokenURI;
    }

    /// @notice Returns the _baseURI of the contract

    function _baseURI() internal view virtual override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    /// @notice Returns tokenURI. If baseURI is set, concatenate the baseURI and tokenURI (via abi.encodePacked).
    /// @dev If there is no base URI, return the token URI. If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
    /// @param tokenId of Token that you want to get the URI for
    /// @return tokenURI
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        tokenExists(tokenId)
        returns (string memory)
    {
        string memory _tokenURI = tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(base, tokenId.toString()));
    }
}
