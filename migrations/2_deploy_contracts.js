const NFT = artifacts.require("Nft");
const SetTokenUri = artifacts.require("SetTokenUri");

module.exports = function (deployer) {
  // deployer.deploy(SetTokenUri);
  deployer.deploy(NFT);
};
