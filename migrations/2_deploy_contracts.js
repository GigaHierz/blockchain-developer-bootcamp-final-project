const NFT = artifacts.require("Nft");
const BaseContract = artifacts.require("BaseContract");

module.exports = function (deployer) {
  // deployer.deploy(BaseContract);
  deployer.deploy(NFT);
};
