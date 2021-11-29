/**
 *
 * autogenerated by solidity-visual-auditor
 *
 * execute with:
 *  #> truffle test <path/to/this/test.js>
 *
 * */
const { deployProxy, upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const Nft = artifacts.require("../contracts/Nft.sol");
const NftV2 = artifacts.require("../contracts/NftV2.sol");

contract("Nft (proxy)", (accounts) => {
  let contract;
  let creatorAddress = accounts[0];
  let firstOwnerAddress = accounts[1];
  let secondOwnerAddress = accounts[2];
  let externalAddress = accounts[3];
  let unprivilegedAddress = accounts[4];
  /* create named accounts for contract roles */

  beforeEach(async () => {});

  // Test case
  it("retrieve returns a value previously initialized", async function () {
    await deployProxy(Nft, ["Nft", "Octopus", "https://ipfs.io/ipfs/"], {
      initializer: "initialize",
    }).then(
      async (contract) =>
        await contract
          .baseTokenURI()
          .then((value) => assert.equal(value, "https://ipfs.io/ipfs/"))
    );
    // const value2 = await contract.owner();
    // assert.equal(value2, accounts[0]);
  });

  xit("works before and after upgrading", async function () {
    const instance = await deployProxy(
      Nft,
      ["Nft", "Octopus", "https://ipfs.io/ipfs/"],
      { initializer: "initialize" }
    )
      .then((instance) => {
        instance
          .baseTokenURI()
          .then((value) => assert.equal(value, "https://ipfs.io/ipfs/"));
        return instance;
      })
      .then(
        async (instance) =>
          await upgradeProxy(
            instance.address,
            NftV2,
            ["NftV2", "Octopus", "https://ipfs.io/infura/ipfs"],
            { initializer: "initialize" }
          )
      );

    await instance
      .baseTokenURI()
      .then((value) => assert.equal(value, "https://ipfs.io/infura/ipfs"));
    await instance.name().then((name) => assert.equal(name, "NftV2"));
  });

  xcontext("upgrades", () => {
    it("works", async () => {
      await deployProxy(Nft, ["Nft", "Octopus", "https://ipfs.io/ipfs/"], {
        initializer: "initialize",
      }).then(
        async (instance) =>
          await upgradeProxy(
            instance.address,
            NftV2,
            ["NftV2", "Octopus", "https://ipfs.io/infura/ipfs"],
            { initializer: "initialize" }
          ).then(
            async (instance2) =>
              await instance2
                .baseTokenURI()
                .then((value) =>
                  assert.equal(value, "https://ipfs.io/infura/ipfs")
                )
          )
      );
    });
  });
});
