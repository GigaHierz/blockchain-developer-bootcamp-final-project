// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;
/// @title An NFT game for newcomer to the blockchain world. Can be used complementary to Bootcamps to get used to MetaMask and Dapps.
/// @author Lena Hierzi
/// @notice This contract is not aiming for security as it is designed for a playful entry into Dapps and only to be deployed on testnet.
/// @custom:experimental This is an experimental contract.

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./BaseContract.sol";

contract Nft is
    ERC721,
    Ownable,
    ERC721Enumerable,
    BaseContract("Nft", "Octopus", "https://ipfs.io/ipfs/")
{
    using SafeMath for uint256;
    using Strings for uint256;
    using Counters for Counters.Counter;

    uint256 public constant MAX_SUPPLY = 50000;
    uint256 public constant PRICE = 0.0001 ether;
    uint256 public constant MAX_PER_MINT = 100;
    string public baseTokenURI = "https://ipfs.io/ipfs/";

    mapping(uint256 => address) tokensToOwner;

    Counters.Counter private _tokenIds;
    mapping(string => bool) _tokenExists;
    mapping(address => bool) _userExists;

    /// @notice assigns MinterRolle to msg.sender so msg.sender can mint the NFT. Then Token is minted. Can only be called once by every user.
    /// @dev unfortunatly it dosn't work yet to mint from another address
    /// @param to The address, the Token should be transfered to
    /// @param cid The CID of the Tokens metadata
    /// @return _id
    function mint(address to, string memory cid) public returns (uint256 _id) {
        require(!_tokenExists[cid], "Object already exists");

        _id = _tokenIds.current();
        _mint(to, _id);
        tokensToOwner[_id] = to;
        tokenURIs[_id] = cid;
        _tokenExists[cid] = true;
        _setTokenURI(_id, cid);
        _tokenIds.increment();

        return _id;
    }

    /// @notice Returns the ids of tokens of one owner
    /// @param _owner The person that wants to know which tokens belong to them
    /// @return userTokens  all ids of tokens belonging to one owner
    function tokensOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        // string[] memory userTokens = new string[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
            // if(tokensId[i]  == i){
            //    userTokens[i] = tokensList[i];
            // }
        }
        return tokenIds;
    }

    // The following functions are overrides for BadeContract.

    function _baseURI()
        internal
        view
        virtual
        override(BaseContract, ERC721)
        returns (string memory)
    {
        return _baseURIextended;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(BaseContract, ERC721)
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

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
