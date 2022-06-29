// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');

async function main() {
  const Exchange = await hre.ethers.getContractFactory('Exchange');
  const exchange = await Exchange.deploy();
  await exchange.deployed();

  console.log('exchange deployed to:', exchange.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
