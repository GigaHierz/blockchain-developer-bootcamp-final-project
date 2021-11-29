// migrations
const { deployProxy, upgradeProxy } = require("@openzeppelin/truffle-upgrades");

const NFT = artifacts.require("Nft");
// const NFTV2 = artifacts.require("NftV2");

module.exports = async function (deployer) {
  const existing = await deployProxy(
    NFT,
    ["Nft", "Octopus", "https://ipfs.io/ipfs/"],
    {
      deployer,
      initializer: "initialize",
    }
  );
  console.log("Deployed", existing.address);
  // const instance = await upgradeProxy(
  //   existing.address,
  //   NFTV2,
  //   [
  //     "Nft2",
  //     "Octopus",
  //     "https://ipfs.io/ipfs/",
  //   ],
  //   {
  //     deployer,
  //     initializer: "initialize",
  //   }
  // );
  // console.log("Upgraded", instance.address);
};
