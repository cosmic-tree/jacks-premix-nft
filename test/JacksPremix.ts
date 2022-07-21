import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("JacksPremix", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  const TOTAL_SUPPLY = 10000;
  async function deploy() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const JacksPremix = await ethers.getContractFactory("JacksPremix");
    const jacksPremix = await JacksPremix.deploy();

    return { jacksPremix, owner, otherAccount };
  }



  describe("Deployment", function () {

    it("Should set the right owner", async function () {
      const { jacksPremix, owner } = await loadFixture(deploy);
      expect(await jacksPremix.owner()).to.equal(owner.address);
      console.log(await jacksPremix.totalSupply());
    });

    it("Should assign all NFTs to owner", async function () {
      const { jacksPremix, owner } = await loadFixture(deploy);
      for (let i = 0; i < TOTAL_SUPPLY; i += 100) {
        expect(await jacksPremix.ownerOf(i)).to.equal(owner.address);
      }
     });

  });

  describe("Functionality", function () {
    it("Should return the correct tokenURI", async function () {
      const { jacksPremix, owner } = await loadFixture(deploy);
      const baseURI = "https://gateway.pinata.cloud/ipfs/QmT5yhUayMdbNuiEQ7SqK6Z5Bso8saPfCuHhKkoiLcBncW/";
      const expectedURI = "https://gateway.pinata.cloud/ipfs/QmT5yhUayMdbNuiEQ7SqK6Z5Bso8saPfCuHhKkoiLcBncW/21.json";
      await jacksPremix.setBaseURI(baseURI);
      expect(await jacksPremix.tokenURI(21)).to.equal(expectedURI);

    it("Should utilize NFT on request", async function () {
      const { jacksPremix, owner, otherAccount } = await loadFixture(deploy);
      expect(await jacksPremix.utilized(21)).to.equal(false);
      await jacksPremix.utilize(21);
      expect(await jacksPremix.utilized(21)).to.equal(true);

      // Should not be possible to do it twice
      await expect(await jacksPremix.utilize(21)).to.be.revertedWith(
        "Token already utilized."
      );

      // We use lock.connect() to send a transaction from another account
      await expect(await jacksPremix.connect(otherAccount).utilize(14)).to.be.revertedWith(
        "Not the NFT owner."
      );
    });

    
    });
  });
});
