import { ethers } from "hardhat";

async function main() {

  const JacksPremix = await ethers.getContractFactory("JacksPremix");
  const jacksPremix = await JacksPremix.attach("0xE8A25442c08C203c6bc8f638605d49E475c5B0C0");

  await jacksPremix.setBaseURI("ipfs://QmZUvu2JLURm2U6AFV1jHJcpMx3HpNFrENJYtxnBn7qS2b/");

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
