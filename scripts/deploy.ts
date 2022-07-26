import { ethers } from "hardhat";

async function main() {

  const JacksPremix = await ethers.getContractFactory("JacksPremix");
  const jacksPremix = await JacksPremix.deploy();

  await jacksPremix.deployed();
  await jacksPremix.setBaseURI("ipfs://QmZUvu2JLURm2U6AFV1jHJcpMx3HpNFrENJYtxnBn7qS2b/");

  console.log("JacksPremix: ", jacksPremix.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
