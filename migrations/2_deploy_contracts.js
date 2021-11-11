const NFT = artifacts.require("Nft");
const NFT = artifacts.require("ERC721Enumerable");

module.exports = function (deployer) {
  deployer.deploy(NFT);
  deployer.deploy(ERC721Enumerable);
};
